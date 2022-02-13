<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\VegetableRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\Common\Collections\ArrayCollection;
use App\Controller\UploadImageVegetableController;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity(repositoryClass=VegetableRepository::class)
 * @Vich\Uploadable
 * @UniqueEntity(
 *  fields={"nameFR"},
 *  message="The name of the vegetable you entered already exists."
 * )
 * @ApiResource(
 *      normalizationContext={
 *          "groups"={"vegetable_read"}
 *      },
 *      collectionOperations={
 *          "get",
 *          "post",
 *          "image"={
 *              "method"="POST",
 *              "path"="/vegetables/{id}/image",
 *              "deserialize"=false,
 *              "controller"=UploadImageVegetableController::class,
 *          }
 *       }
 * )
 */
class Vegetable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"vegetable_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @Groups({"vegetable_read"})
     */
    private $nameEN;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"vegetable_read"})
     */
    private $descriptionEN;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"vegetable_read"})
     */
    private $image;

    /**
     * @ORM\ManyToMany(targetEntity=Calendar::class, inversedBy="vegetables")
     * @Groups({"vegetable_read"})
     */
    private $calendar;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="vegetables")
     * @Groups({"vegetable_read"})
     */
    private $users;

    /**
     * @ORM\Column(type="string", length=50, unique=true)
     * @Assert\NotBlank(message="This field cannot be empty.")
     * @Groups({"vegetable_read"})
     */
    private $nameFR;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"vegetable_read"})
     */
    private $descriptionFR;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @var File|null
     * @Vich\UploadableField(mapping="vegetable_image", fileNameProperty="filePath")
     */
    private $file;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $filePath;

    /**
     * @var string|null
     * @Groups({"vegetable_read"})
     */
    private $fileUrl;

    public function __construct()
    {
        $this->calendar = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNameEN(): ?string
    {
        return $this->nameEN;
    }

    public function setNameEN(string $nameEN): self
    {
        $this->nameEN = $nameEN;

        return $this;
    }

    public function getDescriptionEN(): ?string
    {
        return $this->descriptionEN;
    }

    public function setDescriptionEN(?string $descriptionEN): self
    {
        $this->descriptionEN = $descriptionEN;

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

    public function getNameFR(): ?string
    {
        return $this->nameFR;
    }

    public function setNameFR(?string $nameFR): self
    {
        $this->nameFR = $nameFR;

        return $this;
    }

    public function getDescriptionFR(): ?string
    {
        return $this->descriptionFR;
    }

    public function setDescriptionFR(?string $descriptionFR): self
    {
        $this->descriptionFR = $descriptionFR;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(?string $filePath): self
    {
        $this->filePath = $filePath;

        return $this;
    }

    public function getFile(): ?File 
    {
        return $this->file;
    }

    public function setFile(?File $file): Vegetable
    {
        $this->file = $file;
        return $this;
    }

    public function getFileUrl()
    {
        return $this->fileUrl;
    }

    public function setFileUrl($fileUrl)
    {
        $this->fileUrl = $fileUrl;

        return $this;
    }
}
