function errorboundary() {
  window.addEventListener('message', (e) => {
    const data = e.data;
    if (data.type === 'componentDidCatch') {
      console.log('e:::', e);
    }
  });
}

errorboundary();
