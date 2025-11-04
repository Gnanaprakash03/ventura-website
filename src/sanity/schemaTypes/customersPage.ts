import {defineField, defineType} from 'sanity'
import * as FaIcons from 'react-icons/fa'

export const customersPageType = defineType({
  name: 'customersPage',
  title: 'Customers Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'customerCards',
      title: 'Customer Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Card Title'},
          {name: 'description', type: 'text', title: 'Card Description'},
          {
            name: 'image',
            title: 'Card Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'icon',
            type: 'string',
            title: 'Card Icon',
            options: {
              list: Object.keys(FaIcons).map(icon => ({title: icon, value: icon}))
            }
          },
          {name: 'link', type: 'string', title: 'Card Link'},
        ],
      }],
    }),
  ],
})
