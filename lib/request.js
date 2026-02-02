import { escapeHtml } from './format';

export function parseQueryParams(searchParams) {
  const getValue = (key) => {
    const value = searchParams.get(key);
    return value === null ? null : escapeHtml(value);
  };

  return {
    username: getValue('username') ?? '',
    label: getValue('label'),
    color: getValue('color'),
    style: getValue('style'),
    base: getValue('base'),
    isCountAbbreviated: phpBoolValue(searchParams.get('abbreviated')),
  };
}

function phpBoolValue(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (value === '' || value === '0') {
    return false;
  }
  return true;
}
