"use strict";
var errorTypes = [
    "error" /* ErrorTypes.error */,
    "componentdidcatch" /* ErrorTypes.componentdidcatch */,
    "unhandledrejection" /* ErrorTypes.unhandledrejection */,
];
function errorHandler(data) {
    if (errorTypes.includes(data.type)) {
        if (data.type === "error" /* ErrorTypes.error */) {
        }
        else if (data.type === "componentdidcatch" /* ErrorTypes.componentdidcatch */) {
        }
        else if (data.type === "unhandledrejection" /* ErrorTypes.unhandledrejection */) {
        }
        else {
        }
        console.log('errordata:::', data);
    }
}
function errorBoundary() {
    window.addEventListener('error', function (e) {
        errorHandler({ type: 'error', data: e });
    });
    window.addEventListener('unhandledrejection', function (e) {
        errorHandler({ type: 'unhandledrejection', data: e });
    });
    window.addEventListener('message', function (e) {
        errorHandler(e.data);
    });
}
errorBoundary();
