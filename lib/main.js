const DOMNodeCollection = require('./dom_node_collection');

window.$l = function (el) {
  const fuctionsArray = [];
  if ( document.readyState === "complete" || document.readyState !== "loading" ){
    if (el instanceof HTMLElement){
      const htmlArray = [];
      htmlArray.push(el);
      return new DOMNodeCollection(htmlArray);
    } else if (typeof el === "string") {
      const nodeList = document.querySelectorAll(el);
      const nodeArray = Array.from(nodeList);
      return new DOMNodeCollection(nodeArray);
    } else if (el instanceof Function) {
      el();
    }
  } else {
    if (el instanceof Function) {
      fuctionsArray.push(el);
      document.addEventListener("DOMContentLoaded", () => {
        fuctionsArray.forEach( (fun) => {
          fun();
        });
      });
    }
  }
};

Function.prototype.extend = function (...args) {
  let hash = {};
  args.forEach( (el) => {
    Object.keys(el).forEach((key) => {
      hash[key] = el[key];
    });
  });
  return hash;
};

Function.prototype.ajax = function (arg) {
  let recommended = {
    method: "GET",
    url: "",
    data: {},
    contentType:'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'json',
    success: () => {},
    error: () => {},
  };
  const both = this.extend(recommended, arg);
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(both.method, both.url, true);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror  = () => reject(xhr.statusText);
    xhr.send(JSON.stringify(both.data));
    console.log(xhr);
  });
};

function sayHello() {
  console.log("hi");
  const everything = window.$l('div');
  console.log(everything);
}
window.$l(sayHello);

function sendReq(e) {
  e.preventDefault();
  const ordList = window.$l('ol');
  window.$l.ajax({
    url: `https://newton.now.sh/derive/${e.currentTarget[0].value}`,
  }).then((data) => {
    ordList.append(`<li>${data.result}</li>`);
  });
}

function sendRecipeReq(e) {
  e.preventDefault();
  debugger
  const mealDiv = window.$l('.meals-div');
  window.$l.ajax({
    url: `http://taco-randomizer.herokuapp.com/random/`,
  }).then((data) => {
    console.log(data);
    mealDiv.append(`<h2>${data.base_layer.name}
      with ${data.mixin.name},
      garnished with ${data.condiment.name}
      topped off with ${data.seasoning.name}
      and wrapped in ${data.shell.name}</h2>`);
  });
}


window.$l(addListenerToButton);

// Derivatives on Meals
function addTerm(e) {
  const form = window.$l('.math-form');
  // debugger
  form.append(`<label for="input-3">Input 3
        <input type="text" name="input-3" value="">
      </label>`);
}


window.$l(addDerivListener);

function takeDeriv(e) {
  e.preventDefault();
  let coeffs = [];
  const form = window.$l('.math-form');
  for (var i = 0; i < e.currentTarget.length - 1; i++) {
    coeffs.push(e.currentTarget[i].value * i);
    // debugger
  }
  form.append(`<h3 class="coeffs">${coeffs}</h3>`);
}

function addListenerToButton() {
  console.log("adding listener");
  const form = window.$l('.math-form');
  console.log(form);
  // debugger
  // button.addEventListener("click", sendReq);
  form.on("submit", takeDeriv);
}

function makeGraph() {
  // debugger
  const form = window.$l('.math-form');
  const coeffs = window.$l('.coeffs').html().innerHTML.split(',');
  let points = "";
  const x = [...Array(500).keys()];
  let y = new Array(500).fill(0);
  let yDisplay = new Array(500).fill(0);
  for (var i = 0; i < x.length; i++) {
    for (var j = 0; j < coeffs.length; j++) {
      y[i] += parseFloat(coeffs[j]) * (x[j] ** j);
      // debugger
    }
    yDisplay[i] = 500 - y[i];
    if (i !== x.length - 1) {
      points += `${x[i]},${yDisplay[i]} `;
    } else {
      points += `${x[i]},${yDisplay[i]}`;
    }
  }
  // debugger
  form.append(`<svg width="500" height="500">
      <polyline points="${points}" style="stroke:black;stroke-width:3" />
    </svg>`);
}

function addDerivListener() {
  const button = window.$l('button');
  button.on("click", makeGraph);
}

function addMealListener() {
  console.log("adding meal listener");
  const form = window.$l('.meals-button');
  console.log(form);
  form.on("click", sendRecipeReq);
}

window.$l(addMealListener);
