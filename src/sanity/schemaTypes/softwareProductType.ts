import {defineField, defineType} from 'sanity'

export const softwareProductType = defineType({
  name: 'softwareProduct',
  title: 'Software Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'features',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Features',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
    }),
  ],
})