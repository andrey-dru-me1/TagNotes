<?php

namespace App\Service;

use App\Entity\Note;
use App\Entity\User;
use DateTimeImmutable;
use App\Entity\NoteTag;
use App\Entity\NoteAccessLog;
use App\Repository\TagRepository;
use App\Repository\NoteRepository;
use App\Repository\NoteTagRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\NoteAccessLogRepository;

class NoteService
{
  public function __construct(
    private EntityManagerInterface $entityManager,
    private NoteTagRepository $noteTagRepository,
    private NoteAccessLogRepository $noteAccessLogRepository,
    private TagRepository $tagRepository,
    private NoteRepository $noteRepository,
  ) {
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

  public function filterNotes(array $tagIds, User $user): array
  {
    $noteIds = $this->noteTagRepository->findNoteIdsByTagIds($tagIds);
    $notes = $this->noteRepository->findByIds($noteIds);
    $userNotes = array_filter($notes, function (Note $note) use ($user) {
      return $note->getAuthor()->getId() === $user->getId();
    });
    return $userNotes;
  }

  public function unpinTag(int $noteId, int $tagId)
  {
    $note = $this->noteRepository->find($noteId);
    $tag = $this->tagRepository->find($tagId);
    $noteTags = $this->noteTagRepository->findBy(['note' => $note, 'tag' => $tag]);
    foreach ($noteTags as $noteTag) {
      $this->entityManager->remove($noteTag);
    }
    $this->entityManager->flush();
  }

  public function pinTag(int $noteId, int $tagId)
  {
    $note = $this->noteRepository->find($noteId);
    $tag = $this->tagRepository->find($tagId);
    if ($this->noteTagRepository->count(['note' => $note, 'tag' => $tag]) == 0) {
      $noteTag = new NoteTag();
      $noteTag->setNote($note);
      $noteTag->setTag($tag);
      $this->entityManager->persist($noteTag);
      $this->entityManager->flush();
    }
  }

  public function listNoteTags(int $noteId)
  {
    $noteTags = $this->noteTagRepository->findBy(['note' => $noteId]);
    $tags = array_map(function (NoteTag $noteTag) {
      return $noteTag->getTag();
    }, $noteTags);
    return $tags;
  }

  public function listNotes(User $user)
  {
    $notes = $user->getNotes()->toArray();
    $sortedNotes = $this->noteAccessLogRepository->sort($notes);
    return $sortedNotes;
  }

  public function accessNote(int $id): Note
  {
    $note = $this->noteRepository->find($id);

    $noteAccess = new NoteAccessLog();
    $noteAccess->setNoteId($note);
    $noteAccess->setAccessDate(new DateTimeImmutable());

    $this->entityManager->persist($noteAccess);
    $this->entityManager->flush();
    return $note;
  }

  public function deleteNote(int $id): void
  {
    $note = $this->noteRepository->find($id);
    $this->entityManager->remove($note);
    $this->entityManager->flush();
  }

  public function editNote(int $id, ?string $title, ?string $content): Note
  {
    $note = $this->noteRepository->find($id);
    if ($title)
      $note->setTitle($title);
    if ($content)
      $note->setContent($content);

    $this->entityManager->persist($note);
    $this->entityManager->flush();

    return $note;
  }
}
