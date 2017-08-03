(cd 2012; npm install)
(cd 2015; npm install)
(cd 2017; npm install)
# Fix up missing README file for dom-confetti, see https://github.com/daniel-lundin/dom-confetti/pull/4
wget "https://raw.githubusercontent.com/marijnh/dom-confetti/master/README.md" -O confetti.md
cp confetti.md 2012/node_modules/dom-confetti/README.md
mv confetti.md 2017/node_modules/dom-confetti/README.md
