import {defineField, defineType} from 'sanity'
import * as FaIcons from 'react-icons/fa'

export const socialMediaPageType = defineType({
  name: 'socialMediaPage',
  title: 'Social Media Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'socialPlatforms',
      title: 'Social Media Platforms',
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
          {name: 'name', type: 'string', title: 'Platform Name'},
          {name: 'handle', type: 'string', title: 'Username/Handle'},
          {name: 'link', type: 'url', title: 'Follow Us Link'},
        ],
      }],
    }),
  ],
})

