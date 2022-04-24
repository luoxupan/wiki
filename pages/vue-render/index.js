const data = [
  {
    type: "div",
    props: {
      className: "div-01"
    },
    children: "先写一些文字"
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
      width: "200px"
    },
    props: {
      src: "https://dpubstatic.udache.com/static/dpubimg/0f5e3024-0731-4e02-b98c-184b39588607.jpg"
    }
  },
];

function render(createElement, data) {
  const child = data.map((item) => {
    const { type, style, props, children } = item;
    const on = {
      click: () => {
        console.log('====')
      }
    }
    return createElement(type, { attrs: props, style, on }, children);
  });
  return createElement("div", {}, child);
}

new Vue({
  el: "#app",
  render: function (createElement) {
    return render(createElement, data);
  }
});
