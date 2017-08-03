const Paper = require("./paper")
const {getExercise} = require("./exercises")

var paper = new Paper(document.getElementById("paper"))

paper.write("Math exercises. Go!")
var score = 0

function nextExercise() {
  var exercise = getExercise(10 + score * 2)
  paper.prompt(exercise.question, function(answer, answerNode) {
    if (answer == exercise.answer) {
      answerNode.className = "correct"
      score++
      if (score % 10 == 0) paper.write(score + " correct answers!")
    } else {
      answerNode.className = "wrong"
    }
    nextExercise()
  })
}

nextExercise()
