import { defineType, defineField } from 'sanity'

export const benefit = defineType({
  name: 'aboutBenefit',
  title: 'Benefit',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string', // store React icon name like "FaCheckCircle"
      description: 'React icon name, e.g., FaCheckCircle',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
