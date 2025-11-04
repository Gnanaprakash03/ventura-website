import {defineField, defineType} from 'sanity'

export const barcodeScanningPrintingPageType = defineType({
  name: 'barcodeScanningPrintingPage',
  title: 'Barcode Scanning & Printing Page',
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
  ],
})
