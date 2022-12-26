var matrix = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
var visited = [[false,false,false],[false,false,false],[false,false,false]];
var turn = 0;


// cell clicking
$(".but").click(function() {
  var chosenCell = $(this).attr("id");
  if(checkValid(chosenCell) === false) {
    pressButton(chosenCell);
  }
});

// restart button specifications
$("#restart-button").click( function () {
  matrix = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
  visited = [[false,false,false],[false,false,false],[false,false,false]];
  turn = 0;
  for(var i=0;i<3;i++) {
    for(var j=0;j<3;j++) {
      $("#but"+i+j).html("");
    }
  }
  $("#game-title").text("Click anywhere to start the game");
  $("body").removeClass("win");
  $("body").removeClass("draw");
  $("#restart-button").css("visibility","hidden");
  $(".turn-status").text("Player1 turn");

});


function pressButton(chosenCell) {
  $("#"+chosenCell).addClass("pressed");
  setTimeout(function() {
    $("#" + chosenCell).removeClass("pressed");
  },100);

  var row = parseInt(chosenCell.slice(3,4));
  var col = parseInt(chosenCell.slice(4,5));

  if(turn == 0) {
    $("#"+chosenCell).html("<i class='fa-solid fa-xmark'></i>");
    matrix[row][col] = 1;
    turn = 1;
    if(checkAnswer(1)) {
      $("#game-title").text("Player1 Wins!!");
      $("body").addClass("win");
      $("#restart-button").css("visibility","visible");
      $(".turn-status").text("🎉✨✨🎉");
    }
    else {
      if(checkDraw()) {
        $("#game-title").text("Draw!!");
        $("body").addClass("draw");
        $("#restart-button").css("visibility","visible");
        $(".turn-status").text("");
      }
      else {
        $(".turn-status").text("Player2 turn");
      }
    }
  }
  else {
    $("#"+chosenCell).html("<i class='fa-regular fa-circle'></i>");
    matrix[row][col] = 0;
    turn = 0;
    if(checkAnswer(0)) {
      $("#game-title").text("🎉✨Player2 Wins!!✨🎉");
      $("body").addClass("win");
      $("#restart-button").css("visibility","visible");
      $(".turn-status").text("🎉✨✨🎉");
    }
    else {
      if(checkDraw()) {
        $("#game-title").text("Draw!!");
        $("body").addClass("draw");
        $("#restart-button").css("visibility","visible");
        $(".turn-status").text("");
      }
      else {
        $(".turn-status").text("Player1 turn");
      }
    }
  }

}

// check Win condition
function checkAnswer(mark) {

  //row win
  for(var i=0;i<3;i++) if(matrix[i][0] === mark && matrix[i][1] === mark && matrix[i][2] === mark) return true;
  //col win
  for(var i=0;i<3;i++) if(matrix[0][i] === mark && matrix[1][i] === mark && matrix[2][i] === mark) return true;
  //diagonal win
  if(matrix[0][0] === mark && matrix[1][1] === mark && matrix[2][2] === mark) return true;
  if(matrix[2][0] === mark && matrix[1][1] === mark && matrix[0][2] === mark) return true;

  return false;

}

// check Valid move condition
function checkValid(chosenCell) {
  var row = parseInt(chosenCell.slice(3,4));
  var col = parseInt(chosenCell.slice(4,5));

  if(visited[row][col] === false) {
    visited[row][col] = true;
    return false;
  }
  else return true;
}

//check draw condition
function checkDraw() {
  var check = false;
  for(var i=0;i<3;i++) {
    for(var j=0;j<3;j++) {
      if(matrix[i][j] === -1) return false;
    }
  }
  return true;
}
