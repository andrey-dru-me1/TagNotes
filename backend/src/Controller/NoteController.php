<?php

namespace App\Controller;

use App\Service\NoteService;
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

    public function __construct(
        private NoteService $noteService,
    ) {
    }

    #[Route('/api/notes/filter', name: 'filter', methods: ['POST'])]
    public function filterNotes(
        Request $request,
        #[CurrentUser] ?User $user
    ) {
        $tagIds = json_decode($request->getContent(), true);
        $userNotes = $this->noteService->filterNotes($tagIds, $user);
        return $this->json($userNotes);
    }

    #[Route('/api/note/{noteId}/tag/{tagId}', name: 'remove_tag', methods: ['DELETE'])]
    public function removeTag(
        int $noteId,
        int $tagId,
    ): Response {
        $this->noteService->unpinTag($noteId, $tagId);
        return new Response('', Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/note/{noteId}/tag/{tagId}', name: 'append_tag', methods: ['POST'])]
    public function appendTag(
        int $noteId,
        int $tagId,
    ): Response {
        $this->noteService->pinTag($noteId, $tagId);
        return new Response('', Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/note/{id}/tags', name: 'list_note_tags', methods: ['GET'])]
    public function listTags(int $id): JsonResponse
    {
        $tags = $this->noteService->listNoteTags($id);
        return $this->json($tags, Response::HTTP_OK);
    }

    #[Route('/api/notes', name: 'list_notes', methods: ['GET'])]
    public function listNotes(#[CurrentUser] ?User $user): JsonResponse
    {
        try {
            $notes = $this->noteService->listNotes($user);
            return $this->json($notes, Response::HTTP_OK);
        } catch (\Exception $e) {
            return $this->json($e, Response::HTTP_METHOD_NOT_ALLOWED);
        }
    }

    #[Route('/api/note/{id}', name: 'get_note', methods: ['GET'])]
    public function getNote(int $id): JsonResponse
    {
        $note = $this->noteService->accessNote($id);
        return $this->json($note, Response::HTTP_OK);
    }

    #[Route('/api/note/{id}', name: 'delete_note', methods: ['DELETE'])]
    public function deleteNote(int $id): Response
    {
        $this->noteService->deleteNote($id);
        return new Response('', Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/note/{id}', name: 'edit_note', methods: ['POST'])]
    public function editNote(
        int $id,
        Request $request,
    ): JsonResponse {
        $data = json_decode($request);
        $note = $this->noteService->editNote($id, $data['title'], $data['content']);
        return $this->json($note, Response::HTTP_OK);
    }

    #[Route('/api/note', name: 'create_note', methods: ['POST'])]
    public function createNote(
        Request $request,
        #[CurrentUser] ?User $user
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $note = $this->noteService->createNote($data, $user);
        return $this->json($note);
    }
}
