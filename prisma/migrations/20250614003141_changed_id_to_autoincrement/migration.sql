/*
  Warnings:

  - The primary key for the `Cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Cliente` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Producto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Producto` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ventas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ventas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `clienteId` on the `ventas` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `productoId` on the `ventas` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Producto_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ventas" DROP CONSTRAINT "ventas_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "clienteId" SET DATA TYPE INTEGER,
ALTER COLUMN "productoId" SET DATA TYPE INTEGER,
ADD CONSTRAINT "ventas_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
