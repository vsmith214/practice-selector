var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  if (matchFunc(startEl)) {
    resultSet.push(startEl);
  }

  [].slice.call(startEl.children).forEach(function (child) { resultSet = resultSet.concat(traverseDomAndCollectElements(matchFunc, child)) });
  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements

  // YOUR CODE HERE

  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // your code here
  if (selector[0] === '#') return 'id';
  if (selector[0] === '.') return 'class';
  if (selector.includes('.')) return 'tag.class';
  else return 'tag';
};


// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    // define matchFunction for id
    matchFunction = function (elem) {
      return selector.slice(1) === elem.id;
    }
  } else if (selectorType === "class") {
    // define matchFunction for class
    matchFunction = function (elem) {
      let classes = elem.className.split(' ');
      for (let i = 0; i < classes.length; i++) {
        if (classes[i] === selector.slice(1)) return true;
      }
      return false;
    }
  } else if (selectorType === "tag.class") {
    // define matchFunction for tag.class
    matchFunction = function (elem) {
      let tag = elem.tagName.toLowerCase(),
        clas = elem.className.split(' ');

      for (let i = 0; i < clas.length; i++) {
        if (selector === tag + '.' + clas[i]) return true;
      }
      return false;
    }
  } else if (selectorType === "tag") {
    // define matchFunction for tag
    matchFunction = function (elem) {
      return elem.tagName.toLowerCase() === selector;
    }
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
