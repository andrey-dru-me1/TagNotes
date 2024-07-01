<?php

namespace App\Repository;

use App\Entity\NoteAccessLog;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<NoteAccessLog>
 */
class NoteAccessLogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
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
            $logTime = $noteAccessLog->getAccessDate()->getTimestamp();
            if (!array_key_exists($noteId, $notePoints)) {
                $notePoints[$noteId] = 0.;
            }
            $diffTime = $currentTime - $logTime;
            $notePoints[$noteId] += 1. / $diffTime;
        }
        arsort($notePoints, SORT_NUMERIC);
        $sortedNoteIds = array_keys($notePoints);
        $sortedNotes = array_map(function (int $noteId) use ($idToNote) {
            return $idToNote[$noteId];
        }, $sortedNoteIds);
        return $sortedNotes;
    }
}
