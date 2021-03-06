/**
 * 浏览器的localStorage
 * @type {[Function]}
 */
const dbGet = (name) => {
  let value = localStorage.getItem(name)
  if (/^\{.*\}$/.test(value)) {
    value = JSON.parse(value)
  }
  return value
}

const dbSet = (name, value) => {
  if (typeof value === typeof {}) {
    value = JSON.stringify(value)
  }
  return localStorage.setItem(name, value)
}

const dbRemove = (name) => {
  return localStorage.removeItem(name)
}

/**
 * 浏览器的sessionStorage
 * @type {[Function]}
 */
const ssdbGet = (name) => {
  let value = sessionStorage.getItem(name)
  if (/^\{.*\}$/.test(value)) {
    value = JSON.parse(value)
  }
  return value
}

const ssdbSet = (name, value) => {
  if (typeof value === typeof {}) {
    value = JSON.stringify(value)
  }
  return sessionStorage.setItem(name, value)
}

const ssdbRemove = (name) => {
  return sessionStorage.removeItem(name)
}

/**
 * 浏览器的cookie操作
 * @param  {[key]}    [传key]
 * @return {[value]}  [获取key的值]
 */
const getCookie = (key) => {
  let arr = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
  let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}
/**
 * 设置
 * @param {[key]} 键
 * @param {[value]} 值 
 * @param {[days]]} 失效天数 
 */
const setCookie = (key, value, days) => {
  // 设置cookie过期事件,默认是30天
  var expire = new Date();
  days = days || 30;
  expire.setTime(expire.getTime() + (+days) * 24 * 60 * 60 * 1000);
  // 设置cookie 放入子域名下 让微信H5也能取到 ";domain=" + "bl.com" + 
  document.cookie = key + "=" + encodeURIComponent(value) + ";expires=" + expire.toUTCString() + ";path=/";
};
/**
 * 移除
 * @param {[key]} key 
 */
const deleteCookie = (key) => {
  var expire = new Date();
  expire.setTime(expire.getTime() - 1);
  var cval = getCookie(key);
  if (cval != null) {
    // 把toGMTString改成了toUTCString，两者等价。但是ECMAScript推荐使用toUTCString方法。toGMTString的存在仅仅是
    // 为了向下兼容
    document.cookie = key + "=" + cval + ";expires=" + expire.toUTCString();
  }
}

/**
 * 日期格式化
 * @param  {[type]} format  yyyy-MM-dd hh:mm:ss
 * @return {[type]}        [description]
 */
const dateFormat = (format, time) => {
  let dt = new Date();
  if (time) {
    if (typeof time !== 'number') {
      time = time.toString().replace(/-/g, '/')
    }
    dt = new Date(time);
  }
  var date = {
    "M+": dt.getMonth() + 1,
    "d+": dt.getDate(),
    "h+": dt.getHours(),
    "m+": dt.getMinutes(),
    "s+": dt.getSeconds(),
    "q+": Math.floor((dt.getMonth() + 3) / 3),
    "S+": dt.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length))
    }
  }
  return format
}

/**
 * 数组对象排序,默认升序
 * @DateTime 2017-04-27T12:47:07+0800
 * @param    {[array]}               arrs [需要排序的数组]
 * @param    {[all]}                 prop [数组属性]
 * @return   {[array]}               [排序后的数组]
 */
const orderBy = (arrs, prop, sort = 1) => {
  return arrs.sort(function(obj1, obj2) {
    let val1 = obj1[prop];
    let val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
      if (!sort) {
        [val1, val2] = [val2, val1]
      }
    }
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  })
}

/**
 * 生成时间戳
 * @DateTime 2017-05-18T10:02:36+0800
 * @return   {[String]}                 [时间戳]
 */
const getTimeFormatToday = () => {
  let today = new Date();
  let year = today.getFullYear() + '';
  let month = (today.getMonth() + 1) + '';
  month = (month.length === 1) ? '0' + month : month;
  let day = today.getDate() + '';
  day = (day.length === 1) ? '0' + day : day;
  let hour = today.getHours() + '';
  hour = (hour.length === 1) ? '0' + hour : hour;
  let min = today.getMinutes() + '';
  min = (min.length === 1) ? '0' + min : min;
  let sec = today.getSeconds() + '';
  sec = (sec.length === 1) ? '0' + sec : sec;
  return year + month + day + hour + min + sec;
}

/**
 * 解决滑动上面的浮层下面的内容滚动
 * @DateTime 2017-08-06T12:05:23+0800
 * @return   {[type]}                 [description]
 */
const fixedBody = () => {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  document.body.style.cssText += 'position:fixed;width:100%;height:100%;top:-' + scrollTop + 'px;';
}

const looseBody = () => {
  var body = document.body;
  body.style.position = '';
  body.style.width = '';
  body.style.height = '';
  var top = body.style.top;
  document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
  body.style.top = '';
}

/**
 * 日期倒计时最多到天数
 * @DateTime 2017-9-22T12:05:23+0800
 * @param endTime 活动到期时间   2017-10-10 22:22:22
 * @param intervalId 定时器id
 * @return   {[object]}                 [description]
 */
