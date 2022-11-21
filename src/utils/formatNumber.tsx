// 整数部分 每3位进行分割
function numberWithCommas(x: string) {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export const formatNumber = (num: number) => {
  return numberWithCommas(num.toFixed(2));
};
