<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AuthController extends AbstractController
{
    #[Route('/api/register', name: 'app_api_register', methods: ['PUT'])]
    public function register(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        if ($request->headers->get('Content-Type') !== 'application/json') {
            return new JsonResponse([
                'error' => 'Invalid Content-Type. Only application/json is allowed.'
            ], Response::HTTP_UNSUPPORTED_MEDIA_TYPE);
        }

        $data = $request->getContent();
        $user = new User();

        $serializer->deserialize($data, User::class, 'json', ['object_to_populate' => $user]);
        $violations = $validator->validate($user);

        if (count($violations) > 0) {

            foreach ($violations as $constraint) {
                $prop = $constraint->getPropertyPath();
                $errors[$prop][] = $constraint->getMessage();
            }

            return new JsonResponse(['errors' => $errors], Response::HTTP_BAD_REQUEST);
        }

        $user->setPassword($passwordHasher->hashPassword($user, $user->getPassword()));
        $em->persist($user);
        $em->flush();

        return new JsonResponse(['success' => true], Response::HTTP_CREATED);
    }
}
