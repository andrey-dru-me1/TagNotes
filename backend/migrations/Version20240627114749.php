<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240627114749 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE note_access_log_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE note_access_log (id INT NOT NULL, note_id_id INT NOT NULL, access_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8FD81C201A543D80 ON note_access_log (note_id_id)');
        $this->addSql('COMMENT ON COLUMN note_access_log.access_date IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE note_access_log ADD CONSTRAINT FK_8FD81C201A543D80 FOREIGN KEY (note_id_id) REFERENCES note (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE note_access_log_id_seq CASCADE');
        $this->addSql('ALTER TABLE note_access_log DROP CONSTRAINT FK_8FD81C201A543D80');
        $this->addSql('DROP TABLE note_access_log');
    }
}
