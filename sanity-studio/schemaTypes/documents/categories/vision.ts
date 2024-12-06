import {DocumentIcon} from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export const visionType = defineType({
  name: 'vision',
  title: 'Vision',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'content',
          title: 'Content',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Item Title',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              type: 'text',
              title: 'Item Description'
            },
          defineField({
            name: 'image',
            type: 'image',
            options: {
              hotspot: true
            },
            fields: [
              {
                name: 'alt',
                type: 'string',
                title: 'Alternative text',
                description: 'Incase of image not loaded.'
              }
            ]
          }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description'
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Untitled Simple Item',
                subtitle: subtitle || 'Simple Item',
                media: DocumentIcon
              }
            }
          }
        },
      ]
    }),
  ]
})