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

With more details to come
