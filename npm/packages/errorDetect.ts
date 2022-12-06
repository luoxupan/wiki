// @ts-ignore
const enum ErrorTypes { // @ts-ignore
  error='error', // @ts-ignore
  vue2errorhandler='vue2errorhandler', // @ts-ignore
  vue3errorhandler='vue3errorhandler', // @ts-ignore
  componentdidcatch='componentdidcatch', // @ts-ignore
  unhandledrejection='unhandledrejection', // @ts-ignore
}

// @ts-ignore
const errorTypes = [
  ErrorTypes.error,
  ErrorTypes.vue2errorhandler,
  ErrorTypes.vue3errorhandler,
  ErrorTypes.componentdidcatch,
  ErrorTypes.unhandledrejection,
];

class ErrorDetect {
  static timer: any;
  static getCoordinatesPoints() {
    const step = 20;
    const clientHeight = document.documentElement.clientHeight;
    const clientWidth = document.documentElement.clientWidth;
    const y = Math.floor(clientHeight / step);
    const x = Math.floor(clientWidth / step);
    const ypath = [y];
    const xpath = [x];
    const loop = step - 1;
    for (let i = 1; i < loop; ++i) {
      ypath.push(y + y * i);
      xpath.push(x + x * i);
    }
  
    let points = [];
    for (let i = 0; i < xpath.length; ++i) {
      for (let j = 0; j < ypath.length; ++j) {
        const ele = document.elementFromPoint(xpath[i], ypath[j]);
        if (ele?.nodeName?.toLocaleLowerCase() !== 'html') {
          points.push({
            x: xpath[i],
            y: ypath[j],
            ele,
          });
        }
      }
    }
  
    return points;
  }
  static getMaxPersent() {
    let points = ErrorDetect.getCoordinatesPoints();
    let array = [];
    let counts: any = [];
    for (let i = 0; i < points.length; ++i) {
      let ele = points[i].ele;
      let idx = array.indexOf(ele);
      if (idx === -1) {
        array.push(ele);
        counts[array.length - 1] = 1;
      } else {
        counts[idx] = counts[idx] + 1;
      }
    }
  
    // const total = counts.reduce((x: any, y: any) => x + y, 0);
    const total = points.length;
    const max = Math.max(...counts);
    return {
      points,
      counts,
      total,
      max,
      persent: Number((max / total).toFixed(2)),
    }
  }
  static isPageBlank() {
    const resData = ErrorDetect.getMaxPersent();
    console.log('data:', resData);
  }
  static errorHandler(data: any) {
    if (errorTypes.includes(data.type)) {
      if (data.type === ErrorTypes.error) {
      } else if (data.type === ErrorTypes.componentdidcatch) {
      } else if (data.type === ErrorTypes.unhandledrejection) {
      } else {
      }
      console.log('errordata:::', data);
      clearTimeout(ErrorDetect.timer);
      ErrorDetect.timer = setTimeout(ErrorDetect.isPageBlank, 1000);
    }
  }
  static listener() {
    window.addEventListener('error', (e) => {
      ErrorDetect.errorHandler({ type: 'error', data: e });
    }, true);
    window.addEventListener('unhandledrejection', (e) => {
      ErrorDetect.errorHandler({ type: 'unhandledrejection', data: e });
    });
    window.addEventListener('message', (e) => {
      ErrorDetect.errorHandler(e.data);
    });
  }
  static start() {
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
     * 更据mdn文档，应该在DOMContentLoaded事件之前就监听
     */
    ErrorDetect.listener();
  }
}

ErrorDetect.start();
