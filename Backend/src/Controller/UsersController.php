<?php

namespace App\Controller;

use App\Entity\Lesson;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api')]
class UsersController extends AbstractController
{
    #[Route('/teachers', name: 'app_api_teachers_index', methods: ['GET'])]
    public function index(UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        return new JsonResponse(
            $serializer->serialize($userRepository->findAllTeachers(), 'json', ['groups' => ['user:read', 'lesson:read']]),
            Response::HTTP_OK, [], true
        );
    }

    #[Route('/students', name: 'app_api_students_show', methods: ['GET'])]
    public function show(UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        return new JsonResponse(
            $serializer->serialize($userRepository->findAllStudents(), 'json', ['groups' => ['user:read', 'lesson:read']]),
            Response::HTTP_OK, [], true
        );
    }
}
