import {defineField, defineType} from 'sanity'

export const technologyType = defineType({
  name: 'technology',
  title: 'Technology',
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
      name: 'icon',
      type: 'string',
      title: 'Icon',
      description: 'Enter the name of the icon (e.g., FaRobot, FaNetworkWired)',
    }),
  ],
})