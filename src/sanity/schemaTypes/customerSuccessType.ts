import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const customerSuccessType = defineType({
  name: 'customerSuccess',
  title: 'Customer Success',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Customer Name',
    }),
    defineField({
      name: 'position',
      type: 'string',
      title: 'Position',
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company',
    }),
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Customer Image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      media: 'image',
    },
  },
})

