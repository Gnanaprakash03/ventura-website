import { defineType, defineField } from "sanity"

export const industryVerticalPage = defineType({
  name: "industryVerticalPage",
  title: "Industry Page",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "name", title: "Industry Name", type: "string" }),
    defineField({ name: "desc", title: "Description", type: "text" }),

    defineField({
      name: "workflow",
      title: "Workflow Image",
      type: "object",
      fields: [
        { name: "src", title: "Image", type: "image", options: { hotspot: true } },
      ],
    }),

    defineField({
      name: "objectives",
      title: "Objectives",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "icon", title: "Icon", type: "string" },
          { name: "title", title: "Title", type: "string" },
          { name: "desc", title: "Description", type: "text" },
        ]
      }]
    }),

    defineField({
      name: "software",
      title: "Software Features",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "text", title: "Description", type: "text" },
      ]}]
    }),

    defineField({
      name: "hardware",
      title: "Hardware Features",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "text", title: "Description", type: "text" },
      ]}]
    }),

    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "text", title: "Description", type: "text" },
      ]}]
    }),

    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [{ type: "string" }]
    }),

    defineField({
      name: "image",
      title: "Main Image",
      type: "object",
      fields: [
        { name: "src", title: "Image", type: "image", options: { hotspot: true } },
        { name: "alt", title: "Alt Text", type: "string" },
      ]
    }),

    defineField({ name: "ctaText", title: "CTA Text", type: "string" }),
    defineField({ name: "ctaLink", title: "CTA Link", type: "string" }),

    defineField({
      name: "related",
      title: "Related Solutions",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "slug", title: "Slug", type: "string" },
        { name: "name", title: "Name", type: "string" },
        { name: "img", title: "Image", type: "image", options: { hotspot: true } },
      ]}]
    }),
  ],
})
