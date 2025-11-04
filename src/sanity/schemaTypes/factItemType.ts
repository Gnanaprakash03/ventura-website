// schemaTypes/factItem.ts
import { defineType, defineField } from 'sanity'

export const factItemType = defineType({
  name: 'factItem',
  title: 'Fact Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'points',
      title: 'Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'conclusion',
      title: 'Conclusion',
      type: 'string',
    }),
  ],
})
