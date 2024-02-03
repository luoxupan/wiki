export function getInfo(info) {
  console.log('log: info ', info);
}

export function Button(element) {
  let number = 1;
  const button = document.createElement('button');
  button.innerHTML = 'number + ' + number++;

  element.appendChild(document.createElement('br'));
  element.appendChild(button);

  button.addEventListener('click', () => {
    button.innerHTML = 'number + ' + number++;
  });
}
