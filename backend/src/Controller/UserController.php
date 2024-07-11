<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class UserController extends AbstractController
{
  public function __construct(private UserService $userService)
  {
  }

  #[Route("/api/user/{id}", name: "get_user", methods: ["GET"])]
  public function getUserById(int $id): JsonResponse
  {
    $userDto = $this->userService->getUserById($id);
    return $this->json($userDto, Response::HTTP_OK);
  }

  #[Route("api/user", name: "get_current_user_id", methods: ["GET"])]
  public function getUserId(#[CurrentUser] ?User $user)
  {
    return $this->json($user->getId());
  }

  #[Route("/api/user/{id}", name: "delete_user", methods: ["DELETE"])]
  public function deleteUser(int $id): JsonResponse
  {
    $this->userService->deleteUser($id);
    return new Response("", Response::HTTP_NO_CONTENT);
  }

  #[Route("/api/users", name: "list_users", methods: ["GET"])]
  public function getUsers(UserRepository $userRepository): JsonResponse
  {
    return $this->json($userRepository->findAll());
  }

  #[Route("/api/signup", name: "signup", methods: ["PUT"])]
  public function signUp(Request $request): JsonResponse
  {
    $data = json_decode($request->getContent(), true);
    $user = $this->userService->createUser($data["name"], $data["password"]);
    return $this->json($user, Response::HTTP_CREATED);
  }
}
