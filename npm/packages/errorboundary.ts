function loadScript(src: string) {
  return new Promise(function(resolve, reject) {
    if (document.querySelector(`script[data-url="${src}"]`)) {
      resolve(undefined);
    } else {
      var script = document.createElement('script');
      script.async = true;
      script.src = src;
      script.setAttribute('data-url', src);

      script.onload = resolve;
      script.onerror = function(error) {
        reject(new Error('Unable to load ' + src));
      };

      document.body.appendChild(script);
    }
  });
}

const enum ErrorTypes {
  error='error',
  vue2errorhandler='vue2errorhandler',
  vue3errorhandler='vue3errorhandler',
  componentdidcatch='componentdidcatch',
  unhandledrejection='unhandledrejection',
}

const errorTypes = [
  ErrorTypes.error,
  ErrorTypes.vue2errorhandler,
  ErrorTypes.vue3errorhandler,
  ErrorTypes.componentdidcatch,
  ErrorTypes.unhandledrejection,
];

class ErrorBoundary {
  static timer: any;
  static screenshot() {
    const html2canvasurl = 'https://luoxupan.github.io/wiki/npm/lib/html2canvas.min.js';
    loadScript(html2canvasurl).then(() => {
      (window as any).html2canvas(document.body).then(function(canvas: any) {
        // document.body.appendChild(canvas);
        const imgData = canvas.toDataURL('image/png');
        const newWin: any = window.open('', '_blank');
  
        const dataImg: any = new Image();
        dataImg.style = "width: 100%";
        dataImg.src = imgData;
  
        newWin.document.write(dataImg.outerHTML);
        newWin.document.close();
      });
    });
  }
  static errorHandler(data: any) {
    if (errorTypes.includes(data.type)) {
      if (data.type === ErrorTypes.error) {
      } else if (data.type === ErrorTypes.componentdidcatch) {
      } else if (data.type === ErrorTypes.unhandledrejection) {
      } else {
      }
      console.log('errordata:::', data);
      clearTimeout(ErrorBoundary.timer);
      ErrorBoundary.timer = setTimeout(ErrorBoundary.screenshot, 1000);
    }
  }
  static listener() {
    window.addEventListener('error', (e) => {
      ErrorBoundary.errorHandler({ type: 'error', data: e });
    }, true);
    window.addEventListener('unhandledrejection', (e) => {
      ErrorBoundary.errorHandler({ type: 'unhandledrejection', data: e });
    });
    window.addEventListener('message', (e) => {
      ErrorBoundary.errorHandler(e.data);
    });
  }
  static start() {
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
     * 更据mdn文档，应该在DOMContentLoaded事件之前就监听
     */
    ErrorBoundary.listener();
  }
}

ErrorBoundary.start();
