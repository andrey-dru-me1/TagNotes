<?php

namespace App\Controller;

use App\Entity\Note;
use App\Repository\NoteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class NoteController extends AbstractController
{

    #[Route('/api/notes', name: 'list_notes', methods: ['GET'])]
    public function listNotes(NoteRepository $noteRepository): JsonResponse
    {
        return $this->json($noteRepository->findAll(), Response::HTTP_OK);
    }

    #[Route('/api/note/{id}', name: 'get_note', methods: ['GET'])]
    public function getNote(int $id, NoteRepository $noteRepository): JsonResponse
    {
        return $this->json($noteRepository->find($id), Response::HTTP_OK);
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
    public function index(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $note = new Note();
            $note->setTitle($data['title']);
            $note->setContent($data['content']);

            $entityManager->persist($note);
            $entityManager->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Note created'
            ];
            return new JsonResponse($data);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'error' => "$e"
            ];
            return new JsonResponse($data);
        }
    }
}
