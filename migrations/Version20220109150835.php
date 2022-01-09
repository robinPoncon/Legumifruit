<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220109150835 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_6EA9A1465E237E06 ON calendar');
        $this->addSql('ALTER TABLE calendar ADD name_fr VARCHAR(50) DEFAULT NULL, CHANGE name name_en VARCHAR(50) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6EA9A1463D773AC4 ON calendar (name_en)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_6EA9A1463D773AC4 ON calendar');
        $this->addSql('ALTER TABLE calendar DROP name_fr, CHANGE name_en name VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6EA9A1465E237E06 ON calendar (name)');
    }
}
