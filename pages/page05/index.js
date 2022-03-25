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
  const ele = (
    React.createElement('div', { className: 'father-id' }, [
      React.createElement('button', {
        key: 1,
        onClick: function() {
          setState(!state);
        }
      }, '点击'),
      state ? React.createElement(Count, { key: 2 }) : null
    ])
  );
  console.log(ele)
  return ele;
}

ReactDOM.render(
  React.createElement(App),
  document.querySelector('#root')
);
