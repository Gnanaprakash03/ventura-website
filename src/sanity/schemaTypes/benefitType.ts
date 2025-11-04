import {defineField, defineType} from 'sanity'
import * as FaIcons from 'react-icons/fa'

const iconOptions = Object.keys(FaIcons).map(iconName => ({
  title: iconName,
  value: iconName
}))

export const benefitType = defineType({
  name: 'benefit',
  title: 'Benefit',
  type: 'document',
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon',
      description: 'Select an icon',
      options: {
        list: iconOptions
      }
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
  ],
})
