"use strict";
function errorHandler(data) {
    if (data.type === 'componentdidcatch') {
    }
    else if (data.type === 'error') {
    }
    else if (data.type === 'unhandledrejection') {
    }
    else {
    }
    console.log('errordata:::', data);
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
