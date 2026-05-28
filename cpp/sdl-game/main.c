#include <SDL2/SDL.h>
#include <emscripten.h>
#include <stdbool.h>

#define WIDTH 480
#define HEIGHT 320

typedef struct {
  float x, y, w, h;
} Paddle;

typedef struct {
  float x, y, vx, vy, size;
} Ball;

#define BRICK_ROWS 4
#define BRICK_COLS 6
#define BRICK_W (WIDTH / BRICK_COLS)
#define BRICK_H 20

bool bricks[BRICK_ROWS][BRICK_COLS];
Paddle paddle;
Ball ball;
SDL_Renderer* renderer;
int score = 0;

void reset_game(void) {
  paddle.w = 80;
  paddle.h = 15;
  paddle.x = (WIDTH - paddle.w) / 2;
  paddle.y = HEIGHT - 30;

  ball.size = 8;
  ball.x = WIDTH / 2;
  ball.y = paddle.y - ball.size - 5;
  ball.vx = 3.0f;
  ball.vy = -3.0f;

  for (int r = 0; r < BRICK_ROWS; r++) {
    for (int c = 0; c < BRICK_COLS; c++) {
      bricks[r][c] = true;
    }
  }
  score = 0;
}

void update(void) {
  int mx, my;
  SDL_GetMouseState(&mx, &my);
  paddle.x = mx - paddle.w / 2;
  if (paddle.x < 0) {
    paddle.x = 0;
  }
  if (paddle.x + paddle.w > WIDTH) {
    paddle.x = WIDTH - paddle.w;
  }

  // Ball movement
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Wall collision
  if (ball.x - ball.size < 0 || ball.x + ball.size > WIDTH) ball.vx *= -1;
  if (ball.y - ball.size < 0) ball.vy *= -1;
  if (ball.y + ball.size > HEIGHT) {
    reset_game();
    return;
  }

  if (ball.y + ball.size >= paddle.y &&
      ball.y - ball.size <= paddle.y + paddle.h && ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.w) {
    ball.vy = -fabs(ball.vy);
    float hit = (ball.x - paddle.x) / paddle.w;
    ball.vx = (hit - 0.5f) * 6.0f;
  }

  for (int r = 0; r < BRICK_ROWS; r++) {
    for (int c = 0; c < BRICK_COLS; c++) {
      if (!bricks[r][c]) {
        continue;
      }
      SDL_Rect brick = {c * BRICK_W, r * BRICK_H, BRICK_W, BRICK_H};
      SDL_Rect ball_rect = {(int)(ball.x - ball.size),
                            (int)(ball.y - ball.size), (int)(ball.size * 2),
                            (int)(ball.size * 2)};
      if (SDL_HasIntersection(&ball_rect, &brick)) {
        bricks[r][c] = false;
        score += 10;
        if (ball.x < brick.x || ball.x > brick.x + BRICK_W) {
          ball.vx *= -1;
        } else {
          ball.vy *= -1;
        }
      }
    }
  }
}

void draw(void) {
  SDL_SetRenderDrawColor(renderer, 0x12, 0x12, 0x12, 255);
  SDL_RenderClear(renderer);

  SDL_Rect paddle_rect = {(int)paddle.x, (int)paddle.y, (int)paddle.w,
                          (int)paddle.h};
  SDL_SetRenderDrawColor(renderer, 0xB8, 0x86, 0x0B, 255);  // brass accent
  SDL_RenderFillRect(renderer, &paddle_rect);

  SDL_Rect ball_rect = {(int)(ball.x - ball.size), (int)(ball.y - ball.size),
                        (int)(ball.size * 2), (int)(ball.size * 2)};
  SDL_SetRenderDrawColor(renderer, 0xE0, 0xE0, 0xE0, 255);
  SDL_RenderFillRect(renderer, &ball_rect);

  for (int r = 0; r < BRICK_ROWS; r++) {
    for (int c = 0; c < BRICK_COLS; c++) {
      if (!bricks[r][c]) {
        continue;
      }
      SDL_Rect brick = {c * BRICK_W, r * BRICK_H, BRICK_W - 1, BRICK_H - 1};
      SDL_SetRenderDrawColor(renderer, 0x8B, 0x3A, 0x3A, 255);
      SDL_RenderFillRect(renderer, &brick);
    }
  }

  SDL_RenderPresent(renderer);
}

void main_loop(void) {
  update();
  draw();
}

int main(void) {
  SDL_Init(SDL_INIT_VIDEO);
  SDL_Window* window = SDL_CreateWindow("Breakout", SDL_WINDOWPOS_CENTERED,
                                        SDL_WINDOWPOS_CENTERED, WIDTH, HEIGHT,
                                        SDL_WINDOW_RESIZABLE);
  renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);

  reset_game();

  emscripten_set_main_loop(main_loop, 0, 1);

  return 0;
}
