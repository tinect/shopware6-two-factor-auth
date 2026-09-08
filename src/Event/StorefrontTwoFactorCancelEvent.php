<?php

declare(strict_types=1);

namespace Tinect\TwoFactorAuth\Event;

use Shopware\Core\System\SalesChannel\SalesChannelContext;

readonly class StorefrontTwoFactorCancelEvent
{
    public function __construct(private SalesChannelContext $salesChannelContext)
    {
    }

    public function getSalesChannelContext(): SalesChannelContext
    {
        return $this->salesChannelContext;
    }
}
