<?php

declare(strict_types=1);

namespace Tinect\TwoFactorAuth\Subscriber;

use Tinect\TwoFactorAuth\Event\StorefrontTwoFactorAuthEvent;
use Tinect\TwoFactorAuth\Event\StorefrontTwoFactorCancelEvent;
use Shopware\Core\Checkout\Customer\Event\CustomerLoginEvent;
use Shopware\Core\SalesChannelRequest;
use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\Routing\RouterInterface;

#[AutoconfigureTag(name: 'kernel.event_subscriber')]
readonly class CustomerLoginSubscriber implements EventSubscriberInterface
{
    public const SESSION_NAME = 'TINECT_2FA_NEED_VERIFICATION';

    public function __construct(
        private RequestStack $requestStack,
        #[Autowire(service: 'router')]
        private RouterInterface $router,
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            CustomerLoginEvent::class => 'onCustomerLoginEvent',
            ControllerEvent::class => 'onController',
            StorefrontTwoFactorAuthEvent::class => 'removeSession',
            StorefrontTwoFactorCancelEvent::class => 'removeSession',
        ];
    }

    public function onController(ControllerEvent $event): void
    {
        if (!$this->requestStack->getSession()->has(self::SESSION_NAME)) {
            return;
        }

        if (!$event->isMainRequest()) {
            return;
        }

        if ($event->getRequest()->isXmlHttpRequest()) {
            return;
        }

        if (!$event->getRequest()->attributes->get(SalesChannelRequest::ATTRIBUTE_IS_SALES_CHANNEL_REQUEST)) {
            return;
        }

        if ($event->getRequest()->attributes->get('_esi') === true) {
            return;
        }

        if ($this->isVerificationRoute($event)) {
            return;
        }

        $queries = $event->getRequest()->query;
        $parameters = [];

        if ($queries->has('redirectTo')) {
            $parameters['redirect'] = $queries->all();
        }

        $url = $this->router->generate('frontend.tinect2fa.verification', $parameters);

        $response = new RedirectResponse($url);

        $response->send();
    }

    public function onCustomerLoginEvent(CustomerLoginEvent $event): void
    {
        if (empty($event->getCustomer()->getCustomFields()['rl_2fa_secret'] ?? null)) {
            return;
        }

        $this->requestStack->getSession()->set(self::SESSION_NAME, true);
    }

    public function removeSession(): void
    {
        $this->requestStack->getSession()->remove(self::SESSION_NAME);
    }

    private function isVerificationRoute(ControllerEvent $event): bool
    {
        $route = (string) $event->getRequest()->attributes->get('_route');

        return \in_array($route, ['frontend.tinect2fa.verification', 'frontend.tinect2fa.verification.cancel'], true);
    }
}
