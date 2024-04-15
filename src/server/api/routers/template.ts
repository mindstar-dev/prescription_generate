import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { it } from "node:test";

const templateInputSchema = z.object({
  template_id: z.string({
    required_error: "Describe your basic units name",
  }),
  description: z.string(),
  template_data: z.array(
    z.object({
      id: z.string({
        required_error: "Describe your basic units name",
      }),
      medicine: z.string({
        required_error: "Describe your basic units name",
      }),
      repeatitions: z.string({
        required_error: "Describe your basic units name",
      }),
    }),
  ),
});

export const templateRouter = createTRPCRouter({
  get_all: protectedProcedure.query(async ({ ctx }) => {
    const template = await ctx.db.template.findMany();
    await ctx.db.$disconnect();
    return template;
  }),
  get_all_data: protectedProcedure.query(async ({ ctx }) => {
    const templateData = await ctx.db.templateData.findMany();
    await ctx.db.$disconnect();
    return templateData;
  }),
  create_template: protectedProcedure
    .input(templateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const arr = [];
      const template = ctx.db.template.upsert({
        where: {
          template_id: input.template_id,
        },
        update: {
          template_id: input.template_id,
          description: input.description,
        },
        create: {
          template_id: input.template_id,
          description: input.description,
        },
      });
      arr.push(template);
      input.template_data.forEach((item) => {
        const temp = ctx.db.templateData.upsert({
          where: {
            template_id: input.template_id,
            doseage: item.repeatitions,
            medicine: item.medicine,
            template_id_medicine: {
              medicine: item.medicine,
              template_id: input.template_id,
            },
          },
          create: {
            template_id: input.template_id,
            medicine: item.medicine,
            doseage: item.repeatitions,
          },
          update: {
            template_id: input.template_id,
            medicine: item.medicine,
            doseage: item.repeatitions,
          },
        });
        arr.push(temp);
      });
      return await ctx.db.$transaction(arr);
    }),
});
