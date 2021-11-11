<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211111100552 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE calendar (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fruit (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fruit_calendar (fruit_id INT NOT NULL, calendar_id INT NOT NULL, INDEX IDX_B1BEFFA4BAC115F0 (fruit_id), INDEX IDX_B1BEFFA4A40A2C8 (calendar_id), PRIMARY KEY(fruit_id, calendar_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vegetable (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vegetable_calendar (vegetable_id INT NOT NULL, calendar_id INT NOT NULL, INDEX IDX_BDEA24C93D33F4D6 (vegetable_id), INDEX IDX_BDEA24C9A40A2C8 (calendar_id), PRIMARY KEY(vegetable_id, calendar_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE fruit_calendar ADD CONSTRAINT FK_B1BEFFA4BAC115F0 FOREIGN KEY (fruit_id) REFERENCES fruit (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE fruit_calendar ADD CONSTRAINT FK_B1BEFFA4A40A2C8 FOREIGN KEY (calendar_id) REFERENCES calendar (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vegetable_calendar ADD CONSTRAINT FK_BDEA24C93D33F4D6 FOREIGN KEY (vegetable_id) REFERENCES vegetable (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vegetable_calendar ADD CONSTRAINT FK_BDEA24C9A40A2C8 FOREIGN KEY (calendar_id) REFERENCES calendar (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fruit_calendar DROP FOREIGN KEY FK_B1BEFFA4A40A2C8');
        $this->addSql('ALTER TABLE vegetable_calendar DROP FOREIGN KEY FK_BDEA24C9A40A2C8');
        $this->addSql('ALTER TABLE fruit_calendar DROP FOREIGN KEY FK_B1BEFFA4BAC115F0');
        $this->addSql('ALTER TABLE vegetable_calendar DROP FOREIGN KEY FK_BDEA24C93D33F4D6');
        $this->addSql('DROP TABLE calendar');
        $this->addSql('DROP TABLE fruit');
        $this->addSql('DROP TABLE fruit_calendar');
        $this->addSql('DROP TABLE vegetable');
        $this->addSql('DROP TABLE vegetable_calendar');
    }
}
