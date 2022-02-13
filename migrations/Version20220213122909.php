<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220213122909 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_DB9894F75E237E06 ON vegetable');
        $this->addSql('ALTER TABLE vegetable ADD name_en VARCHAR(50) DEFAULT NULL, ADD description_fr LONGTEXT DEFAULT NULL, ADD updated_at DATETIME DEFAULT NULL, ADD file_path VARCHAR(255) DEFAULT NULL, CHANGE description description_en LONGTEXT DEFAULT NULL, CHANGE name name_fr VARCHAR(50) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_DB9894F725B3548 ON vegetable (name_fr)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_DB9894F725B3548 ON vegetable');
        $this->addSql('ALTER TABLE vegetable ADD description LONGTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, DROP name_en, DROP description_en, DROP description_fr, DROP updated_at, DROP file_path, CHANGE name_fr name VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_DB9894F75E237E06 ON vegetable (name)');
    }
}
