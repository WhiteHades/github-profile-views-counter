<?php

declare(strict_types=1);

namespace Contracts\App\GitHubProfileViewsCounter;

use App\GitHubProfileViewsCounter\Username;

interface CounterRepositoryInterface
{
    public function getViewsCountByUsername(
        Username $username
    ): int;

    public function addViewByUsername(
        Username $username
    ): void;
}
