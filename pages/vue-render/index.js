Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

Vue.component('blog-post', {
  props: ['title', 'content'],
  template: `
    <div class="blog-post">
      <h3>{{ title }}</h3>
      <div v-html="content"></div>
    </div>
  `
})


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
      {
        type: "button-counter",
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
    type: 'blog-post',
    props: {
      title: 'title',
      content: 'content'
    },
    style: {
      border: '1px solid #234534',
      width: '200px'
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
