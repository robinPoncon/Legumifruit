<?php 

namespace App\Controller;

use App\Entity\Vegetable;
use RuntimeException;
use App\Repository\VegetableRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UploadImageVegetableController extends AbstractController
{
    public function __invoke(Request $request, VegetableRepository $vegetableRepo)
    {
        $vegetableId = $request->attributes->get("id");
        $vegetable = $vegetableRepo->find($vegetableId);

        if (!($vegetable instanceof Vegetable)) {
            throw new RuntimeException("Ce n'est pas une entité Légume ou l'id n'existe pas");
        }
        $file = $request->files->get("file");
        if ($file) {
            $vegetable->setFile($file);
        }
        $vegetable->setUpdatedAt(new \DateTime());
        return $vegetable;
    }
}