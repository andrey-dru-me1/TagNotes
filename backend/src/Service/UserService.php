<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\NoteAccessLogRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService
{
  public function __construct(
    private EntityManagerInterface $entityManager,
    private NoteAccessLogRepository $noteAccessLogRepository,
    private UserRepository $userRepository,
    private UserPasswordHasherInterface $passwordHasher
  ) {
  }

  public function getUserById(int $userId): array
  {
    $user = $this->userRepository->find($userId);
    $popularNote = $this->noteAccessLogRepository->sort(
      $user->getNotes()->toArray()
    )["sorted"][0];
    return [
      "id" => $user->getId(),
      "name" => $user->getName(),
      "popularNote" => $popularNote,
    ];
  }

  public function deleteUser(int $userId): void
  {
    $user = $this->userRepository->find($userId);
    $this->entityManager->remove($user);
    $this->entityManager->flush();
  }

  public function createUser(string $name, string $password): User
  {
    $user = new User();
    $user->setName($name);

    $hashedPassword = $this->passwordHasher->hashPassword($user, $password);
    $user->setPassword($hashedPassword);

    $this->entityManager->persist($user);
    $this->entityManager->flush();

    return $user;
  }
}
