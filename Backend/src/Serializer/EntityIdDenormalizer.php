<?php

namespace App\Serializer;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class EntityIdDenormalizer implements DenormalizerInterface
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function supportsDenormalization($data, $type, $format = null, array $context = []): bool
    {
        return class_exists($type) && is_numeric($data);
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            'object' => null,
            '*' => false,
            User::class => false
        ];
    }

    public function denormalize($data, $type, $format = null, array $context = []): mixed
    {
        return $this->entityManager->getRepository($type)->find($data);
    }
}