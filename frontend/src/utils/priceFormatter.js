export function formatPriceToPersian(price) {
  const persianNumber = new Intl.NumberFormat('fa-IR', { minimumFractionDigits: 0 }).format(price);
    return `${persianNumber} ریال`;
}
