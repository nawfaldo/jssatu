import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const studentRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),

  createStudent: publicProcedure
    .input(z.object({ name: z.string(), city: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.students.create({
        data: { name: input.name, city: input.city },
      });
    }),

  getAllStudents: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.students.findMany();
  }),

  getStudent: publicProcedure
    .input(z.object({ id: z.string().optional() }))
    .query(({ input, ctx }) => {
      if (input.id != undefined) {
        return ctx.prisma.students.findUnique({ where: { id: input.id } });
      }
      return null;
    }),

  updateStudent: publicProcedure
    .input(z.object({ id: z.string(), name: z.string(), city: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.students.update({
        where: { id: input.id },
        data: { name: input.name, city: input.city },
      });
    }),

  deleteStudent: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.students.delete({
        where: { id: input.id },
      });
    }),
});
