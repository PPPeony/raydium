import BN from 'bn.js';

// 整数部分 每3位进行分割
function numberWithCommas(x: string) {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export const formatNumber = (num?: number, decimals = 2) => {
  if (typeof num !== 'number') return '--';
  return numberWithCommas(num.toFixed(decimals));
};

export const formatBigNumber = (bigN?: BN, decimals = 2) => {
  if (!bigN) return '--';
  const num = bigN.toNumber() / 10 ** decimals;
  return formatNumber(num, decimals);
};
