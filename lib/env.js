export function getEnv(key) {
  const value = process.env[key];
  return value === undefined ? null : value;
}

export function requireEnv(key) {
  const value = getEnv(key);
  if (value === null || value === '') {
    throw new Error(`Missing required environment variable \`${key}\``);
  }
  return value;
}
