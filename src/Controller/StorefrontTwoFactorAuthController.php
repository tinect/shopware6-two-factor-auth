<?php

declare(strict_types=1);

namespace Tinect\TwoFactorAuth\Controller;

use Tinect\TwoFactorAuth\Event\StorefrontTwoFactorAuthEvent;
use Tinect\TwoFactorAuth\Event\StorefrontTwoFactorCancelEvent;
use Tinect\TwoFactorAuth\Service\TimebasedOneTimePasswordServiceInterface;
use Shopware\Core\Checkout\Customer\SalesChannel\AbstractLogoutRoute;
use Shopware\Core\Framework\Validation\DataBag\RequestDataBag;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Storefront\Controller\StorefrontController;
use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[AutoconfigureTag(name: 'controller.service_arguments')]
#[Route(defaults: ['_routeScope' => ['storefront']])]
class StorefrontTwoFactorAuthController extends StorefrontController
{
    public function __construct(
        #[Autowire(service: 'Tinect\TwoFactorAuth\Service\TimebasedOneTimePasswordService')]
        private readonly TimebasedOneTimePasswordServiceInterface $totpService,
        #[Autowire(service: 'event_dispatcher')]
        private readonly EventDispatcherInterface $dispatcher,
        #[Autowire(service: 'Shopware\Core\Checkout\Customer\SalesChannel\LogoutRoute')]
        private readonly AbstractLogoutRoute $logoutRoute,
    ) {
    }

    #[Route(path: '/tinect-2fa/verification', name: 'frontend.tinect2fa.verification', methods: ['GET', 'POST'])]
    public function verification(Request $request, SalesChannelContext $context): Response
    {
        $twoFactorSecret = $context->getCustomer()?->getCustomFields()['rl_2fa_secret'] ?? null;

        if (empty($twoFactorSecret) || !\is_string($twoFactorSecret)) {
            if ($request->query->has('redirectTo') === false) {
                $request->query->set('redirectTo', 'frontend.account.login.page');
            }

            return $this->createActionResponse($request);
        }

        if ($request->getMethod() === 'POST') {
            $code = $request->request->getString('otpCode');

            if ($this->totpService->verifyCode(
                $twoFactorSecret,
                $code
            )) {
                $this->dispatcher->dispatch(new StorefrontTwoFactorAuthEvent($context));

                if ($request->query->has('redirectTo') === false) {
                    $request->query->set('redirectTo', 'frontend.account.home.page');
                }

                return $this->createActionResponse($request);
            }

            $this->addFlash('danger', $this->trans('tinect-2fa.account.error.incorrect-code'));
        }

        $redirectQuery = $request->query->all()['redirect'] ?? [];
        $redirectTo = $redirectQuery['redirectTo'] ?? '';

        if ($redirectTo !== '') {
            unset($redirectQuery['redirectTo']);
            $transformedQuery['redirectParameters'] = $redirectQuery;

            $transformedQuery['redirectTo'] = $redirectTo;
            $request->query->add($transformedQuery);
        }

        return $this->render('@TinectTwoFactorAuth/storefront/page/2fa/verification.html.twig', [
            'redirect' => $request->query->all(),
        ]);
    }

    #[Route(path: '/tinect-2fa/verification/cancel', name: 'frontend.tinect2fa.verification.cancel', methods: ['GET'])]
    public function cancelVerification(Request $request, SalesChannelContext $context, RequestDataBag $dataBag): RedirectResponse
    {
        if ($context->getCustomer() !== null) {
            $this->logoutRoute->logout($context, $dataBag);
        }
        $this->dispatcher->dispatch(new StorefrontTwoFactorCancelEvent($context));

        if ($request->query->getString('redirectTo') === '') {
            $request->query->set('redirectTo', 'frontend.account.login.page');
        }

        return $this->createActionResponse($request);
    }
}
