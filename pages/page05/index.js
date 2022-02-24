function Count() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    console.log('========2')
    this.timer = setInterval(() => {
      setCount(count + 1)
    }, 1000);
    return () => {
      clearInterval(this.timer);
    }
  }, []);
  console.log('========1')
  return (
    React.createElement('div', null, count)
  )
}

function App() {
  const [state, setState] = React.useState(false);
  return (
    React.createElement('div', null, [
      React.createElement('button', {
        key: 1,
        onClick: function() {
          setState(!state);
        }
      }, 'click'),
      state ? React.createElement(Count, { key: 2 }) : null
    ])
  );
}

ReactDOM.render(
  React.createElement(App),
  document.querySelector('#root')
);
