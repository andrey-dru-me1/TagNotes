<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240703103956 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE note_access_log DROP CONSTRAINT FK_8FD81C2026ED0855');
        $this->addSql('ALTER TABLE note_access_log ADD CONSTRAINT FK_8FD81C2026ED0855 FOREIGN KEY (note_id) REFERENCES note (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE note_access_log DROP CONSTRAINT fk_8fd81c2026ed0855');
        $this->addSql('ALTER TABLE note_access_log ADD CONSTRAINT fk_8fd81c2026ed0855 FOREIGN KEY (note_id) REFERENCES note (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
