<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240521051703 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "user" ADD roles JSON NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER name TYPE VARCHAR(180)');
        $this->addSql('ALTER TABLE "user" RENAME COLUMN password_hash TO password');
        $this->addSql('ALTER INDEX uniq_8d93d6495e237e06 RENAME TO UNIQ_IDENTIFIER_NAME');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "user" DROP roles');
        $this->addSql('ALTER TABLE "user" ALTER name TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE "user" RENAME COLUMN password TO password_hash');
        $this->addSql('ALTER INDEX uniq_identifier_name RENAME TO uniq_8d93d6495e237e06');
    }
}
