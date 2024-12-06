import {DocumentIcon, UserIcon} from '@sanity/icons'
import { defineType, defineField } from 'sanity'
import {GROUPS} from '../../../constants'

export const testimonialsType = defineType({
  name: 'testimonials',
  title: 'Testimonials',
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
          fieldsets: [
            {
              name: 'profile',
              title: 'Profile',
              options: { collapsible: true, collapsed: false }
            },
          ],
          fields: [
            defineField({
              name: 'reviewer',
              title: 'Reviewer',
              fieldset: 'profile',
              type: 'string'
            }),
            defineField({
              name: 'reviewerRole',
              title: 'Reviewer Role',
              fieldset: 'profile',
              type: 'string'
            }),
            defineField({
              name: 'reviewerImage',
              title: 'Reviewer image',
              type: 'image',
              fieldset: 'profile',
              options: {
                hotspot: true
              },
              fields: [
                defineField({
                  name: 'alternateImage',
                  title: 'Alternate image',
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
                })
              ]
            }),
            {
              name: 'review',
              title: 'Review',
              type: 'text',
            },
          ],
          preview: {
            select: {
              title: 'reviewer',
              subtitle: 'reviewerRole'
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Unknown User',
                subtitle: subtitle || '',
                media: UserIcon
              }
            }
          }
        },
      ]
    }),
  ]
})