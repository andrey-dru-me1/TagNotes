<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/api/user/{id}', name: 'get_user', methods: ['GET'])]
    public function getUserById(int $id, UserRepository $userRepository): JsonResponse
    {
        return $this->json($userRepository->find($id));
    }

    #[Route('/api/user/{id}', name: 'delete_user', methods: ['DELETE'])]
    public function deleteUser(int $id, UserRepository $userRepository, EntityManagerInterface $em): JsonResponse
    {
        $user = $userRepository->find($id);
        $em->remove($user);
        $em->flush();

        $data = [
            'status' => Response::HTTP_OK,
            'success' => 'User is successfully deleted',
        ];
        return new JsonResponse($data, $data['status']);
    }

    #[Route('/api/users', name: 'list_users', methods: ['GET'])]
    public function getUsers(UserRepository $userRepository): JsonResponse
    {
        return $this->json($userRepository->findAll());
    }

    #[Route('/api/signup', name: 'signup', methods: ['POST'])]
    public function signUp(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        try {
            $data = json_decode($request->getContent(), true);
            $request->request->replace($data);

            $user = new User();
            $user->setName($request->get('name'));

            $plaintextPassword = $request->get('password');
            $hashedPassword = $passwordHasher->hashPassword($user, $plaintextPassword);
            $user->setPassword($hashedPassword);

            $entityManager->persist($user);
            $entityManager->flush();

            $data = [
                'status' => 200,
                'success' => "User added successfully",
            ];
            return new JsonResponse($data);
        } catch (\Exception $e) {
            $data = [
                'status' => 422,
                'errors' => "$e",
            ];
            return new JsonResponse($data, 422);
        }
    }
}
