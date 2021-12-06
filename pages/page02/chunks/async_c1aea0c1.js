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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2FzeW5jX2MxYWVhMGMxLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stbGF6eS1sb2FkLy4vc3JjL2FzeW5jLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRJbmZvKGluZm8pIHtcbiAgY29uc29sZS5sb2coJ2xvZzogaW5mbyAnLCBpbmZvKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEJ1dHRvbihlbGVtZW50KSB7XG4gIGxldCBudW1iZXIgPSAxO1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYnV0dG9uLmlubmVySFRNTCA9ICdudW1iZXIgKyAnICsgbnVtYmVyKys7XG5cbiAgZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcbiAgZWxlbWVudC5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJ251bWJlciArICcgKyBudW1iZXIrKztcbiAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=