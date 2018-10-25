/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n\n  constructor(htmlArray){\n    this.htmlArray = htmlArray;\n    this.callback = function(){};\n  }\n\n  html(string){\n    if (string) {\n      this.htmlArray.forEach( (el) => {\n        el.innerHTML = string;\n        return el;\n      });\n    } else {\n      return this.htmlArray[0];\n    }\n  }\n\n  empty(){\n    this.htmlArray.forEach( (el) => {\n      el.innerHTML = '';\n      return el;\n    });\n  }\n\n  append(arg){\n    if (typeof arg === 'object' && !(arg instanceof DOMNodeCollection)) {\n      arg = $l(arg);\n    }\n    if (typeof arg === 'string') {\n      this.htmlArray.forEach((node) => {\n        node.innerHTML += arg;\n      });\n    } else if (arg instanceof DOMNodeCollection) {\n      this.htmlArray.forEach((node) => {\n        arg.htmlArray.forEach((child) => {\n          node.appendChild(child.cloneNode(true));\n        });\n      });\n    }\n  }\n\n  attr(string, val){\n    const attrs = this.htmlArray[0].attributes;\n    for (let i = 0; i < attrs.length; i++) {\n      if (attrs[i].name === string){\n        return attrs[i].value;\n      }\n    }\n    if (!val) {\n      return undefined;\n    } else {\n      let typ = document.createAttribute(string);\n      typ.value = val;\n      return attrs.setNamedItem(typ);\n    }\n  }\n\n  addClass(className){\n    this.htmlArray.forEach( (el) => {\n      el.classList.add(className);\n      return el;\n    });\n  }\n\n  removeClass(className){\n    this.htmlArray.forEach( (el) => {\n      el.classList.remove(className);\n      return el;\n    });\n  }\n\n  children() {\n    let childNodes = [];\n    this.htmlArray.forEach( (el) => {\n      const childList = el.children;\n      childNodes = childNodes.concat(Array.from(childList));\n    });\n    return new DOMNodeCollection(childNodes);\n  }\n\n  parent() {\n    let parentNodes = [];\n    this.htmlArray.forEach( (el) => {\n      let parent = el.parentElement;\n      parentNodes.push(parent);\n    });\n    return new DOMNodeCollection(parentNodes);\n  }\n\n  find(selector) {\n    let found = [];\n    this.htmlArray.forEach((el) => {\n      const foundThings= el.querySelectorAll(selector);\n      found.push(foundThings);\n    });\n    return new DOMNodeCollection(found);\n  }\n\n  remove(){\n    this.htmlArray.forEach((el) => {\n      el.innerHTML = '';\n      el.outerHTML = '';\n    });\n    this.htmlArray = [];\n  }\n\n  on(type, listener){\n    this.callback = listener;\n    this.htmlArray.forEach((el) => {\n      el.addEventListener(type, this.callback);\n    });\n  }\n\n  off(type){\n    this.htmlArray.forEach((el) => {\n      el.removeEventListener(type,this.callback);\n    });\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./lib/dom_node_collection.js\");\n\nwindow.$l = function (el) {\n  const fuctionsArray = [];\n  if ( document.readyState === \"complete\" || document.readyState !== \"loading\" ){\n    if (el instanceof HTMLElement){\n      const htmlArray = [];\n      htmlArray.push(el);\n      return new DOMNodeCollection(htmlArray);\n    } else if (typeof el === \"string\") {\n      const nodeList = document.querySelectorAll(el);\n      const nodeArray = Array.from(nodeList);\n      return new DOMNodeCollection(nodeArray);\n    } else if (el instanceof Function) {\n      el();\n    }\n  } else {\n    if (el instanceof Function) {\n      fuctionsArray.push(el);\n      document.addEventListener(\"DOMContentLoaded\", () => {\n        fuctionsArray.forEach( (fun) => {\n          fun();\n        });\n      });\n    }\n  }\n};\n\nFunction.prototype.extend = function (...args) {\n  let hash = {};\n  args.forEach( (el) => {\n    Object.keys(el).forEach((key) => {\n      hash[key] = el[key];\n    });\n  });\n  return hash;\n};\n\nFunction.prototype.ajax = function (arg) {\n  let recommended = {\n    method: \"GET\",\n    url: \"\",\n    data: {},\n    contentType:'application/x-www-form-urlencoded; charset=UTF-8',\n    dataType: 'json',\n    success: () => {},\n    error: () => {},\n  };\n  const both = this.extend(recommended, arg);\n  return new Promise((resolve, reject) => {\n    const xhr = new XMLHttpRequest();\n    xhr.open(both.method, both.url, true);\n    xhr.onload = () => resolve(JSON.parse(xhr.response));\n    xhr.onerror  = () => reject(xhr.statusText);\n    xhr.send(JSON.stringify(both.data));\n  });\n};\n\nfunction sendReq(e) {\n  e.preventDefault();\n  const ordList = window.$l('ol');\n  window.$l.ajax({\n    url: `https://newton.now.sh/derive/${e.currentTarget[0].value}`,\n  }).then((data) => {\n    ordList.append(`<li>${data.result}</li>`);\n  });\n}\n\nfunction sendRecipeReq(e) {\n  const mealLocation = window.$l('.meals-location');\n  window.$l.ajax({\n    url: `http://taco-randomizer.herokuapp.com/random/`,\n  }).then((data) => {\n    mealLocation.append(`<h2><a href=${data.base_layer.url}>\n      ${data.base_layer.name}\n      </a>\n      with <a href=${data.mixin.url}>\n      ${data.mixin.name}</a>,\n      garnished with <a href=${data.condiment.url}>\n      ${data.condiment.name}</a>\n      topped off with <a href=${data.seasoning.url}>\n      ${data.seasoning.name}</a>\n      and wrapped in <a href=${data.shell.url}>\n      ${data.shell.name}</a></h2>`);\n  });\n}\n\n// Derivatives on Meals\nfunction addTerm(e) {\n  const form = window.$l('.math-form');\n  const numInputs = form.children().htmlArray.length;\n  form.append(`<label for=\"input-${numInputs}\">\n        <input type=\"text\" name=\"input-${numInputs}\" value=\"\">\n        x<sup>${numInputs - 1}</sup> +\n      </label>`);\n  const button = window.$l('.add-term');\n  button.off(addTermListener);\n  button.on(\"click\", addTerm);\n}\n\nfunction takeDeriv(e) {\n  e.preventDefault();\n  let coeffs = [];\n  let deriv = [];\n  const results = window.$l('.deriv-results');\n  const graphButton = window.$l('.graph-button');\n  for (let i = 0; i < e.currentTarget.length; i++) {\n    if (e.currentTarget[i].value !== 'Take Derivative') {\n      coeffs.push(parseFloat(e.currentTarget[i].value) * (i - 1));\n      deriv.push(`${parseFloat(e.currentTarget[i].value) * (i - 1)} ${(i > 2) ? `x<sup>${i - 2}</sup>` : ''}`);\n    }\n  }\n  const derivString = deriv.slice(1).join(' + ');\n  results.empty();\n  results.append(`<h3 class=\"coeffs\">${coeffs}</h3>`);\n  results.append(`<h3 class=\"deriv-string\">${derivString}</h3>`);\n  graphButton.append(`<button class=\"make-graph\">Make graph!</button>`);\n  window.$l(addGraphListener);\n}\n\nfunction addDerivListener() {\n  const form = window.$l('.math-form');\n  form.on(\"submit\", takeDeriv);\n}\n\nfunction makeGraph() {\n  const form = window.$l('.graph-results');\n  const coeffs = window.$l('.coeffs').html().innerHTML.split(',');\n  let points = \"\";\n  const x = [...Array(500).keys()];\n  let y = new Array(500).fill(0);\n  let yDisplay = new Array(500).fill(0);\n  for (let i = 0; i < x.length; i++) {\n    for (let j = 1; j < coeffs.length; j++) {\n      y[i] += (parseFloat(coeffs[j]) * ((x[i] / 100) ** (j-1)));\n    }\n    yDisplay[i] = 500 - y[i];\n    if (i !== x.length - 1) {\n      points += `${x[i]},${yDisplay[i]} `;\n    } else {\n      points += `${x[i]},${yDisplay[i]}`;\n    }\n  }\n  form.empty();\n  form.append(`<svg width=\"500\" height=\"500\">\n      <path d=\"M ${points}\" stroke=\"black\" strokeWidth=\"3\" fill= \"none\" />\n    </svg>`);\n}\n\nfunction addTermListener() {\n  const button = window.$l('.add-term');\n  button.on(\"click\", addTerm);\n}\n\nfunction addGraphListener() {\n  const button = window.$l('.make-graph');\n  button.on(\"click\", makeGraph);\n}\n\n\nfunction addMealListener() {\n  const button = window.$l('.meals-button');\n  button.on(\"click\", sendRecipeReq);\n}\n\nwindow.$l(addMealListener);\n\nwindow.$l(addTermListener);\n\nwindow.$l(addDerivListener);\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });