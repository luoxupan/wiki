import { Didact } from './did-react'

/** @jsx Didact.createElement */
function Counter(props) {
  const [state, setState] = Didact.useState(1)
  return (
    <div id='Counter-div' style={{ ...props.style }}>
      <h1 style="cursor: pointer;" onClick={() => {
        setState(state + 1)
      }}>
        Hi {props.name} Count: {state}
      </h1>
      <div>
        {new Array(state).fill('').map((item, idx) => <span>{idx} </span>)}
      </div>
      <Random />
      <div>this is a text</div>
    </div>
  )
}

function Random() {
  const [state, setState] = Didact.useState(1)
  return (
    <div style="cursor: pointer;font-size: xx-large;" onClick={() => {
      setState(c => c + 1)
    }}>
      {state}
    </div>
  )
}

const element = (
  <div id="foo">
    <Counter name="foo" style={{ 'font-size': '20px' }} />
    <div id='text-div'>div text</div>
  </div>
)

console.log('currentRoot:element', element);

Didact.render(element, document.querySelector('body'));

