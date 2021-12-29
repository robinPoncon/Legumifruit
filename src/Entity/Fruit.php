<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\FruitRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=FruitRepository::class)
 * @UniqueEntity(
 *  fields={"name_en, name_fr"},
 *  message="The name of the fruit you entered already exists."
 * )
 * @ApiResource(
 *      normalizationContext={
 *          "groups"={"fruit_read"}
 *      }
 * )
 */
class Fruit
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"fruit_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50, unique=true)
     * @Assert\NotBlank(message="This field cannot be empty.")
     * @Groups({"fruit_read"})
     */
    private $name_en;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"fruit_read"})
     */
    private $description_en;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"fruit_read"})
     */
    private $image;

    /**
     * @ORM\ManyToMany(targetEntity=Calendar::class, inversedBy="fruits")
     * @Groups({"fruit_read"})
     */
    private $calendar;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="fruits")
     * @Groups({"fruit_read"})
     */
    private $users;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @Groups({"fruit_read"})
     */
    private $name_fr;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"fruit_read"})
     */
    private $description_fr;

    public function __construct()
    {
        $this->calendar = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNameEn(): ?string
    {
        return $this->name_en;
    }

    public function setNameEn(string $name_en): self
    {
        $this->name_en = $name_en;

        return $this;
    }

    public function getDescriptionEn(): ?string
    {
        return $this->description_en;
    }

    public function setDescriptionEn(?string $description_en): self
    {
        $this->description_en = $description_en;

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
            $user->addFruit($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removeFruit($this);
        }

        return $this;
    }

    public function getNameFr(): ?string
    {
        return $this->name_fr;
    }

    public function setNameFr(?string $name_fr): self
    {
        $this->name_fr = $name_fr;

        return $this;
    }

    public function getDescriptionFr(): ?string
    {
        return $this->description_fr;
    }

    public function setDescriptionFr(?string $description_fr): self
    {
        $this->description_fr = $description_fr;

        return $this;
    }
}
