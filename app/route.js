import { Count } from '../lib/count';
import {
  normalizeStyle,
  renderBadgeWithCount,
  renderBadgeWithError,
  renderPixel,
} from '../lib/badge';
import { createRepository } from '../lib/repositories';
import { parseQueryParams } from '../lib/request';
import { normalizeUsername } from '../lib/username';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SECURITY_HEADERS = {
  'Content-Type': 'image/svg+xml',
  'Cache-Control': 'max-age=0, no-cache, no-store, must-revalidate',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const params = parseQueryParams(searchParams);
  const rawUsername = params.username.trim();

  if (rawUsername === '') {
    return Response.redirect('https://github.com/WhiteHades');
  }

  const badgeLabel = params.label ?? 'Profile views';
  const badgeColor = params.color ?? 'cba6f7';
  const badgeStyle = normalizeStyle(params.style ?? 'flat');
  const baseCount = params.base ?? '0';
  const isCountAbbreviated = params.isCountAbbreviated;
  const userAgent = request.headers.get('user-agent') ?? '';
  const isGitHubUserAgent = userAgent.startsWith('github-camo');

  try {
    const repository = createRepository();
    const username = normalizeUsername(rawUsername);

    if (isGitHubUserAgent) {
      await repository.addViewByUsername(username);
    }

    if (badgeStyle === 'pixel') {
      return new Response(renderPixel(), { headers: SECURITY_HEADERS });
    }

    let count = new Count(await repository.getViewsCountByUsername(username));
    if (baseCount !== '0') {
      count = count.plus(Count.ofString(baseCount));
    }

    const svg = renderBadgeWithCount(
      badgeLabel,
      count,
      badgeColor,
      badgeStyle,
      isCountAbbreviated
    );

    return new Response(svg, { headers: SECURITY_HEADERS });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const svg = renderBadgeWithError(badgeLabel, message, badgeStyle);

    return new Response(svg, { headers: SECURITY_HEADERS });
  }
}
