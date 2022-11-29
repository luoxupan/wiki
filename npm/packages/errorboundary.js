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
    "vue2errorhandler" /* ErrorTypes.vue2errorhandler */,
    "vue3errorhandler" /* ErrorTypes.vue3errorhandler */,
    "componentdidcatch" /* ErrorTypes.componentdidcatch */,
    "unhandledrejection" /* ErrorTypes.unhandledrejection */,
];
var ErrorBoundary = /** @class */ (function () {
    function ErrorBoundary() {
    }
    ErrorBoundary.screenshot = function () {
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
    };
    ErrorBoundary.errorHandler = function (data) {
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
            clearTimeout(ErrorBoundary.timer);
            ErrorBoundary.timer = setTimeout(ErrorBoundary.screenshot, 1000);
        }
    };
    ErrorBoundary.listener = function () {
        window.addEventListener('error', function (e) {
            ErrorBoundary.errorHandler({ type: 'error', data: e });
        });
        window.addEventListener('unhandledrejection', function (e) {
            ErrorBoundary.errorHandler({ type: 'unhandledrejection', data: e });
        });
        window.addEventListener('message', function (e) {
            ErrorBoundary.errorHandler(e.data);
        });
    };
    ErrorBoundary.start = function () {
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
         * 更据mdn文档，应该在DOMContentLoaded事件之前就监听
         */
        ErrorBoundary.listener();
    };
    return ErrorBoundary;
}());
ErrorBoundary.start();
