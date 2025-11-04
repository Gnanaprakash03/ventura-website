import { defineType, defineField, defineArrayMember } from 'sanity'


export const about = defineType({
  name: 'aboutsection',
  title: 'About Section',
  type: 'document',
  fields: [
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
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility and SEO',
            }),
          ],
          options: { hotspot: true },
        }),
      ],
      description: 'Add one or more images. Each image can be edited individually.',
    }),
    defineField({
      name: 'Benefit',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'aboutBenefit' }], // nested benefits
    }),
  ],
})
