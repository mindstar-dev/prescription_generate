import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const noteInputSchema = z.string({
  required_error: "Describe your basic note name",
});

export const noteRouter = createTRPCRouter({
  get_all: protectedProcedure.query(async ({ ctx }) => {
    const notes = await ctx.db.notes.findMany();
    await ctx.db.$disconnect();

    return notes;
  }),
  create: protectedProcedure
    .input(noteInputSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.notes.create({
        data: {
          name: input,
        },
      });
    }),
  delete: protectedProcedure
    .input(noteInputSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.notes.delete({
        where: {
          name: input,
        },
      });
    }),
});
