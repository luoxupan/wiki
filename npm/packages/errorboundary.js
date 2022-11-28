"use strict";
function errorboundary() {
    window.addEventListener('message', function (e) {
        var data = e.data;
        if (data.type === 'componentDidCatch') {
            console.log('e:::', e);
        }
    });
}
errorboundary();
