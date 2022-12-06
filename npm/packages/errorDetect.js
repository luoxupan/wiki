"use strict";
// @ts-ignore
var errorTypes = [
    "error" /* ErrorTypes.error */,
    "vue2errorhandler" /* ErrorTypes.vue2errorhandler */,
    "vue3errorhandler" /* ErrorTypes.vue3errorhandler */,
    "componentdidcatch" /* ErrorTypes.componentdidcatch */,
    "unhandledrejection" /* ErrorTypes.unhandledrejection */,
];
var ErrorDetect = /** @class */ (function () {
    function ErrorDetect() {
    }
    ErrorDetect.getCoordinatesPoints = function () {
        var step = 20;
        var clientHeight = document.documentElement.clientHeight;
        var clientWidth = document.documentElement.clientWidth;
        var y = Math.floor(clientHeight / step);
        var x = Math.floor(clientWidth / step);
        var ypath = [y];
        var xpath = [x];
        var loop = step - 1;
        for (var i = 1; i < loop; ++i) {
            ypath.push(y + y * i);
            xpath.push(x + x * i);
        }
        var points = [];
        for (var i = 0; i < xpath.length; ++i) {
            for (var j = 0; j < ypath.length; ++j) {
                points.push({
                    x: xpath[i],
                    y: ypath[j],
                    ele: document.elementFromPoint(xpath[i], ypath[j])
                });
            }
        }
        return points;
    };
    ErrorDetect.getMaxPersent = function () {
        var points = ErrorDetect.getCoordinatesPoints();
        var array = [];
        var counts = [];
        for (var i = 0; i < points.length; ++i) {
            var ele = points[i].ele;
            var idx = array.indexOf(ele);
            if (idx === -1) {
                array.push(ele);
                counts[array.length - 1] = 1;
            }
            else {
                counts[idx] = counts[idx] + 1;
            }
        }
        var total = counts.reduce(function (x, y) { return x + y; }, 0);
        var max = Math.max.apply(Math, counts);
        return {
            points: points,
            counts: counts,
            total: total,
            max: max,
            persent: Number((max / total).toFixed(2)),
        };
    };
    ErrorDetect.isPageBlank = function () {
        var resData = ErrorDetect.getMaxPersent();
        console.log('data:', resData);
    };
    ErrorDetect.errorHandler = function (data) {
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
            clearTimeout(ErrorDetect.timer);
            ErrorDetect.timer = setTimeout(ErrorDetect.isPageBlank, 1000);
        }
    };
    ErrorDetect.listener = function () {
        window.addEventListener('error', function (e) {
            ErrorDetect.errorHandler({ type: 'error', data: e });
        }, true);
        window.addEventListener('unhandledrejection', function (e) {
            ErrorDetect.errorHandler({ type: 'unhandledrejection', data: e });
        });
        window.addEventListener('message', function (e) {
            ErrorDetect.errorHandler(e.data);
        });
    };
    ErrorDetect.start = function () {
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
         * 更据mdn文档，应该在DOMContentLoaded事件之前就监听
         */
        ErrorDetect.listener();
    };
    return ErrorDetect;
}());
ErrorDetect.start();
