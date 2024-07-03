<?php

namespace App\Controller\Admin;

use App\Entity\NoteAccessLog;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class NoteAccessLogCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return NoteAccessLog::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            AssociationField::new('note')->onlyOnIndex(),
            DateTimeField::new('access_date'),
        ];
    }
}
