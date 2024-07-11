<?php

namespace App\Repository;

use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use App\Entity\Tag;
use App\Entity\NoteTag;
use App\Entity\Note;

/**
 * @extends ServiceEntityRepository<NoteTag>
 */
class NoteTagRepository extends ServiceEntityRepository
{
  public function __construct(ManagerRegistry $registry)
  {
    parent::__construct($registry, NoteTag::class);
  }

  public function findNoteIdsByTagIds(array $tags)
  {
    $tagCount = count($tags);
    return $this->createQueryBuilder("n")
      ->select("IDENTITY(n.note)")
      // ->from('note_tag', 'nt')
      ->where("n.tag IN (:tags)")
      ->setParameter("tags", $tags)
      ->groupBy("n.note")
      ->having("COUNT(DISTINCT n.tag) = :tagCount")
      ->setParameter("tagCount", $tagCount)
      ->distinct()
      ->getQuery()
      ->getResult();
  }

  //    /**
  //     * @return NoteTag[] Returns an array of NoteTag objects
  //     */
  //    public function findByNote(Note $note): array
  //    {
  //        return $this->createQueryBuilder('n')
  //            ->andWhere('n.note = :val')
  //            ->setParameter('val', $note)
  //            ->orderBy('n.id', 'ASC')
  //            ->getQuery()
  //            ->getResult();
  //    }
  //
  //    /**
  //     * @return NoteTag[] Returns an array of NoteTag objects
  //     */
  //    public function findByTag(Tag $tag): array
  //    {
  //        return $this->createQueryBuilder('n')
  //            ->andWhere('n.note = :val')
  //            ->setParameter('val', $tag)
  //            ->orderBy('n.id', 'ASC')
  //            ->getQuery()
  //            ->getResult();
  //    }
  //
  //    public function findByNoteAndTag(Note $note, Tag $tag): array
  //    {
  //        return $this->createQueryBuilder('n')
  //            ->andWhere('n.note = :note')
  //            ->andWhere('n.tag = :tag')
  //            ->setParameter('note', $note)
  //            ->setParameter('tag', $tag)
  //            ->getQuery()
  //            ->getResult();
  //    }
}
