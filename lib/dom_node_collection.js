class DOMNodeCollection {

  constructor(htmlArray){
    this.htmlArray = htmlArray;
    this.callback = function(){};
  }

  html(string){
    if (string) {
      this.htmlArray.forEach( (el) => {
        el.innerHTML = string;
        return el;
      });
    } else {
      return this.htmlArray[0];
    }
  }

  empty(){
    this.htmlArray.forEach( (el) => {
      el.innerHTML = '';
      return el;
    });
  }

  append(arg){
    if (typeof arg === 'object' && !(arg instanceof DOMNodeCollection)) {
      arg = $l(arg);
    }
    if (typeof arg === 'string') {
      this.htmlArray.forEach((node) => {
        node.innerHTML += arg;
      });
    } else if (arg instanceof DOMNodeCollection) {
      this.htmlArray.forEach((node) => {
        arg.htmlArray.forEach((child) => {
          node.appendChild(child.cloneNode(true));
        });
      });
    }
  }

  attr(string, val){
    const attrs = this.htmlArray[0].attributes;
    for (let i = 0; i < attrs.length; i++) {
      if (attrs[i].name === string){
        return attrs[i].value;
      }
    }
    if (!val) {
      return undefined;
    } else {
      let typ = document.createAttribute(string);
      typ.value = val;
      return attrs.setNamedItem(typ);
    }
  }

  addClass(className){
    this.htmlArray.forEach( (el) => {
      el.classList.add(className);
      return el;
    });
  }

  removeClass(className){
    this.htmlArray.forEach( (el) => {
      el.classList.remove(className);
      return el;
    });
  }

  children() {
    let childNodes = [];
    this.htmlArray.forEach( (el) => {
      const childList = el.children;
      childNodes = childNodes.concat(Array.from(childList));
    });
    return new DOMNodeCollection(childNodes);
  }

  parent() {
    let parentNodes = [];
    this.htmlArray.forEach( (el) => {
      let parent = el.parentElement;
      parentNodes.push(parent);
    });
    return new DOMNodeCollection(parentNodes);
  }

  find(selector) {
    let found = [];
    this.htmlArray.forEach((el) => {
      const foundThings= el.querySelectorAll(selector);
      found.push(foundThings);
    });
    return new DOMNodeCollection(found);
  }

  remove(){
    this.htmlArray.forEach((el) => {
      el.innerHTML = '';
      el.outerHTML = '';
    });
    this.htmlArray = [];
  }

  on(type, listener){
    this.callback = listener;
    this.htmlArray.forEach((el) => {
      el.addEventListener(type, this.callback);
    });
  }

  off(type){
    this.htmlArray.forEach((el) => {
      el.removeEventListener(type,this.callback);
    });
  }
}

module.exports = DOMNodeCollection;
