const LENGTH_MIN = 1;
const LENGTH_MAX = 39;
const REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export function normalizeUsername(value) {
  const trimmed = value.trim();

  if (trimmed.length < LENGTH_MIN) {
    throw new Error('Username must be at least 1 character long');
  }
  if (trimmed.length > LENGTH_MAX) {
    throw new Error('Username must be at most 39 characters long');
  }
  if (!REGEX.test(trimmed)) {
    throw new Error(
      'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.'
    );
  }

  return trimmed.toLowerCase();
}
