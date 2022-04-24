const data = [
  {
    type: "div",
    props: {
      className: "div-01"
    },
    children: [
      "先写一些文字",
      {
        type: "div",
        props: {
          className: "div-02"
        },
        style: {
          color: 'red',
        },
        children: "这是一个儿子节点"
      },
    ]
  },
  {
    type: "h1",
    props: {
      className: "h1-01"
    },
    children: "这是一个h1"
  },
  {
    type: "img",
    style: {
      marginTop: 50,
      width: "200px",
      cursor: 'pointer'
    },
    props: {
      src: "https://dpubstatic.udache.com/static/dpubimg/0f5e3024-0731-4e02-b98c-184b39588607.jpg"
    }
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
      return createElement(type, { attrs: props, style, on }, child);
    }
    return item;
  });
}

new Vue({
  el: "#app",
  render: function (createElement) {
    return createElement("div", {}, render(createElement, data));
  }
});
