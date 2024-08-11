<?php

namespace App\EventSubscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessListener implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            'lexik_jwt_authentication.on_authentication_success' => 'onAuthenticationSuccessResponse',
        ];
    }

    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $user = $event->getUser();
        if (!$user instanceof UserInterface) {
            return;
        }

        $data = $event->getData();

        $data['roles'] = $user->getRoles();
        $data['username'] = $user->getUserIdentifier();

        $event->setData($data);
    }
}
