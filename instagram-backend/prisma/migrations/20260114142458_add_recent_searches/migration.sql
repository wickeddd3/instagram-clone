-- CreateTable
CREATE TABLE "recent_searches" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,

    CONSTRAINT "recent_searches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recent_searches_user_id_target_id_key" ON "recent_searches"("user_id", "target_id");

-- AddForeignKey
ALTER TABLE "recent_searches" ADD CONSTRAINT "recent_searches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recent_searches" ADD CONSTRAINT "recent_searches_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
