<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create("fr_FR");
        $locale = ["en", "fr"];
        $colorTheme = ["light", "dark"];

        // Fake users
        for($u = 0; $u < 5; $u++) {
            $user = new User;
            $user->setPseudonyme($faker->userName())
                ->setEmail($faker->email())
                ->setPassword($this->hasher->hashPassword($user, "user"))
                ->setFirstName($faker->firstName())
                ->setLastName($faker->lastName())
                ->setLogo($faker->imageUrl(80, 80))
                ->setLocale($locale[rand(0, 1)])
                ->setColorTheme($colorTheme[rand(0,1)])
            ;
            $manager->persist($user);
        }

        // $product = new Product();
        // $manager->persist($product);

        $manager->flush();
    }
}
