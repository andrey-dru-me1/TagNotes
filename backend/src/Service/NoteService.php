<?php

namespace App\Service;

use App\Entity\Note;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class NoteService
{
  public function __construct(private EntityManagerInterface $entityManager)
  {
  }

  public function createNote(array $noteDto, User $user): Note
  {
    $note = new Note();
    $note->setTitle($noteDto['title']);
    $note->setContent($noteDto['content']);
    $note->setAuthor($user);

    $this->entityManager->persist($note);
    $this->entityManager->flush();

    return $note;
  }
}
