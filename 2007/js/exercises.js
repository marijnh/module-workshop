// Local utility to generate a random integer >= from and < to.
function $(from, to) {
  return Math.floor(Math.random() * (to - from)) + from
}

// Given an integer that indicates the range up to which exercises may
// be generated, returns an object with `question` (a string) and
// `answer` (an integer) fields.
function getExercise(difficulty) {
  if (Math.random() < 0.5) { // '+' exercise
    var left = $(1, difficulty - 2), right = $(1, difficulty - left)
    return {question: left + " + " + right + " =", answer: left + right}
  } else { // '-'
    var left = $(4, difficulty), right = $(1, left - 1)
    return {question: left + " - " + right + " =", answer: left - right}
  }
}
