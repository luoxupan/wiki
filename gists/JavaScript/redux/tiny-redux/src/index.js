import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import Header from './Header';
import Content from './Content';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from './react-redux';


function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({}) // 初始化 state
  return { getState, dispatch, subscribe }
}

const themeReducer = (state, action) => {
  if (!state) {
    return {
      themeColor: 'red'
    }
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

const store = createStore(themeReducer);

class Index extends Component {
  constructor() {
    super();
  }

  // static childContextTypes = {
  //     store: PropTypes.object
  // }

  // getChildContext() {
  //     return {store: store};
  // }

  componentDidMount() {
  }

  render() {
    return (
      <div className="Index">
        <Header />
        <Content />
      </div>
    );
  }
}


ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();























































