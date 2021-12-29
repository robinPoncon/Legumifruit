<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211229101826 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6EA9A1465E237E06 ON calendar (name)');
        $this->addSql('ALTER TABLE fruit ADD name_fr VARCHAR(50) DEFAULT NULL, ADD description_fr LONGTEXT DEFAULT NULL, CHANGE name name_en VARCHAR(50) NOT NULL, CHANGE description description_en LONGTEXT DEFAULT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A00BD2973D773AC4 ON fruit (name_en)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D6491FE3BDAF ON user (pseudonyme)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_DB9894F75E237E06 ON vegetable (name)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_6EA9A1465E237E06 ON calendar');
        $this->addSql('DROP INDEX UNIQ_A00BD2973D773AC4 ON fruit');
        $this->addSql('ALTER TABLE fruit ADD description LONGTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, DROP description_en, DROP name_fr, DROP description_fr, CHANGE name_en name VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('DROP INDEX UNIQ_8D93D6491FE3BDAF ON user');
        $this->addSql('DROP INDEX UNIQ_DB9894F75E237E06 ON vegetable');
    }
}
