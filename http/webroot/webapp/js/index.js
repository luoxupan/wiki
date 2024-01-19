Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: `
    <button class="click-btn" v-on:click="count++">
      You clicked me <span style="color: red;">{{ count }}</span> times.
    </button>
  `
})

const data = [
  {
    type: "div",
    props: {
      className: "div-01"
    },
    children: [
      {
        type: "button-counter",
      },
    ]
  },
];

function render(createElement, data) {
  return data.map((item) => {
    if (typeof item === 'object') {
      const { type, style, props, children } = item;
      const on = {
        click: () => {
          console.log('====')
        }
      };
      let child = children
      if (Array.isArray(children)) {
        child = render(createElement, children);
      }
      return createElement(type, { attrs: props, props, style, on }, child);
    }
    return item;
  });
}

new Vue({
  /**
   * https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0
   * 使用文档
   */
  el: "#app",
  render: function (createElement) {
    return createElement("div", {}, render(createElement, data));
  }
});
