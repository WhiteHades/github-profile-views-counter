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
        $env = $dotEnv->load();

        $dotEnv->required([
            'REPOSITORY',
        ]);

        $repositoryType = $env['REPOSITORY'];

        switch ($repositoryType) {
            case 'pdo':
                $dotEnv->required([
                    'DB_DRIVER',
                    'DB_HOST',
                    'DB_PORT',
                    'DB_USER',
                    'DB_PASSWORD',
                    'DB_NAME',
                ]);

                $dsn = sprintf(
                    '%s:host=%s;port=%d;dbname=%s',
                    $env['DB_DRIVER'],
                    $env['DB_HOST'],
                    $env['DB_PORT'],
                    $env['DB_NAME'],
                );
                $dbConnection = new PDO(
                    $dsn,
                    $env['DB_USER'],
                    $env['DB_PASSWORD'],
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    ],
                );

                return new CounterPdoRepository($dbConnection);
            case 'file':
                $dotEnv->required([
                    'FILE_STORAGE_PATH',
                ]);

                $storagePath = $env['FILE_STORAGE_PATH'] !== ''
                    ? $env['FILE_STORAGE_PATH']
                    : $appBasePath . '/storage';

                return new CounterFileRepository($storagePath);
            case 'redis':
                $dotEnv->required([
                    'REDIS_URL',
                ]);

                return new CounterRedisRepository($env['REDIS_URL']);
            default:
                throw new \Exception(
                    "Unsupported repository `$repositoryType`",
                );
        }
    }
}
