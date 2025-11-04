import {defineField, defineType} from 'sanity'
import * as FaIcons from 'react-icons/fa'

export const sapIntegrationPageType = defineType({
  name: 'sapIntegrationPage',
  title: 'SAP Integration Page',
  type: 'document',
  fields: [
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'reasonsTitle',
      title: 'Reasons Title',
      type: 'string',
    }),
    defineField({
      name: 'reasons',
      title: 'Reasons to Choose FIDAS',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'integrationOptions',
      title: 'Integration Options',
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
          {name: 'name', type: 'string', title: 'Name'},
          {name: 'description', type: 'string', title: 'Description'},
        ],
      }],
    }),
    defineField({
      name: 'futureIntegration',
      title: 'Future-Ready Integration',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})

