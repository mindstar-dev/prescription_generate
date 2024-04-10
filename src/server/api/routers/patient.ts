import { register } from "module";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

const registerPatientSchema = z.object({
  first_name: z.string({
    required_error: "Describe your basic units name",
  }),
  last_name: z.string({
    required_error: "Describe your basic units name",
  }),
  contact_number: z.number({
    required_error: "Describe your basic units name",
  }),
  email_id: z.string(),
  patient_id: z.string({
    required_error: "Describe your basic units name",
  }),
  gender: z.string({
    required_error: "Describe your basic units name",
  }),
  fathers_name: z.string(),
  husbands_name: z.string(),
  age: z.number({
    required_error: "Describe your basic units name",
  }),
  address_line1: z.string(),
  address_line2: z.string(),
  city: z.string(),
  state: z.string(),
  pin_code: z.number(),
  country: z.string(),
});

export const patientRouter = createTRPCRouter({
  get_all: protectedProcedure.query(async ({ ctx }) => {
    const patients = await ctx.db.patient.findMany();
    await ctx.db.$disconnect();
    return patients;
  }),
  register_patient: protectedProcedure
    .input(registerPatientSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.patient.create({
        data: {
          age: input.age,
          contact_number: input.contact_number,
          first_name: input.first_name,
          gender: input.gender,
          last_name: input.last_name,
          patient_id: input.patient_id,
          address_line1: input.address_line1,
          adress_line2: input.address_line2,
          city: input.city,
          country: input.country,
          email_id: input.email_id,
          fathers_name: input.fathers_name,
          husbands_name: input.husbands_name,
          pin_code: input.pin_code,
          state: input.state,
        },
      });
    }),
});
