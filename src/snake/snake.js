import 'snake/snake.less';
import config from 'snake/config.json';

export default angular.module('snake', [])
  .directive('snakeGame', snakeGame);

function snakeGame() {
  return {
    restrict: 'E',
    controller: snakeGameController,
    controllerAs: 'game',
    template: require('snake/snake.html')
  }
}

class snakeGameController {

  constructor($element, $interval, $window, $scope) {
    this.scope = $scope;
    this.keys = [];
    this.$window = $window;
    this.$interval = $interval;
    this.canvas = $element.find("canvas")[0];
    this.ctx = this.canvas.getContext("2d");
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.cw = 10;
    this.d = null;
    this.food = null;
    this.score = 0;
    this.game_loop = undefined;
    this.snake_array = [];

    this._drawCanvas();
    this._registerListeners();

    this.scope.$on('game:start', this._init.bind(this));
  }

  start() {
    this._init();
  }

  _registerListeners() {

    this.$window.addEventListener("keydown", (e) => {
      this.keys[e.keyCode] = true;
      switch (e.keyCode) {
        case 37:
        case 39:
        case 38:
        case 40:
        case 32:
          e.preventDefault();
          break;
        default:
          break;
      }
    }, false);

    this.$window.addEventListener('keyup', (e) => {
        this.keys[e.keyCode] = false;
      }, false);

    this.$window.document.addEventListener('keydown',  (e) => {
      let key = e.which;

      if (key == "37" && this.d != "right") this.d = "left";
      else if (key == "38" && this.d != "down") this.d = "up";
      else if (key == "39" && this.d != "left") this.d = "right";
      else if (key == "40" && this.d != "up") this.d = "down";
    })
  }

  _init() {
    this.d = "right";
    this.score = 0;
    this.snake_array = this.create_snake();
    this.food = this.create_food();

    if (typeof this.game_loop != "undefined") clearInterval(this.game_loop);
    this.game_loop = this.$interval(this.paint.bind(this), 60);
  }

  create_snake() {
    let length = config.snake_length; //Length of the snake
    let snake_array = [];

    while (length) {
      snake_array.push({
        x: length--,
        y: 0
      });
    }
    return snake_array;
  }

  create_food() {
    return {
      x: Math.round(Math.random() * (this.w - this.cw) / this.cw),
      y: Math.round(Math.random() * (this.h - this.cw) / this.cw)
    };
  }

  _drawCanvas() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.w, this.h);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(0, 0, this.w, this.h);
  }

  paint() {
    this._drawCanvas();

    let nx = this.snake_array[0].x;
    let ny = this.snake_array[0].y;

    if (this.d == "right") nx++;
    else if (this.d == "left") nx--;
    else if (this.d == "up") ny--;
    else if (this.d == "down") ny++;

    if (nx == -1 || nx == this.w / this.cw || ny == -1 || ny == this.h / this.cw || this.check_collision(nx, ny, this.snake_array)) {
      this.$interval.cancel(this.game_loop);
      let input = this.$window.prompt("Game Over! Your score: "+ this.score+ ". type your name:");
      this.scope.$broadcast('game:over', {player: input, score: this.score});
      return
    }

    let tail;
    if (nx == this.food.x && ny == this.food.y) {

      tail = {
        x: nx,
        y: ny
      };

      this.score += 1;
      this.food = this.create_food();
    }
    else {
      tail = this.snake_array.pop();
      tail.x = nx;
      tail.y = ny;
    }

    this.snake_array.unshift(tail);
    for (let i = 0; i < this.snake_array.length; i++) {
      let c = this.snake_array[i];
      this.paint_cell(c.x, c.y);
    }

    this.paint_cell(this.food.x, this.food.y);
  }

  paint_cell(x, y) {
    this.ctx.fillStyle = config.snake_color;
    this.ctx.fillRect(x * this.cw, y * this.cw, this.cw, this.cw);
    this.ctx.strokeStyle = config.snake_border;
    this.ctx.strokeRect(x * this.cw, y * this.cw, this.cw, this.cw);
  }

  check_collision(x, y, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].x == x && array[i].y == y) return true;
    }
    return false;
  }
}

snakeGameController.$inject=['$element', '$interval', '$window', '$scope'];
