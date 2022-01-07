<?php 

namespace App\Controller;

use App\Entity\Fruit;
use RuntimeException;
use App\Repository\FruitRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UploadImageController extends AbstractController
{
    public function __invoke(Request $request, FruitRepository $fruitRepo)
    {
        $fruitId = $request->attributes->get("id");
        $fruit = $fruitRepo->find($fruitId);

        if (!($fruit instanceof Fruit)) {
            throw new RuntimeException("Ce n'est pas une entité Fruit ou l'id n'existe pas");
        }
        $file = $request->files->get("file");
        if ($file) {
            $fruit->setFile($file);
        }
        $fruit->setUpdatedAt(new \DateTime());
        return $fruit;
    }
}