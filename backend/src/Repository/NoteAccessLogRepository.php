<?php

namespace App\Repository;

use App\Entity\NoteAccessLog;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<NoteAccessLog>
 */
class NoteAccessLogRepository extends ServiceEntityRepository
{

    private EntityManagerInterface $em;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        $this->em = $em;
        parent::__construct($registry, NoteAccessLog::class);
    }

    public function sort(array $notes): array
    {
        $currentTime = time();
        $noteAccessLogs = $this->findAll();

        $notePoints = array();
        $idToNote = array();
        foreach ($notes as $note) {
            $noteId = $note->getId();
            $notePoints[$noteId] = 0;
            $idToNote[$noteId] = $note;
        }
        foreach ($noteAccessLogs as $noteAccessLog) {
            $noteId = $noteAccessLog->getNote()->getId();
            $logDate = $noteAccessLog->getAccessDate();
            $logTime = $logDate->getTimestamp();
            if (array_key_exists($noteId, $notePoints)) {
                $diffTime = $currentTime - $logTime;
                $diff = exp(-$diffTime / 1e5);
                if ($diff < 1e-9) {
                    $this->em->remove($noteAccessLog);
                } else {
                    $notePoints[$noteId] += $diff;
                }
            }
        }
        $this->em->flush();
        arsort($notePoints, SORT_NUMERIC);

        $oldNotePoints = array_filter($notePoints, function ($point) {
            return $point < 1e-2;
        });
        $oldNoteIds = array_keys($oldNotePoints);
        $oldNotes = array_map(function (int $noteId) use ($idToNote) {
            return $idToNote[$noteId];
        }, $oldNoteIds);

        $sortedNoteIds = array_keys($notePoints);
        $sortedNotes = array_map(function (int $noteId) use ($idToNote) {
            return $idToNote[$noteId];
        }, $sortedNoteIds);

        $result = ['sorted' => $sortedNotes, 'old' => $oldNotes];
        return $result;
    }
}
