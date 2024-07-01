<?php

namespace App\Controller;

use App\Entity\NoteTag;
use App\Entity\Tag;
use App\Repository\NoteTagRepository;
use App\Repository\TagRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class TagController extends AbstractController
{

    #[Route('/api/tag/{id}/notes', name: 'list_tag_notes', methods: ['GET'])]
    public function listTagNotes(int $id, NoteTagRepository $noteTagRepository): JsonResponse
    {
        $noteTags = $noteTagRepository->findBy(['tag' => $id]);
        $tags = array_map(function (NoteTag $noteTag) {
            return $noteTag->getNote();
        }, $noteTags);
        return $this->json($tags, Response::HTTP_OK);
    }

    #[Route('/api/tags', name: 'list_tags', methods: ['GET'])]
    public function listTags(TagRepository $tagRepository): JsonResponse
    {
        return $this->json($tagRepository->findAll(), Response::HTTP_OK);
    }

    #[Route('/api/tag/{id}', name: 'get_tag', methods: ['GET'])]
    public function getTag(int $id, TagRepository $tagRepository): JsonResponse
    {
        return $this->json($tagRepository->find($id), Response::HTTP_OK);
    }

    #[Route('/api/tag/{id}', name: 'edit_tag', methods: ['POST'])]
    public function editTag(
        int $id,
        Request $request,
        TagRepository $tagRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        try {
            $data = json_decode($request->getContent(), true);

            $tag = $tagRepository->find($id);
            if (null === $tag) {
                return $this->json("Tag with id '$id' not found.", Response::HTTP_NOT_FOUND);
            }

            if (array_key_exists('name', $data)) {
                $tag->setName($data['name']);
            }

            $entityManager->persist($tag);
            $entityManager->flush();

            return $this->json($tag, Response::HTTP_OK);
        } catch (\Exception $e) {
            return $this->json("$e", Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/tag/{id}', name: 'delete_tag', methods: ['DELETE'])]
    public function deleteTag(
        int $id,
        TagRepository $tagRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        try {
            $tag = $tagRepository->find($id);
            if (null === $tag) {
                return $this->json("Tag with id '$id' not found.", Response::HTTP_NOT_FOUND);
            }

            $entityManager->remove($tag);
            $entityManager->flush();

            return $this->json($tag, Response::HTTP_OK);
        } catch (\Exception $e) {
            return $this->json("$e", Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/tag', name: 'create_tag', methods: ['POST'])]
    public function index(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $tag = new Tag();
            $tag->setName($data['name']);

            $entityManager->persist($tag);
            $entityManager->flush();

            return $this->json($tag, Response::HTTP_CREATED);
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'error' => "$e"
            ];
            return new JsonResponse($data);
        }
    }
}
