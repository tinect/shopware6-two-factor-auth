<?php

declare(strict_types=1);

namespace Tinect\TwoFactorAuth;

use Shopware\Core\Framework\Plugin;

class TinectTwoFactorAuth extends Plugin
{
    public function executeComposerCommands(): bool
    {
        return true;
    }
}
