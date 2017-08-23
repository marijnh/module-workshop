# Exercises for the 2007 chapter

This directory contains a multi-module example web app written in the
very simple way people tended to write web apps in 2007. You can open
index.html in your browser to see it work. The exercises will ask you
to modify the app in certain ways.

Solutions are found under the `solution` directory. Try not to look at
them until you're either finished or completely lost.

## Exercise 1: jQuery

Every client-side app should depend on jQuery, especially in 2007,
where you can't even do `addEventListener` without running into
browser incompatibilities.

Edit `js/paper.js` to use jQuery for at least some of its DOM
manipulation. There's a copy in `js/jquery.js`. If you're not really
familiar with jQuery, you may just replace
`document.createElement("input")` with `$("<input>")[0]` and leave it
at that.

Make `index.html` load jQuery from `js/jquery.js` and see if it
works. It probably won't. Figure out why, and fix it, preferably in a
general way.

HINT: Look at the value of the global variable `$`.

## Exercise 2: Build system

Right now, our four scrips are fetched by four script tags causing the
browser to download four separate files. This only gets worse as more
modules are added.

Can you fix this by adding a build step?

Why is the build step for these modules so simple, compared to modern
bundler systems?

## Exercise 3 (hard): Dependency tree

Draw the dependency tree for the app. Can you think of any way to
automatically derive it from the source code, in this module style?

One approach would be to add specially-formatted annotation comments
to the files, specifying which files they depend on. Do this, and then
write a little tool that, given a starting script, finds all
dependencies and concatenates them into one big file, in the correct
order.

Does your tool handle duplicate dependencies (when two modules depend
on the same module) correctly?
