<?php

namespace App\Controller;

use App\Entity\Lesson;
use App\Repository\LessonRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/lesson')]
class LessonController extends AbstractController
{
    #[Route('/', name: 'app_api_lesson_index', methods: ['GET'])]
    public function index(LessonRepository $lessonRepository, SerializerInterface $serializer): JsonResponse
    {
        return new JsonResponse(
            $serializer->serialize($lessonRepository->findAll(), 'json', ['groups' => ['user:read', 'lesson:read']]),
            Response::HTTP_OK, [], true
        );
    }

    #[Route('/{id}', name: 'app_api_lesson_show', methods: ['GET'])]
    public function show(Lesson $lesson, SerializerInterface $serializer): JsonResponse
    {
        return new JsonResponse(
            $serializer->serialize($lesson, 'json', ['groups' => ['user:read', 'lesson:read']]),
            Response::HTTP_OK, [], true
        );
    }

    #[Route('/', name: 'app_api_lesson_new', methods: ['POST'])]
    public function new(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $em): JsonResponse
    {
        if ($request->headers->get('Content-Type') !== 'application/json') {
            return new JsonResponse([
                'error' => 'Invalid Content-Type. Only application/json is allowed.'
            ], Response::HTTP_UNSUPPORTED_MEDIA_TYPE);
        }

        $data = $request->getContent();
        $lesson = new Lesson();

        $serializer->deserialize($data, Lesson::class, 'json', ['object_to_populate' => $lesson]);
        $violations = $validator->validate($lesson);
        
        if (count($violations) > 0) {

            foreach ($violations as $constraint) {
                $prop = $constraint->getPropertyPath();
                $errors[$prop][] = $constraint->getMessage();
            }

            return new JsonResponse(['errors' => $errors], Response::HTTP_BAD_REQUEST);
        }

        $em->persist($lesson);
        $em->flush();

        return new JsonResponse(['success' => true], Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_api_lesson_edit', methods: ['PUT'])]
    public function edit(Request $request, Lesson $lesson, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $em): JsonResponse
    {
        if ($request->headers->get('Content-Type') !== 'application/json') {
            return new JsonResponse([
                'error' => 'Invalid Content-Type. Only application/json is allowed.'
            ], Response::HTTP_UNSUPPORTED_MEDIA_TYPE);
        }

        $data = $request->getContent();
        $serializer->deserialize($data, Lesson::class, 'json', ['object_to_populate' => $lesson]);

        $violations = $validator->validate($lesson);
        if (count($violations) > 0) {

            foreach ($violations as $constraint) {
                $prop = $constraint->getPropertyPath();
                $errors[$prop][] = $constraint->getMessage();
            }

            return new JsonResponse(['errors' => $errors], Response::HTTP_BAD_REQUEST);
        }

        $em->flush();
        return new JsonResponse(['success' => true], Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'app_api_lesson_delete', methods: ['DELETE'])]
    public function delete(Request $request, Lesson $lesson, EntityManagerInterface $entityManager): JsonResponse
    {
        if ($request->headers->get('Content-Type') !== 'application/json') {
            return new JsonResponse([
                'error' => 'Invalid Content-Type. Only application/json is allowed.'
            ], Response::HTTP_UNSUPPORTED_MEDIA_TYPE);
        }

        $entityManager->remove($lesson);
        $entityManager->flush();

        return new JsonResponse(['success' => true], Response::HTTP_OK);
    }
}
