// schemaTypes/factsSection.ts
import { defineType, defineField } from 'sanity'

export const factsSectionType = defineType({
  name: 'factsSection',
  title: 'Facts Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'The main heading/title for the facts section',
    }),
    defineField({
      name: 'Prefix',
      title: 'Prefix Heading',
      type: 'string',
      description: 'The prefix main heading/title for the facts section',
    }),
    defineField({
      name: 'facts',
      title: 'Facts',
      type: 'array',
      of: [{ type: 'factItem' }], // reference the object type
    }),
  ],
})
