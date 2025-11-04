import {defineField, defineType} from 'sanity'

export const downloadsPageType = defineType({
  name: 'downloadsPage',
  title: 'Downloads Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'downloads',
      title: 'Downloads',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', type: 'string', title: 'Download Name'},
          {
            name: 'file',
            title: 'File',
            type: 'file',
            options: {
              accept: '.pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif'
            }
          },
        ],
      }],
    }),
  ],
})