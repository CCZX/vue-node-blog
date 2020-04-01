
function archivesFormatDate(val) {
  val = String(val)
  let tmpArr = val.split('-')
  return `${tmpArr[0]}年${tmpArr[1]}月`
}

function formatDate(val = '', pattern = 'yyyy-mm-dd hh:mimi:ss') {
  let time = new Date(Number(val))
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  let h = time.getHours()
  let mi = time.getMinutes()
  let s = time.getSeconds()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  h = h < 10 ? '0' + h : h
  mi = mi < 10 ? '0' + mi : mi
  s = s < 10 ? '0' + s : s
  if (pattern == 'yyyy-mm-dd') {
    return `${y}-${m}-${d}`
  } else if(pattern == 'ZH') {
    return `${y}年${m}月${d}日${h}点${mi}分`
  } else {
    return `${y}-${m}-${d} ${h}:${mi}:${s}`
  }
}

// 文章点击目录跳转函数
let jumpTop = (el) => {
  if (el == null) return
  let top = el.offsetTop - 100
  window.scrollTo(0, top)
}
// 防抖函数
function debounce(handler, delay){
  var timer = null;
  return function(){
      var _self = this,_args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function(){
          handler.apply(_self, _args)
      }, delay)
  }
}
export {jumpTop,debounce,archivesFormatDate,formatDate}
