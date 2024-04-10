import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const medicineInputSchema = z.string({
  required_error: "Describe your basic units name",
});

export const medicineRouter = createTRPCRouter({
  get_all: protectedProcedure.query(async ({ ctx }) => {
    const medicines = await ctx.db.medicine.findMany();
    return medicines;
  }),
  create: protectedProcedure
    .input(medicineInputSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.medicine.create({
        data: {
          name: input,
        },
      });
    }),
});
