<?php

namespace App\Controller;

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
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class NoteController extends AbstractController
{

    #[Route('/api/notes/filter', name: 'filter', methods: ['POST'])]
    public function filterNotes(Request $request, NoteRepository $noteRepository, NoteTagRepository $noteTagRepository, #[CurrentUser] ?User $user)
    {
        $tagIds = json_decode($request->getContent(), true);
        $noteIds = $noteTagRepository->findNoteIdsByTagIds($tagIds);
        $notes = $noteRepository->findByIds($noteIds);
        $userNotes = array_filter($notes, function (Note $note) use ($user) {
            return $note->getAuthor()->getId() === $user->getId();
        });
        return $this->json($userNotes);
    }

    #[Route('/api/note/{noteId}/tag/{tagId}', name: 'remove_tag', methods: ['DELETE'])]
    public function removeTag(
        int $noteId,
        int $tagId,
        NoteRepository $noteRepository,
        TagRepository $tagRepository,
        NoteTagRepository $noteTagRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $note = $noteRepository->find($noteId);
        $tag = $tagRepository->find($tagId);
        $noteTags = $noteTagRepository->findBy(['note' => $note, 'tag' => $tag]);
        foreach ($noteTags as $noteTag) {
            $entityManager->remove($noteTag);
        }
        $entityManager->flush();

        $data = [
            'status' => Response::HTTP_OK,
            'success' => 'Tag is successfully unpinned from note',
        ];
        return new JsonResponse($data, $data['status']);
    }

    #[Route('/api/note/{noteId}/tag/{tagId}', name: 'append_tag', methods: ['POST'])]
    public function appendTag(
        int $noteId,
        int $tagId,
        NoteRepository $noteRepository,
        TagRepository $tagRepository,
        NoteTagRepository $noteTagRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $note = $noteRepository->find($noteId);
        $tag = $tagRepository->find($tagId);
        if ($noteTagRepository->count(['note' => $note, 'tag' => $tag]) == 0) {
            $noteTag = new NoteTag();
            $noteTag->setNote($note);
            $noteTag->setTag($tag);
            $entityManager->persist($noteTag);
            $entityManager->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Tag is successfully added to note',
            ];
        } else {
            $data = [
                'status' => Response::HTTP_BAD_REQUEST,
                'error' => 'Relation has already existed',
            ];
        }
        return new JsonResponse($data, $data['status']);
    }

    #[Route('/api/note/{id}/tags', name: 'list_note_tags', methods: ['GET'])]
    public function listTags(int $id, NoteTagRepository $noteTagRepository): JsonResponse
    {
        $noteTags = $noteTagRepository->findBy(['note' => $id]);
        $tags = array_map(function (NoteTag $noteTag) {
            return $noteTag->getTag();
        }, $noteTags);
        return $this->json($tags, Response::HTTP_OK);
    }

    #[Route('/api/notes', name: 'list_notes', methods: ['GET'])]
    public function listNotes(#[CurrentUser] ?User $user, NoteRepository $noteRepository, NoteAccessLogRepository $noteAccessLogRepository): JsonResponse
    {
        $notes = $user->getNotes()->toArray();
        $sortedNotes = $noteAccessLogRepository->sort($notes);
        return $this->json($sortedNotes, Response::HTTP_OK);
    }

    #[Route('/api/note/{id}', name: 'get_note', methods: ['GET'])]
    public function getNote(int $id, NoteRepository $noteRepository, EntityManagerInterface $em): JsonResponse
    {
        $note = $noteRepository->find($id);

        $noteAccess = new NoteAccessLog();
        $noteAccess->setNoteId($note);
        $noteAccess->setAccessDate(new DateTimeImmutable());

        $em->persist($noteAccess);
        $em->flush();

        return $this->json($note, Response::HTTP_OK);
    }

    #[Route('/api/note/{id}', name: 'delete_note', methods: ['DELETE'])]
    public function deleteNote(int $id, NoteRepository $noteRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $note = $noteRepository->find($id);
        $entityManager->remove($note);
        $entityManager->flush();

        $data = [
            'status' => Response::HTTP_OK,
            'success' => 'Note is successfully deleted',
        ];
        return new JsonResponse($data, $data['status']);
    }

    #[Route('/api/note/{id}', name: 'edit_note', methods: ['POST'])]
    public function editNote(
        int $id,
        Request $request,
        NoteRepository $noteRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        try {
            $data = json_decode($request->getContent(), true);

            $note = $noteRepository->find($id);
            if (null === $note) {
                return $this->json("Note with id '$id' not found.", Response::HTTP_NOT_FOUND);
            }

            if (array_key_exists('title', $data)) {
                $note->setTitle($data['title']);
            }

            if (array_key_exists('content', $data)) {
                $note->setContent($data['content']);
            }

            $entityManager->persist($note);
            $entityManager->flush();

            return $this->json($note, Response::HTTP_OK);
        } catch (\Exception $e) {
            return $this->json("$e", Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/note', name: 'create_note', methods: ['POST'])]
    public function index(Request $request, EntityManagerInterface $entityManager, #[CurrentUser] ?User $user): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $note = new Note();
            $note->setTitle($data['title']);
            $note->setContent($data['content']);
            $note->setAuthor($user);

            $entityManager->persist($note);
            $entityManager->flush();

            return $this->json($note);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'error' => "$e"
            ];
            return new JsonResponse($data);
        }
    }
}
