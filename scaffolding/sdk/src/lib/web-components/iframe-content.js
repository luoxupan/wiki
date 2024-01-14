import { generateElements } from '../../utils/index';

class IframeContent extends HTMLElement {
  constructor() {
    // establish prototype chain
    super();
    const props = this.props;
    // attaches shadow tree and returns shadow root reference
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
    const shadow = this.attachShadow({ mode: 'open' });

    // creating a container for the iframe component
    const iframeContainer = generateElements(`
      <style>
        .crm-iframe {
          width: 100%;
          height: 100%;
          border: unset;
        }
      </style>
      <iframe
        class="crm-iframe"
        src=${props.src}
      >
      </iframe>
    `);

    shadow.append(...iframeContainer);
  }

  get props() {
    const items = {};
    [...this.attributes].forEach((attr) => {
      items[attr.name] = attr.value;
    });
    return items;
  }
}

// let the browser know about the custom element
if (window.customElements.get('iframe-content') === undefined) {
  window.customElements.define('iframe-content', IframeContent);
}
