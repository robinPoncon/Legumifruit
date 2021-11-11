<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211111103141 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, pseudonyme VARCHAR(255) NOT NULL, first_name VARCHAR(255) DEFAULT NULL, last_name VARCHAR(255) DEFAULT NULL, logo VARCHAR(255) DEFAULT NULL, locale VARCHAR(10) DEFAULT NULL, color_theme VARCHAR(20) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_vegetable (user_id INT NOT NULL, vegetable_id INT NOT NULL, INDEX IDX_DB781913A76ED395 (user_id), INDEX IDX_DB7819133D33F4D6 (vegetable_id), PRIMARY KEY(user_id, vegetable_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_fruit (user_id INT NOT NULL, fruit_id INT NOT NULL, INDEX IDX_42C929CFA76ED395 (user_id), INDEX IDX_42C929CFBAC115F0 (fruit_id), PRIMARY KEY(user_id, fruit_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_vegetable ADD CONSTRAINT FK_DB781913A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_vegetable ADD CONSTRAINT FK_DB7819133D33F4D6 FOREIGN KEY (vegetable_id) REFERENCES vegetable (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_fruit ADD CONSTRAINT FK_42C929CFA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_fruit ADD CONSTRAINT FK_42C929CFBAC115F0 FOREIGN KEY (fruit_id) REFERENCES fruit (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_vegetable DROP FOREIGN KEY FK_DB781913A76ED395');
        $this->addSql('ALTER TABLE user_fruit DROP FOREIGN KEY FK_42C929CFA76ED395');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_vegetable');
        $this->addSql('DROP TABLE user_fruit');
    }
}
