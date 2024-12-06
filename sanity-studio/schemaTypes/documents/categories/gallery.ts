import {DocumentIcon} from '@sanity/icons'
import { defineType, defineField } from 'sanity'
import {GROUPS} from '../../../constants'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  groups: GROUPS,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
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
            defineField({
              name: 'image',
              type: 'image',
              options: {
                hotspot: true
              },
            }),
          ],
          preview: {
            select: {
              image: 'image'
            },
            prepare({ image }) {
              return {
                title: 'Image',
                media: image
              }
            }
          }
        },
      ]
    }),
  ]
})