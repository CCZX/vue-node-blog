// 图片生成随机名称
function imgRandomName() {
  let name = Date.now().toString(16)
  name = `cc_${name}`
  const DATA = '0123456789abcdefghi'
  
  return name
}
function formatDate(val, flag = false) {
  let time = new Date(Number(val));
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mi = time.getMinutes();
  let s = time.getSeconds();
  m = m<10?'0'+m:m;
  d = d<10?'0'+d:d;
  h = h<10?'0'+h:h;
  mi = mi<10?'0'+mi:mi;
  s = s<10?'0'+s:s;
  if (!flag) {
    return `${y}-${m}-${d}`;
  }
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
}
export {imgRandomName, formatDate}
