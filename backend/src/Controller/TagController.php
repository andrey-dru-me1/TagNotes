<?php

namespace App\Controller;

use App\Service\TagService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class TagController extends AbstractController
{
  public function __construct(private TagService $tagService)
  {
  }

  #[Route("/api/tag/{id}/notes", name: "list_tag_notes", methods: ["GET"])]
  public function listTagNotes(int $id): JsonResponse
  {
    $notes = $this->tagService->listTagNotes($id);
    return $this->json($notes, Response::HTTP_OK);
  }

  #[Route("/api/tags", name: "list_tags", methods: ["GET"])]
  public function listTags(): JsonResponse
  {
    $tags = $this->tagService->listTags();
    return $this->json($tags, Response::HTTP_OK);
  }

  #[Route("/api/tag/{id}", name: "get_tag", methods: ["GET"])]
  public function getTag(int $id): JsonResponse
  {
    $tag = $this->tagService->getTag($id);
    return $this->json($tag, Response::HTTP_OK);
  }

  #[Route("/api/tag/{id}", name: "edit_tag", methods: ["POST"])]
  public function editTag(int $id, Request $request): JsonResponse
  {
    $data = json_decode($request);
    $tag = $this->tagService->editTag($id, $data["name"]);
    return $this->json($tag);
  }

  #[Route("/api/tag/{id}", name: "delete_tag", methods: ["DELETE"])]
  public function deleteTag(int $id): JsonResponse
  {
    $this->tagService->deleteTag($id);
    return new Response("", Response::HTTP_NO_CONTENT);
  }

  #[Route("/api/tag", name: "create_tag", methods: ["POST"])]
  public function createTag(Request $request): JsonResponse
  {
    $data = json_decode($request);
    $tag = $this->tagService->createTag($data["name"]);
    return $this->json($tag, Response::HTTP_CREATED);
  }
}
