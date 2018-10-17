# derivatives-or-meals

Derivatives Or Meals is a simple JavaScript library that provides convenient methods and syntax to shorten your code and speed up your workflow. It was created as a lightweight alternative to jQuery and provides a simple and familiar calling method.

## API

- `::ajax`

```JavaScript
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
```

- `::extend`

```JavaScript
Function.prototype.extend = function (...args) {
  let hash = {};
  args.forEach( (el) => {
    Object.keys(el).forEach((key) => {
      hash[key] = el[key];
    });
  });
  return hash;
};
```

## DOMNodeCollection Methods

- `#html`
- `#empty`
- `#append`
- `#attr`
- `#addClass`
- `#removeClass`
- `#children`
- `#parent`
- `#find`
- `#remove`
- `#on`
- `#off`

## Live Demo

The live demo makes use of the library to take a user-given polynomial and return the derivative.  The below snippet finds the derivative of the user's function:

```JavaScript
function takeDeriv(e) {
  e.preventDefault();
  let coeffs = [];
  let deriv = [];
  const results = window.$l('.deriv-results');
  for (let i = 0; i < e.currentTarget.length; i++) {
    if (e.currentTarget[i].value !== 'Take Derivative') {
      coeffs.push(parseFloat(e.currentTarget[i].value) * (i - 1));
      deriv.push(`${parseFloat(e.currentTarget[i].value) * (i - 1)} ${(i > 2) ? `x<sup>${i - 2}</sup>` : ''}`);
    }
  }
  const derivString = deriv.slice(1).join(' + ');
  results.empty();
  results.append(`<h3 class="coeffs">${coeffs}</h3>`);
  results.append(`<h3 class="deriv-string">${derivString}</h3>`);
}
```
