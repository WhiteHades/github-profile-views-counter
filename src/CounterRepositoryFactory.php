<?php

declare(strict_types=1);

namespace App\GitHubProfileViewsCounter;

use Contracts\App\GitHubProfileViewsCounter\CounterRepositoryInterface;
use Dotenv\Dotenv;
use PDO;

final class CounterRepositoryFactory
{
    public function create(
        string $appBasePath
    ): CounterRepositoryInterface {
        $dotEnv = Dotenv::createImmutable($appBasePath);
        $dotEnv->safeLoad();

        $repositoryType = $this->requireEnv('REPOSITORY');

        switch ($repositoryType) {
            case 'pdo':
                $dbDriver = $this->requireEnv('DB_DRIVER');
                $dbHost = $this->requireEnv('DB_HOST');
                $dbPort = (int) $this->requireEnv('DB_PORT');
                $dbUser = $this->requireEnv('DB_USER');
                $dbPassword = $this->requireEnv('DB_PASSWORD');
                $dbName = $this->requireEnv('DB_NAME');
                $dsn = sprintf(
                    '%s:host=%s;port=%d;dbname=%s',
                    $dbDriver,
                    $dbHost,
                    $dbPort,
                    $dbName,
                );
                $dbConnection = new PDO(
                    $dsn,
                    $dbUser,
                    $dbPassword,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    ],
                );

                return new CounterPdoRepository($dbConnection);
            case 'file':
                $storagePath = $this->getEnv('FILE_STORAGE_PATH');
                $storagePath = $storagePath !== null && $storagePath !== ''
                    ? $storagePath
                    : $appBasePath . '/storage';

                return new CounterFileRepository($storagePath);
            case 'redis':
                $redisUrl = $this->requireEnv('REDIS_URL');

                return new CounterRedisRepository($redisUrl);
            default:
                throw new \Exception(
                    "Unsupported repository `$repositoryType`",
                );
        }
    }

    private function getEnv(string $key): ?string
    {
        $value = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);

        if ($value === false || $value === null) {
            return null;
        }

        return (string) $value;
    }

    private function requireEnv(string $key): string
    {
        $value = $this->getEnv($key);

        if ($value === null || $value === '') {
            throw new \RuntimeException(
                "Missing required environment variable `$key`",
            );
        }

        return $value;
    }
}
