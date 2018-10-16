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
  });
};

function sayHello() {
  const everything = window.$l('div');
}

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
  const mealLocation = window.$l('.meals-location');
  window.$l.ajax({
    url: `http://taco-randomizer.herokuapp.com/random/`,
  }).then((data) => {
    console.log(data)
    mealLocation.append(`<h2><a href=${data.base_layer.url}>
      ${data.base_layer.name}
      </a>
      with <a href=${data.mixin.url}>
      ${data.mixin.name}</a>,
      garnished with <a href=${data.condiment.url}>
      ${data.condiment.name}</a>
      topped off with <a href=${data.seasoning.url}>
      ${data.seasoning.name}</a>
      and wrapped in <a href=${data.shell.url}>
      ${data.shell.name}</a></h2>`);
  });
}

// Derivatives on Meals
function addTerm(e) {
  const form = window.$l('.math-form');
  const numInputs = form.children().htmlArray.length;
  form.append(`<label for="input-${numInputs}">
        <input type="text" name="input-${numInputs}" value="">
        x<sup>${numInputs - 1}</sup> +
      </label>`);
  const button = window.$l('.add-term');
  button.off(addTermListener);
  button.on("click", addTerm);
}

function takeDeriv(e) {
  e.preventDefault();
  let coeffs = [];
  let deriv = [];
  const form = window.$l('.math-form');
  // debugger
  for (let i = 0; i < e.currentTarget.length; i++) {
    if (e.currentTarget[i].value !== 'Take Derivative') {
      coeffs.push(parseFloat(e.currentTarget[i].value) * (i - 1));
      deriv.push(`${parseFloat(e.currentTarget[i].value) * (i - 1)} ${(i > 2) ? `x<sup>${i - 2}</sup>` : ''}`);
    }
    // debugger
  }
  const derivString = deriv.slice(1).join(' + ');
  form.append(`<h3 class="coeffs">${coeffs}</h3>`);
  form.append(`<h3 class="coeffs">${derivString}</h3>`);
}

function addDerivListener() {
  const form = window.$l('.math-form');
  form.on("submit", takeDeriv);
}

function makeGraph() {
  const form = window.$l('.math-form');
  const coeffs = window.$l('.coeffs').html().innerHTML.split(',');
  let points = "";
  const x = [...Array(500).keys()];
  let y = new Array(500).fill(0);
  let yDisplay = new Array(500).fill(0);
  for (let i = 0; i < x.length; i++) {
    for (let j = 1; j < coeffs.length; j++) {
      y[i] += (parseFloat(coeffs[j]) * ((x[i] / 100) ** (j-1)));
    }
    yDisplay[i] = 500 - y[i];
    if (i !== x.length - 1) {
      points += `${x[i]},${yDisplay[i]} `;
    } else {
      points += `${x[i]},${yDisplay[i]}`;
    }
  }
  form.append(`<svg width="500" height="500">
      <path d="M ${points}" stroke="black" strokeWidth="3" fill= "none" />
    </svg>`);
}

function addTermListener() {
  const button = window.$l('.add-term');
  button.on("click", addTerm);
}

function addGraphListener() {
  const button = window.$l('.make-graph');
  button.on("click", makeGraph);
}


function addMealListener() {
  const button = window.$l('.meals-button');
  button.on("click", sendRecipeReq);
}

window.$l(addMealListener);

window.$l(addTermListener);

window.$l(addDerivListener);

window.$l(addGraphListener);
