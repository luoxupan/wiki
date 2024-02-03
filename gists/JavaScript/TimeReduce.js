/**
 * begintime => UNIX时间戳
 * endtime   => UNIX时间戳
 * func      => 当时间没减少一秒执行函数
 * cb        => 当倒计时结束时执行函数
 */
class TimeReduce {
  constructor(begintime, endtime, func = function() {}, cb = function() {}) {
    this.cb = cb;
    this.func = func;
    this.endtime = endtime * 1000;
    this.begintime = begintime * 1000;
    this.clientTime = +new Date();
    this.serverTime = begintime * 1000;
    this.interval;
    this.timeStart();
  }

  timeStart() {
    this.updateTime();
    const interval = setInterval(this.updateTime.bind(this), 1000);
    this.interval = interval;
  }

  updateTime() {
    if (this.begintime >= this.endtime) {
      clearInterval(this.interval);
      this.cb();
      // TODO: 倒计时结束了, 开始执行其他业务
    } else {
      let opt = this.time2str();
      this.func(opt);
      this.begintime = this.serverTime + (+new Date() -  this.clientTime); // 当前服务器时间
      this.begintime += 1000;
    }
  }

  time2str() {
    function pad(num) {
      num = Math.floor(num);
      if (num === 0) {
        return "00";
      } else if (num < 10) {
        return `0${num}`;
      } else {
        return `${num}`;
      }
    }
    let ret;
    const msTime = (this.endtime - this.begintime) / 1000;
    if (msTime <= 0) {
      ret = {
        day: '00',
        hour: '00',
        min: '00',
        sec: '00'
      };
    } else {
      let hour = msTime / 3600;
      let day = hour / 24;
      let min = (msTime % 3600) / 60;
      let sec = msTime % 60;
      ret = {
        day: pad(day),
        hour: pad(hour % 24),
        min: pad(min),
        sec: pad(sec)
      };
    }
    return ret;
  }
}