import { defineField, defineType } from 'sanity'

export const statisticsSection = defineType({
  name: 'statisticsSection',
  title: 'Statistics Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'topStat',
      title: 'Top Statistic',
      type: 'object',
      fields: [
        { name: 'value', type: 'string', title: 'Value' },
        { name: 'label', type: 'string', title: 'Label' },
      ],
    }),
    defineField({
      name: 'middleStats',
      title: 'Middle Row Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'label', type: 'string', title: 'Label' },
          ],
        },
      ],
      validation: (Rule) => Rule.length(2),
    }),
    defineField({
      name: 'bottomStats',
      title: 'Bottom Row Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value1', type: 'string', title: 'Value' },
            { name: 'value2', type: 'string', title: 'Value (optional)' },
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'suffix', type: 'string', title: 'Suffix (optional)' },
          ],
        },
      ],
      validation: (Rule) => Rule.length(3),
    }),
    defineField({
      name: 'expertise',
      title: 'Years of Expertise',
      type: 'object',
      fields: [
        { name: 'value', type: 'string', title: 'Value' },
        { name: 'label', type: 'string', title: 'Label' },
      ],
    }),
  ],
})
