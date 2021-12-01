"use strict";
(self["webpackChunkwebpack_lazy_load"] = self["webpackChunkwebpack_lazy_load"] || []).push([["async"],{

/***/ "./src/async.js":
/*!**********************!*\
  !*** ./src/async.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getInfo": function() { return /* binding */ getInfo; },
/* harmony export */   "Button": function() { return /* binding */ Button; }
/* harmony export */ });
function getInfo(info) {
  console.log('log: info ', info);
}

function Button(element) {
  let number = 1;
  const button = document.createElement('button');
  button.innerHTML = 'number + ' + number++;

  element.appendChild(document.createElement('br'));
  element.appendChild(button);

  button.addEventListener('click', () => {
    button.innerHTML = 'number + ' + number++;
  });
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfODVjYzNmNTEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1sYXp5LWxvYWQvLi9zcmMvYXN5bmMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldEluZm8oaW5mbykge1xuICBjb25zb2xlLmxvZygnbG9nOiBpbmZvICcsIGluZm8pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uKGVsZW1lbnQpIHtcbiAgbGV0IG51bWJlciA9IDE7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBidXR0b24uaW5uZXJIVE1MID0gJ251bWJlciArICcgKyBudW1iZXIrKztcblxuICBlbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSAnbnVtYmVyICsgJyArIG51bWJlcisrO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==