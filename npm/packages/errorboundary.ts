function errorHandler(data: any) {
  if (data.type === 'componentdidcatch') {
  } else if (data.type === 'error') {
  } else if (data.type === 'unhandledrejection') {
  } else {
  }
  console.log('errordata:::', data);
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
