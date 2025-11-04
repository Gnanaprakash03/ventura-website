import {defineField, defineType} from 'sanity'

export const hardwareProductsPageType = defineType({
  name: 'hardwareProductsPage',
  title: 'Hardware Products Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'products',
      title: 'Hardware Products',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', type: 'string', title: 'Product Name'},
          {
            name: 'image',
            title: 'Product Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
      }],
    }),
  ],
})
