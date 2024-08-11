<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Event\LogoutEvent;

class LogoutSuccessListener implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            LogoutEvent::class => 'onLogout',
        ];
    }

    public function onLogout(LogoutEvent $event)
    {
        $response = new JsonResponse(['success' => true]);
        $response->headers->clearCookie('AUTHORIZATION_JWT');

        $event->setResponse($response);
    }
}
