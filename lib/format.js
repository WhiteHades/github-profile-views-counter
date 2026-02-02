const ABBREVIATIONS = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];

export function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function formatNumber(number, abbreviated) {
  if (abbreviated) {
    return formatAbbreviatedNumber(number);
  }

  const value = String(number);
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatAbbreviatedNumber(number) {
  let value = number;
  let index = 0;

  while (value >= 1000 && index < ABBREVIATIONS.length - 1) {
    value /= 1000;
    index += 1;
  }

  const rounded = Math.round(value * 10) / 10;
  const formatted = Number.isInteger(rounded) ? String(rounded) : String(rounded);

  return `${formatted}${ABBREVIATIONS[index]}`;
}
