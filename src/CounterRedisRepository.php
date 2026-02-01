<?php

declare(strict_types=1);

namespace App\GitHubProfileViewsCounter;

use Contracts\App\GitHubProfileViewsCounter\CounterRepositoryInterface;

final class CounterRedisRepository implements CounterRepositoryInterface
{
    private \Redis $redis;

    public function __construct(string $redisUrl)
    {
        $parsed = $this->parseUrl($redisUrl);
        
        $this->redis = new \Redis();
        $this->redis->connect($parsed['host'], $parsed['port']);
        $this->redis->auth($parsed['password']);
        $this->redis->select($parsed['database']);
    }

    public function getViewsCountByUsername(Username $username): int
    {
        $key = "views:" . (string) $username;
        $count = $this->redis->get($key);
        
        return $count === false ? 0 : (int) $count;
    }

    public function addViewByUsername(Username $username): void
    {
        $key = "views:" . (string) $username;
        $this->redis->incr($key);
    }

    private function parseUrl(string $url): array
    {
        $parsed = parse_url($url);
        
        return [
            'host' => $parsed['host'] ?? '127.0.0.1',
            'port' => $parsed['port'] ?? 6379,
            'password' => $parsed['pass'] ?? '',
            'database' => isset($parsed['path']) ? (int) ltrim($parsed['path'], '/') : 0,
        ];
    }
}
