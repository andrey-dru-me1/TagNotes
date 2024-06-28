<?php

namespace App\Controller\Admin;

use App\Entity\NoteAccessLog;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class NoteAccessLogCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return NoteAccessLog::class;
    }
}
