import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'howFIDASWorks',
  title: 'How FIDAS Works',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'img',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
          ],
        },
      ],
    }),
  ],
})
