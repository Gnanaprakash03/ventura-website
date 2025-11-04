import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const customerListType = defineType({
  name: 'customerList',
  title: 'Customer List',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Customer Name',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Customer Logo',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
