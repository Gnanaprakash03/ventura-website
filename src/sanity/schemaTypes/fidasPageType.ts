import {defineField, defineType} from 'sanity'

export const fidasPageType = defineType({
  name: 'fidasPage',
  title: 'FIDAS Page',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'imageUrl',
      type: 'image',
      title: 'Hero Image',
    }),
    defineField({
      name: 'features',
      type: 'array',
      title: 'Features',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Title'},
          {name: 'description', type: 'text', title: 'Description'},
        ],
      }],
    }),
    defineField({
      name: 'benefits',
      type: 'array',
      title: 'Benefits',
      of: [{type: 'string'}],
    }),
  ],
})
