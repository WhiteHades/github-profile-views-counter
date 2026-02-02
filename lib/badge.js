import { makeBadge } from 'badge-maker';
import { escapeHtml, formatNumber } from './format';

const ALLOWED_STYLES = new Set([
  'flat',
  'flat-square',
  'plastic',
  'for-the-badge',
  'pixel',
]);

export function normalizeStyle(style) {
  if (style && ALLOWED_STYLES.has(style)) {
    return style;
  }
  return 'flat';
}

export function renderBadgeWithCount(label, count, color, style, abbreviated) {
  const message = formatNumber(count.toInt(), abbreviated);
  return renderBadge(label, message, color, style);
}

export function renderBadgeWithError(label, message, style) {
  return renderBadge(label, message, 'red', style);
}

export function renderPixel() {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>';
}

function renderBadge(label, message, color, style) {
  const safeLabel = escapeHtml(label);
  const safeMessage = escapeHtml(message);
  const badgeStyle = normalizeStyle(style === 'pixel' ? 'flat' : style);

  return makeBadge({
    label: safeLabel,
    message: safeMessage,
    color,
    style: badgeStyle,
  });
}
