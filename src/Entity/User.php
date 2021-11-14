<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity(
 *  fields={"email"},
 *  message="The email address you entered is already in use."
 * )
 * @UniqueEntity(
 *  fields={"pseudonyme"},
 *  message="The pseudonyme you entered already exists."
 * )
 * @ApiResource(
 *      normalizationContext={
 *          "groups"={"user_read"}
 *      }
 * )
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\Email(message="This email is not valid.")
     * @Groups({"user_read"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"user_read"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @Assert\NotBlank(message="This field cannot be empty.")
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\NotBlank(message="This field cannot be empty.")
     * @Groups({"user_read"})
     */
    private $pseudonyme;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_read"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_read"})
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_read"})
     */
    private $logo;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     * @Groups({"user_read"})
     */
    private $locale;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     * @Groups({"user_read"})
     */
    private $colorTheme;

    /**
     * @ORM\ManyToMany(targetEntity=Vegetable::class, inversedBy="users")
     * @Groups({"user_read"})
     */
    private $vegetables;

    /**
     * @ORM\ManyToMany(targetEntity=Fruit::class, inversedBy="users")
     * @Groups({"user_read"})
     */
    private $fruits;

    public function __construct()
    {
        $this->vegetables = new ArrayCollection();
        $this->fruits = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getPseudonyme(): ?string
    {
        return $this->pseudonyme;
    }

    public function setPseudonyme(string $pseudonyme): self
    {
        $this->pseudonyme = $pseudonyme;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(?string $logo): self
    {
        $this->logo = $logo;

        return $this;
    }

    public function getLocale(): ?string
    {
        return $this->locale;
    }

    public function setLocale(?string $locale): self
    {
        $this->locale = $locale;

        return $this;
    }

    public function getColorTheme(): ?string
    {
        return $this->colorTheme;
    }

    public function setColorTheme(?string $colorTheme): self
    {
        $this->colorTheme = $colorTheme;

        return $this;
    }

    /**
     * @return Collection|Vegetable[]
     */
    public function getVegetables(): Collection
    {
        return $this->vegetables;
    }

    public function addVegetable(Vegetable $vegetable): self
    {
        if (!$this->vegetables->contains($vegetable)) {
            $this->vegetables[] = $vegetable;
        }

        return $this;
    }

    public function removeVegetable(Vegetable $vegetable): self
    {
        $this->vegetables->removeElement($vegetable);

        return $this;
    }

    /**
     * @return Collection|Fruit[]
     */
    public function getFruits(): Collection
    {
        return $this->fruits;
    }

    public function addFruit(Fruit $fruit): self
    {
        if (!$this->fruits->contains($fruit)) {
            $this->fruits[] = $fruit;
        }

        return $this;
    }

    public function removeFruit(Fruit $fruit): self
    {
        $this->fruits->removeElement($fruit);

        return $this;
    }
}
