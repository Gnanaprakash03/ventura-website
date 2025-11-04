import { defineType, defineField } from "sanity";

export const solutionItem = defineType({
  name: "solutionItem",
  title: "Solution Item",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "desc", title: "Description", type: "text" }),
     defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // allows cropping & focal points
      },
      description: "Upload a representative image for this solution.",
    }),
    defineField({ name: "href", title: "Page Link", type: "string" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Fabric", value: "Fabric" },
          { title: "Process", value: "Process" },
        ],
      },
    }),
  ],
});
