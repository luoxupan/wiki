var rootDom = document.querySelector('#root');

rootDom.innerHTML = window.location.pathname;

var buttonDom = document.querySelector('#button');
buttonDom.addEventListener('click', function(event) {
  var time = new Date().getTime();
  history.pushState({ 'page_id': time }, '', time);
  rootDom.innerHTML = window.location.pathname;
});

window.addEventListener('popstate', function(event) {
  console.log(event);
  rootDom.innerHTML = window.location.pathname;
});
