<?php

namespace App\Service;

use App\Entity\NoteTag;
use App\Entity\Tag;
use App\Repository\TagRepository;
use App\Repository\NoteRepository;
use App\Repository\NoteTagRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\NoteAccessLogRepository;

class TagService
{
  public function __construct(
    private EntityManagerInterface $entityManager,
    private NoteTagRepository $noteTagRepository,
    private NoteAccessLogRepository $noteAccessLogRepository,
    private TagRepository $tagRepository,
    private NoteRepository $noteRepository,
  ) {
  }

  public function listTagNotes(int $id): array
  {
    $noteTags = $this->noteTagRepository->findBy(['tag' => $id]);
    $notes = array_map(function (NoteTag $noteTag) {
      return $noteTag->getNote();
    }, $noteTags);
    return $notes;
  }

  public function listTags()
  {
    $tags = $this->tagRepository->findAll();
    return $tags;
  }

  public function getTag(int $id): Tag
  {
    $tag = $this->tagRepository->find($id);
    return $tag;
  }

  public function editTag(
    int $id,
    ?string $name,
  ): Tag {
    $tag = $this->tagRepository->find($id);
    if ($name)
      $tag->setName($name);

    $this->entityManager->persist($tag);
    $this->entityManager->flush();

    return $tag;
  }

  public function deleteTag(
    int $id,
  ): void {
    $tag = $this->tagRepository->find($id);

    $this->entityManager->remove($tag);
    $this->entityManager->flush();
  }

  public function createTag(string $name): Tag
  {
    $tag = new Tag();
    $tag->setName($name);

    $this->entityManager->persist($tag);
    $this->entityManager->flush();

    return $tag;
  }
}
