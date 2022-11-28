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

function errorHandler(data: any) {
  if (errorTypes.includes(data.type)) {
    if (data.type === ErrorTypes.error) {
    } else if (data.type === ErrorTypes.componentdidcatch) {
    } else if (data.type === ErrorTypes.unhandledrejection) {
    } else {
    }
    console.log('errordata:::', data);
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
