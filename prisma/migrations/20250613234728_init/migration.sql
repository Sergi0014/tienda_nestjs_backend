-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ventas" (
    "id" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "clienteId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producto_nombre_key" ON "Producto"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- AddForeignKey
ALTER TABLE "ventas" ALTER COLUMN "clienteId" TYPE BIGINT USING "clienteId"::BIGINT;


-- AddForeignKey
ALTER TABLE "ventas" ALTER COLUMN "productoId" TYPE BIGINT USING "productoId"::BIGINT;
