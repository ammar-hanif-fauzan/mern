import { ObjectId } from "mongodb";
import { z } from "zod";

export const userSchema = z.object({
  id: z.instanceof(ObjectId),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const peopleSchema = z.object({
  user_id: z.instanceof(ObjectId),
  IDcard: z.string().optional(),
});

export const phoneSchema = z.object({
  people_id: z.instanceof(ObjectId),
  number: z.string(),
});
