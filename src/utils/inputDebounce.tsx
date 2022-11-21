export const inputDebounce = (doWork, delayTime)=>{
  // dowork签名 doWork = (cur)=>{ props.onChange(cur)}
  let timer;
  return (nowCur)=>{
    clearTimeout(timer)
    timer = setTimeout(()=>{
      doWork(nowCur)
      // console.log('heelo')
    },delayTime)
  }
}