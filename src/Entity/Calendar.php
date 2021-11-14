<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CalendarRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=CalendarRepository::class)
 * @UniqueEntity(
 *  fields={"name"},
 *  message="The name of the month you entered already exists."
 * )
 * @ApiResource(
 *      normalizationContext={
 *          "groups"={"calendar_read"}
 *      }
 * )
 */
class Calendar
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"calendar_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50, unique=true)
     * @Assert\NotBlank(message="This field cannot be empty.")
     * @Groups({"calendar_read"})
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity=Vegetable::class, mappedBy="calendar")
     * @Groups({"calendar_read"})
     */
    private $vegetables;

    /**
     * @ORM\ManyToMany(targetEntity=Fruit::class, mappedBy="calendar")
     * @Groups({"calendar_read"})
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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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
            $vegetable->addCalendar($this);
        }

        return $this;
    }

    public function removeVegetable(Vegetable $vegetable): self
    {
        if ($this->vegetables->removeElement($vegetable)) {
            $vegetable->removeCalendar($this);
        }

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
            $fruit->addCalendar($this);
        }

        return $this;
    }

    public function removeFruit(Fruit $fruit): self
    {
        if ($this->fruits->removeElement($fruit)) {
            $fruit->removeCalendar($this);
        }

        return $this;
    }
}
