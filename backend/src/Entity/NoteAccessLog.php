<?php

namespace App\Entity;

use App\Repository\NoteAccessLogRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NoteAccessLogRepository::class)]
class NoteAccessLog
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Note $note_id = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $access_date = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(string $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getNoteId(): ?Note
    {
        return $this->note_id;
    }

    public function setNoteId(?Note $note_id): static
    {
        $this->note_id = $note_id;

        return $this;
    }

    public function getAccessDate(): ?\DateTimeImmutable
    {
        return $this->access_date;
    }

    public function setAccessDate(\DateTimeImmutable $access_date): static
    {
        $this->access_date = $access_date;

        return $this;
    }
}