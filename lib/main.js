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

function addListenerToButton() {
  console.log("adding listener");
  const form = window.$l('form');
  console.log(form);
  // debugger
  // button.addEventListener("click", sendReq);
  form.on("submit", sendReq);
}

window.$l(addListenerToButton);

function sendRecipeReq(e) {
  window.$l.ajax({
    url: `http://www.recipepuppy.com/api/${a}`,
  }).then((data) => {
    console.log(data);
  });
}
// Derivatives and Dinner
