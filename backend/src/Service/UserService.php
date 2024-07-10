<?php

namespace App\Service;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\NoteAccessLogRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService
{
  public function __construct(
    private EntityManagerInterface $entityManagerInterface,
    private NoteAccessLogRepository $noteAccessLogRepository,
    private UserRepository $userRepository,
    private UserPasswordHasherInterface $passwordHasher,
  ) {
  }

  public function getUserById(int $userId): array
  {
    $user = $this->userRepository->find($userId);
    $popularNote = $this->noteAccessLogRepository
      ->sort($user->getNotes()->toArray())['sorted'][0];
    return [
      'id' => $user->getId(),
      'name' => $user->getName(),
      'popularNote' => $popularNote,
    ];
  }
}