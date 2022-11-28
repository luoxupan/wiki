"use strict";
function loadScript(src) {
    return new Promise(function (resolve, reject) {
        if (document.querySelector("script[data-url=\"".concat(src, "\"]"))) {
            resolve(undefined);
        }
        else {
            var script = document.createElement('script');
            script.async = true;
            script.src = src;
            script.setAttribute('data-url', src);
            script.onload = resolve;
            script.onerror = function (error) {
                reject(new Error('Unable to load ' + src));
            };
            document.body.appendChild(script);
        }
    });
}
var errorTypes = [
    "error" /* ErrorTypes.error */,
    "componentdidcatch" /* ErrorTypes.componentdidcatch */,
    "unhandledrejection" /* ErrorTypes.unhandledrejection */,
];
function screenshot() {
    var html2canvasurl = 'https://luoxupan.github.io/wiki/npm/lib/html2canvas.min.js';
    loadScript(html2canvasurl).then(function () {
        window.html2canvas(document.body).then(function (canvas) {
            // document.body.appendChild(canvas);
            var imgData = canvas.toDataURL('image/png');
            var newWin = window.open('', '_blank');
            var dataImg = new Image();
            dataImg.style = "width: 100%";
            dataImg.src = imgData;
            newWin.document.write(dataImg.outerHTML);
            newWin.document.close();
        });
    });
}
var timer = null;
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
        clearTimeout(timer);
        timer = setTimeout(screenshot, 1000);
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
