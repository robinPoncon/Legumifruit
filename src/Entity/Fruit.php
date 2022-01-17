<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\FruitRepository;
use App\Controller\UploadImageController;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=FruitRepository::class)
 * @Vich\Uploadable
 * @UniqueEntity(
 *  fields={"nameEN", "nameFR"},
 *  message="The name of the fruit you entered already exists."
 * )
 * @ApiResource(
 *      normalizationContext={
 *          "groups"={"fruit_read"}
 *      },
 *      collectionOperations={
 *          "get",
 *          "post",
 *          "image"={
 *              "method"="POST",
 *              "path"="/fruits/{id}/image",
 *              "deserialize"=false,
 *              "controller"=UploadImageController::class,
 *          }
 *       }
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
    private $nameEN;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"fruit_read"})
     */
    private $descriptionEN;

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
    private $nameFR;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"fruit_read"})
     */
    private $descriptionFR;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @var File|null
     * @Vich\UploadableField(mapping="fruit_image", fileNameProperty="filePath")
     */
    private $file;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $filePath;

    /**
     * @var string|null
     * @Groups({"fruit_read"})
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

    public function getDescriptionEn(): ?string
    {
        return $this->descriptionEN;
    }

    public function setDescriptionEn(?string $descriptionEN): self
    {
        $this->descriptionEN = $descriptionEN;

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

    public function getNameFR(): ?string
    {
        return $this->nameFR;
    }

    public function setNameFR(?string $nameFR): self
    {
        $this->nameFR = $nameFR;

        return $this;
    }

    public function getDescriptionFr(): ?string
    {
        return $this->descriptionFR;
    }

    public function setDescriptionFr(?string $descriptionFR): self
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

    public function setFile(?File $file): Fruit
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
