import {defineField, defineType} from 'sanity'

export const fabricLengthCounterPageType = defineType({
  name: 'fabricLengthCounterPage',
  title: 'Fabric Length Counter Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'howItWorksSteps',
      title: 'How It Works Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Step Title'},
          {name: 'description', type: 'text', title: 'Step Description'},
        ],
      }],
    }),
    defineField({
      name: 'benefitsCards',
      title: 'Benefits Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Benefit Title'},
          {name: 'description', type: 'text', title: 'Benefit Description'},
        ],
      }],
    }),
  ],
})
