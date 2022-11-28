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
  componentdidcatch='componentdidcatch',
  unhandledrejection='unhandledrejection',
}

const errorTypes = [
  ErrorTypes.error,
  ErrorTypes.componentdidcatch,
  ErrorTypes.unhandledrejection,
];

function screenshot() {
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

let timer: any = null;
function errorHandler(data: any) {
  if (errorTypes.includes(data.type)) {
    if (data.type === ErrorTypes.error) {
    } else if (data.type === ErrorTypes.componentdidcatch) {
    } else if (data.type === ErrorTypes.unhandledrejection) {
    } else {
    }
    console.log('errordata:::', data);
    clearTimeout(timer);
    timer = setTimeout(screenshot, 1000);
  }
}

function errorBoundary() {
  window.addEventListener('error', (e) => {
    errorHandler({ type: 'error', data: e });
  });
  window.addEventListener('unhandledrejection', (e) => {
    errorHandler({ type: 'unhandledrejection', data: e });
  });
  window.addEventListener('message', (e) => {
    errorHandler(e.data);
  });
}

errorBoundary();
