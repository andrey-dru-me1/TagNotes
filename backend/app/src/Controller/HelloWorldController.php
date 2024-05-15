<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HelloWorldController extends AbstractController
{

    #[Route('/api/helloworld')]
    public function helloWorld(): Response
    {
        return new Response('<http> Hello World! </http>');
    }
}
