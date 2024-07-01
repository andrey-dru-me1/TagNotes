<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240701114726 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE note_access_log DROP CONSTRAINT fk_8fd81c201a543d80');
        $this->addSql('DROP INDEX idx_8fd81c201a543d80');
        $this->addSql('ALTER TABLE note_access_log RENAME COLUMN note_id_id TO note_id');
        $this->addSql('ALTER TABLE note_access_log ADD CONSTRAINT FK_8FD81C2026ED0855 FOREIGN KEY (note_id) REFERENCES note (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8FD81C2026ED0855 ON note_access_log (note_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE note_access_log DROP CONSTRAINT FK_8FD81C2026ED0855');
        $this->addSql('DROP INDEX IDX_8FD81C2026ED0855');
        $this->addSql('ALTER TABLE note_access_log RENAME COLUMN note_id TO note_id_id');
        $this->addSql('ALTER TABLE note_access_log ADD CONSTRAINT fk_8fd81c201a543d80 FOREIGN KEY (note_id_id) REFERENCES note (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_8fd81c201a543d80 ON note_access_log (note_id_id)');
    }
}
