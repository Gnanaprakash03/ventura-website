import {defineField, defineType} from 'sanity'
import * as FaIcons from 'react-icons/fa'

export const implementationPageType = defineType({
  name: 'implementationPage',
  title: 'Implementation Page',
  type: 'document',
  fields: [
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'steps',
      title: 'Implementation Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'icon',
            type: 'string',
            title: 'Icon',
            options: {
              list: Object.keys(FaIcons).map(icon => ({title: icon, value: icon}))
            }
          },
          {name: 'title', type: 'string', title: 'Title'},
          {name: 'description', type: 'text', title: 'Description'},
        ],
      }],
    }),
  ],
})

