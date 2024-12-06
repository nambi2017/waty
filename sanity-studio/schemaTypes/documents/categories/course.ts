import {DocumentIcon, FolderIcon} from '@sanity/icons'
import { defineType, defineField } from 'sanity'
import {GROUPS} from '../../../constants'

export const courseType = defineType({
  name: 'course',
  title: 'Course',
  type: 'object',
  groups: GROUPS,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'subTitle',
      title: 'Subtitle',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
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
            name: 'courseCategory',
            title: 'Course Category',
            type: 'string'
          }),
          defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [
              {
                type: 'object',
                name: 'nestedContent',
                title: 'Nested Content',
                fieldsets: [
                  {
                    name: 'firstLink',
                    title: 'First Link',
                    options: { collapsible: true, collapsed: false }
                  },
                ],
                fields: [
                  {
                    name: 'courseTitle',
                    title: 'Course Title',
                    type: 'string',
                    validation: Rule => Rule.required()
                  },
                  {
                    name: 'courseDescription',
                    title: 'Course Description',
                    type: 'text',
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
                // First Link Fields
                defineField({
                  title: 'Enroll now Action',
                  name: 'enrollNowAction',
                  type: 'string',
                  fieldset: 'firstLink',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  title: 'Enroll now Description',
                  name: 'enrollNowDescription',
                  type: 'string',
                  fieldset: 'firstLink'
                }),
                defineField({
                  title: 'Course Duration',
                  name: 'courseDuration',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  title: 'Tag',
                  name: 'tag',
                  type: 'string',
                }),
                defineField({
                  title: 'Price',
                  name: 'price',
                  type: 'string',
                }),
                defineField({
                  title: 'Discounted Price',
                  name: 'discountedPrice',
                  type: 'string',
                }),
              defineField({
                title: 'Course Date',
                name: 'courseDate',
                type: 'string',
              }),
                defineField({
                  title: 'Enroll now URL',
                  name: 'enrollNowUrl',
                  type: 'string',
                  fieldset: 'firstLink',
                }),
              ],
                preview: {
                  select: {
                    title: 'courseTitle',
                    image: 'image'
                  },
                  prepare({title, image}) {
                    return {
                      title: title || 'Course Title',
                      media: image || FolderIcon
                    }
                  }
                }
              },
            ]
          }),
        ],
          preview: {
            select: {
              title: 'courseCategory',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Course Category',
                media: DocumentIcon
              }
            }
          }
        },
      ]
    }),
  ]
})