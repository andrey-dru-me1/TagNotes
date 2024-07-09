<?php

namespace App\Controller\Admin;

use App\Entity\Tag;
use App\Entity\Note;
use App\Entity\User;
use App\Entity\NoteTag;
use App\Entity\RefreshToken;
use App\Entity\NoteAccessLog;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;

class DashboardController extends AbstractDashboardController
{
    #[Route('/api/admin', name: 'admin')]
    public function index(): Response
    {
        $routeBuilder = $this->container->get(AdminUrlGenerator::class);
        $url = $routeBuilder->setController(UserCrudController::class)->generateUrl();

        return $this->redirect($url);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('TagNotes');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToCrud('Users', 'fas fa-map-marker-alt', User::class);
        yield MenuItem::linkToCrud('Notes', 'fas fa-map-marker-alt', Note::class);
        yield MenuItem::linkToCrud('Tags', 'fas fa-map-marker-alt', Tag::class);
        yield MenuItem::linkToCrud('NoteTags', 'fas fa-map-marker-alt', NoteTag::class);
        yield MenuItem::linkToCrud('RefreshTokens', 'fas fa-map-marker-alt', RefreshToken::class);
        yield MenuItem::linkToCrud('NoteAccessLogs', 'fas fa-map-marker-alt', NoteAccessLog::class);
    }
}
