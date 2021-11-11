<?php

namespace App\Entity;

use App\Repository\VegetableRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=VegetableRepository::class)
 * @UniqueEntity(
 *  fields={"name"},
 *  message="The name of the vegetable you entered already exists."
 * )
 */
class Vegetable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50, unique=true)
     * @Assert\NotBlank(message="This field cannot be empty.")
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $image;

    /**
     * @ORM\ManyToMany(targetEntity=Calendar::class, inversedBy="vegetables")
     */
    private $calendar;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="vegetables")
     */
    private $users;

    public function __construct()
    {
        $this->calendar = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    /**
     * @return Collection|Calendar[]
     */
    public function getCalendar(): Collection
    {
        return $this->calendar;
    }

    public function addCalendar(Calendar $calendar): self
    {
        if (!$this->calendar->contains($calendar)) {
            $this->calendar[] = $calendar;
        }

        return $this;
    }

    public function removeCalendar(Calendar $calendar): self
    {
        $this->calendar->removeElement($calendar);

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addVegetable($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removeVegetable($this);
        }

        return $this;
    }
}
