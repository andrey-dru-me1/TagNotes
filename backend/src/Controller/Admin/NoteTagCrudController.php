<?php

namespace App\Controller\Admin;

use App\Entity\NoteTag;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;

class NoteTagCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return NoteTag::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            AssociationField::new('note')->onlyOnIndex(),
            AssociationField::new('tag')->onlyOnIndex(),
        ];
    }
}
