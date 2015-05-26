export default angular.module('snake', [])
  .directive('snakeGame', snakeGame);

function snakeGameController ($element) {
  var keys = [];
  window.addEventListener("keydown",
    function(e){
      keys[e.keyCode] = true;
      switch(e.keyCode){
        case 37: case 39: case 38:  case 40: // Arrow keys
        case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
      }
    },
    false);

  window.addEventListener('keyup',
    function(e){
      keys[e.keyCode] = false;
    },
    false);

  var canvas = $element.find("canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;

  //Lets save the cell width in a variable for easy control
  var cw = 10;
  var d;
  var food;
  var score;
  var game_loop = undefined;

  //Lets create the snake now
  var snake_array;

  function init() {
    d = "right"; //default direction
    snake_array = create_snake();
    food = create_food(); //Now we can see the food particle
    //finally lets display the score
    score = 0;

    //Lets move the snake now using a timer which will trigger the paint function
    if (typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(paint, 60);
  }

  init()

  function create_snake() {
    var length = 5; //Length of the snake
    var snake_array = [];

    while (length) {
      snake_array.push({
        x: length--,
        y: 0
      });
    }

    return snake_array;
  }


  //$element.find('button').click(init);

  /**
   * This will create a cell with x/y between 0-44
   * Because there are 45(450/10) positions across the rows and columns
   */
  function create_food() {
    return  {
      x: Math.round(Math.random() * (w - cw) / cw),
      y: Math.round(Math.random() * (h - cw) / cw)
    };
  }


  /**
   * To avoid the snake trail we need to paint the BG on every frame
   * Lets paint the canvas now
   */
  function paint() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);

    //The movement code for the snake to come here.
    //The logic is simple
    //Pop out the tail cell and place it in front of the head cell
    var nx = snake_array[0].x;
    var ny = snake_array[0].y;

    //These were the position of the head cell.
    //We will increment it to get the new head position
    //Lets add proper direction based movement now
    if (d == "right") nx++;
    else if (d == "left") nx--;
    else if (d == "up") ny--;
    else if (d == "down") ny++;

    //Lets add the game over clauses now
    //This will restart the game if the snake hits the wall
    //Lets add the code for body collision
    //Now if the head of the snake bumps into its body, the game will restart
    if (nx == -1 || nx == w / cw || ny == -1 || ny == h / cw || check_collision(nx, ny, snake_array)) {
      window.alert("Game Over!");
      return clearInterval(game_loop)
    }

    //code to make the snake eat the food
    if (nx == food.x && ny == food.y) {
      var tail;
      tail = {
        x: nx,
        y: ny
      };
      score++;
      //Create new food
      food = create_food();
    }
    else {
      tail = snake_array.pop(); //pops out the last cell
      tail.x = nx;
      tail.y = ny;
    }
    //The snake can now eat the food.
    snake_array.unshift(tail); //puts back the tail as the first cell
    for (var i = 0; i < snake_array.length; i++) {
      var c = snake_array[i];
      //Lets paint 10px wide cells
      paint_cell(c.x, c.y);
    }

    //Lets paint the food
    paint_cell(food.x, food.y);
    //Lets paint the score
    var score_text = "Score: " + score;
    ctx.fillText(score_text, 5, h - 5);
  }

  //Lets first create a generic function to paint cells
  function paint_cell(x, y) {
    ctx.fillStyle = "blue";
    ctx.fillRect(x * cw, y * cw, cw, cw);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x * cw, y * cw, cw, cw);
  }

  function check_collision(x, y, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].x == x && array[i].y == y) return true;
    }
    return false;
  }

  //Lets add the keyboard controls now
  document.addEventListener('keydown',function(e) {
    var key = e.which;
    //We will add another clause to prevent reverse gear
    if (key == "37" && d != "right") d = "left";
    else if (key == "38" && d != "down") d = "up";
    else if (key == "39" && d != "left") d = "right";
    else if (key == "40" && d != "up") d = "down";
    //The snake is now keyboard controllable
  })
}

function snakeGame () {
  return {
    restrict: 'E',
    controller: snakeGameController,
    templateUrl: 'snake/snake.html'
  }
}


