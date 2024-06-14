<?php

namespace App\Repository;

use App\Entity\Note;
use App\Entity\NoteTag;
use App\Entity\Tag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<NoteTag>
 */
class NoteTagRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, NoteTag::class);
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
