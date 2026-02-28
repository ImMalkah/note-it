ALTER TABLE "public"."notifications" DROP CONSTRAINT IF EXISTS "notifications_type_check";
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_type_check" CHECK (("type" = ANY (ARRAY['mention'::text, 'like'::text, 'save'::text, 'follow'::text])));
ALTER TABLE "public"."notifications" ALTER COLUMN "note_id" DROP NOT NULL;
