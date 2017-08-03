import Paper from "./paper.js"
import {getExercise} from "./exercises.js"
import {confetti} from "dom-confetti"

let paper = new Paper(document.getElementById("paper"))
let score = 0

paper.write("Math exercises. Go!")

function nextExercise() {
  let exercise = getExercise(10 + score * 2)
  paper.prompt(exercise.question, (answer, answerNode) => {
    if (answer == exercise.answer) {
      answerNode.className = "correct"
      score++
      confetti(answerNode, {angle: 20, startVelocity: 20})
      if (score % 10 == 0) paper.write(score + " correct answers!")
    } else {
      answerNode.className = "wrong"
    }
    nextExercise()
  })
}

nextExercise()
