import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const testInputSchema = z.string({
  required_error: "Describe your basic test name",
});

export const testRouter = createTRPCRouter({
  get_all: protectedProcedure.query(async ({ ctx }) => {
    const tests = await ctx.db.tests.findMany();
    await ctx.db.$disconnect();

    return tests;
  }),
  create: protectedProcedure
    .input(testInputSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.tests.create({
        data: {
          name: input,
        },
    });
  }),
  delete: protectedProcedure
    .input(testInputSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.tests.delete({
        where: {
          name: input,
        },
    });
  }),

});
