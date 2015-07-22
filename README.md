# react.survey.test

# To Install
Clone the github repository.

Open the indexraw.html in your browser, via a local server, to use the development version of the survey.  The development versions uses JSXTransformer.js to compile JSX to native JavaScript, on the fly.

# Compiled version (JSX to JS)
Open the index.html in your browser, via a local server, to use the compiled, native JavaScript of the survey.  You will need to compile the JSX to JS first, however, by using React Tools.  If you are using NPM, you can install like so:

```
// Install support packages
npm install

// Build the /javascript/compiled/app.js file
npm run build

// Note "npm run build" is a package.json script, the calls jsx binary with the parameters below
jsx --extension jsx javascript/src javascript/compiled"
```

# Local Server
React prefers to run its code through a proper HTTP server rather than directly through the file system.  I use SublimeServer, which I've installed as a package for Sublime Text.  