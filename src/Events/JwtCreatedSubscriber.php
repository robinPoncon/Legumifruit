<?php 

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

/**
 * JwtCreatedSubscriber allows to update the token data
 */
class JwtCreatedSubscriber 
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
        $user = $event->getUser();

        $data = $event->getData();
        $data["id"] = $user->getId();
        $data["firstName"] = $user->getFirstName();
        $data["lastName"] = $user->getLastName();
        $data["colorTheme"] = $user->getColorTheme();
        $data["locale"] = $user->getLocale();

        $event->setData($data);
    }
}