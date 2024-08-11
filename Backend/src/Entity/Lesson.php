<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\LessonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: LessonRepository::class)]
#[ApiResource]
class Lesson
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups("lesson:read")]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    #[Assert\Type(type: 'string')]
    #[Groups("lesson:read")]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotBlank]
    #[Assert\Type(type: 'string')]
    #[Groups("lesson:read")]
    private ?string $content = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotBlank]
    #[Assert\Type(type: User::class)]
    #[Groups("lesson:read")]
    private ?User $teacher = null;

    /**
     * @var Collection<int, User>
     */
    #[ORM\ManyToMany(targetEntity: User::class)]
    #[Groups("lesson:read")]
    private Collection $students;

    public function __construct()
    {
        $this->students = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getTeacher(): ?User
    {
        return $this->teacher;
    }

    public function setTeacher(?User $teacher): static
    {
        $this->teacher = $teacher;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getStudents(): Collection
    {
        return $this->students;
    }

    public function addStudent(User $student): static
    {
        if (!$this->students->contains($student)) {
            $this->students->add($student);
        }

        return $this;
    }

    public function removeStudent(User $student): static
    {
        $this->students->removeElement($student);

        return $this;
    }
}
