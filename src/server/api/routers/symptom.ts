import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const symmptomInputSchema = z.string({
  required_error: "Describe your basic units name",
});

export const symptomRouter = createTRPCRouter({
  get_all: protectedProcedure.query(async ({ ctx }) => {
    const symptoms = await ctx.db.symptom.findMany();
    return symptoms;
    await ctx.db.$disconnect();
  }),
  create: protectedProcedure
    .input(symmptomInputSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.symptom.create({
        data: {
          name: input,
        },
      });
    }),
});
