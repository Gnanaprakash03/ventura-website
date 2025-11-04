import {defineField, defineType} from 'sanity'

export const companyInfoType = defineType({
  name: 'companyInfo',
  title: 'Company Information',
  type: 'document',
  fields: [
    defineField({
      name: 'mission',
      type: 'text',
      title: 'Mission',
    }),
    defineField({
      name: 'vision',
      type: 'text',
      title: 'Vision',
    }),
  ],
})

export const historyEventType = defineType({
  name: 'historyEvent',
  title: 'History Event',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      type: 'number',
      title: 'Year',
    }),
    defineField({
      name: 'event',
      type: 'text',
      title: 'Event',
    }),
  ],
})
