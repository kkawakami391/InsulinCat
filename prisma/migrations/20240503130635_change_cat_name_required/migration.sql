-- CreateTable
CREATE TABLE `cat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `breeds` VARCHAR(255) NULL,
    `age` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `insulin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vaccineLocation` VARCHAR(255) NOT NULL,
    `vaccinedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `chuuruNum` INTEGER NULL,
    `syringeNum` INTEGER NOT NULL DEFAULT 1,
    `catId` INTEGER NOT NULL,

    INDEX `catId`(`catId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `insulin` ADD CONSTRAINT `insulin_ibfk_1` FOREIGN KEY (`catId`) REFERENCES `cat`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
