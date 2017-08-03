# Solutions for the 2012 chapter

See the file `bundler.js`, and the comments in it, for the solutions
to exercises 1 to 3. You can run it like this to get the bundle set
up:

    cd 2012
    node solution/bundler.js js/app.js > bundle.js

## Exercise 4: Confetti

The README file for the module can predictably be found at
`node_modules/dom-confetti/README.md`. To wire up the confetti, you
add the following two files to `app.js`:

    // At the top
    const {confetti} = require("dom-confetti")
    
    // After the line where the element class is set to `"correct"`
    confetti(answerNode, {angle: 20, startVelocity: 20})
