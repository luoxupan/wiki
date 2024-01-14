function component() {
  const element = document.createElement('div');
  element.innerHTML = 'Hello webpack';

  const button = document.createElement('button');
  button.innerHTML = 'Click me load!';
  
  element.appendChild(document.createElement('br'));
  element.appendChild(button);

  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  button.addEventListener('click', () => {
    import(/* webpackChunkName: "async" */ './async').then((module) => {
      module.getInfo('onclick:');
      module.Button(element);
    });
  });

  return element;
}

document.body.appendChild(component());
console.log('WEB_ENV:', WEB_ENV);