const timerCountDown = (endTime, intervalId) => {
  let target_date = new Date(endTime).getTime() // set target date
  let current_date = new Date().getTime() // get fixed current date
  let difference = target_date - current_date;
  if (difference < 0) {
    // stop timer
    if (intervalId) {
      clearInterval(intervalId);
    }
    return {
      days: -1,
      hours: -1,
      minutes: -1,
      seconds: -1
    };
  }
  let _second = 1000,
    _minute = _second * 60,
    _hour = _minute * 60,
    _day = _hour * 24;
  let days = Math.floor(difference / _day),
    hours = Math.floor((difference % _day) / _hour),
    minutes = Math.floor((difference % _hour) / _minute),
    seconds = Math.floor((difference % _minute) / _second);
  days = (String(days).length >= 2) ? days : days;
  hours = (String(hours).length >= 2) ? hours : '0' + hours;
  minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
  seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

/**
 * 
 * @param {时差，秒} difference 
 * @param {定时器对象} intervalId 
 */
const giveCardCountDown = (difference, intervalId) => {
  difference = Number(difference);
  if (difference < 0) {
    // stop timer
    if (intervalId) {
      clearInterval(intervalId);
    }
    return {
      hours: "00",
      minutes: "00",
      seconds: "00"
    };
  }
  let _second = 1000, // 秒
    _minute = _second * 60, // 分
    _hour = _minute * 60; // 时
    // _day = _hour * 24; // 天
  let hours = Math.floor(difference / _hour),
    minutes = Math.floor((difference % _hour) / _minute),
    seconds = Math.floor((difference % _minute) / _second);
  hours = (String(hours).length >= 2) ? hours : '0' + hours;
  minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
  seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

/**
 * 计算2个日期之间相差多少天 多少小时
 * @DateTime 2017-9-22T12:05:23+0800
 * @param beginTime 活动到期时间   2017-10-10 22:22:22
 * @return   {[object]}                 [description]
 */
const diffTime = (beginTime, endTime) => {
  beginTime = beginTime.replace(/-/g, "/")
  let target_date = new Date(beginTime).getTime() // set target date
  let current_date = null;
  if (endTime) {
    endTime = endTime.replace(/-/g, "/")
    current_date = new Date(endTime).getTime() // get fixed current date
  } else {
    current_date = new Date().getTime()
  }
  let difference = Math.abs(target_date - current_date);
  let _second = 1000,
    _minute = _second * 60,
    _hour = _minute * 60,
    _day = _hour * 24;
  let days = Math.floor(difference / _day),
    hours = Math.floor((difference % _day) / _hour),
    minutes = Math.floor((difference % _hour) / _minute),
    seconds = Math.floor((difference % _minute) / _second);
  // fix dates so that it will show two digets
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

// 验证手机号 考虑的手机的号段扩展性 故只判断第一位
const valPhone = (phone) => {
  if (phone == "") {
    return false;
  } else if (!/^1\d{10}$/.test(phone)) {
    return false;
  }
  return true;
}

/**
 * 获取url里 ? 的字段
 * @param    {[String]}                 name [key]
 * @return   {[type]}                      [value]
 */
const GetQueryString = name => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  if (location.href.split('?')[1]) {
    let r = location.href.split('?')[1].match(reg);
    if (r != null) return decodeURIComponent(r[2]);
  }
  return null;
}

/**
 * url 去除token
 */
const urlRemoveToken = (url = location.href) => {
  return String(url).replace(/(?![?&])(token)=\w+/gi, '')
}

/**
 * 判断当前的值是否存在
 */
const isExist = opt => {
  let flag = false;
  if (opt !== null && opt !== "" && typeof opt !== "undefined") {
    flag = true;
  }
  return flag;
}

const getLocation = () => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject)=> {
      navigator.geolocation.getCurrentPosition(
        (position) => {//定位成功
          let coords = position.coords
          resolve(coords)
        },
        (error)=> {
          //定位失败
          console.log('获取地理位置失败')
          switch (error.code) {
            case error.TIMEOUT://超时
                alert("A timeout occured! Please try again!")
                break
            case error.POSITION_UNAVAILABLE://表示无法确定设备的位置
                alert('We can\'t detect your location. Sorry!')
                break
            case error.PERMISSION_DENIED://表示没有权限使用地理定位API
                alert('Please allow geolocation access for this to work.')
                break
            case error.UNKNOWN_ERROR:
                alert('An unknown error occured!')
                break
          }
          reject(error)
        },
        {
          // 指示浏览器获取高精度的位置，默认为false
          enableHighAccuracy: true,
          // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
          //timeout: Infinity,
          timeout: 5000,
          // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
          maximumAge: 1000000
        })
    })
  } else {
    alert("当前浏览器不支持定位")
  }
}

export default {
  dbGet,
  dbSet,
  dbRemove,
  ssdbGet,
  ssdbSet,
  ssdbRemove,
  getCookie,
  setCookie,
  deleteCookie,
  dateFormat,
  orderBy,
  valPhone,
  getTimeFormatToday,
  fixedBody,
  looseBody,
  timerCountDown,
  diffTime,
  GetQueryString,
  urlRemoveToken,
  isExist,
  giveCardCountDown,
  getLocation
}
