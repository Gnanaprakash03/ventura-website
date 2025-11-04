import { defineType, defineField } from "sanity"

export const otherSolutionPageType = defineType({
  name: "otherSolutionPageType",
  title: "Other Solution Page",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "name", title: "Industry Name", type: "string" }),
    
    defineField({
      name: "overview",
      title: "Overview Section",
      type: "object",
      fields: [
          { name: "desc", title: "Description", type: "text" },
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
      name: "solutions",
      title: "Solutions",
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
      name: "workflow",
      title: "Workflow",
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
      name: "benefits",
      title: "Benefits",
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


    defineField({ name: "ctatitle", title: "CTA Title", type: "string" }),
    defineField({ name: "ctadesc", title: "CTA Desc", type: "string" }),

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
