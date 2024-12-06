import {DocumentIcon, icons} from '@sanity/icons'
import { defineType, defineField } from 'sanity'
import {GROUPS} from '../../../constants'

export const eventsType = defineType({
  name: 'events',
  title: 'Events',
  type: 'object',
  groups: GROUPS,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
          fieldsets: [
            {
              name: 'firstLink',
              title: 'First Link',
              options: { collapsible: true, collapsed: false }
            },
            {
              name: 'courseDate',
              title: 'Course Date',
              options: { collapsible: true, collapsed: false }
            },
            {
              name: 'coursePeriod',
              title: 'Course Period',
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
            title: 'Enroll now URL',
            name: 'enrollNowUrl',
            type: 'string',
            fieldset: 'firstLink',
          }),
          defineField({
            title: 'Course Date Title',
            name: 'courseDateTitle',
            type: 'string',
            fieldset: 'courseDate',
            validation: Rule => Rule.required()
          }),
          defineField({
            title: 'Course Date',
            name: 'courseDate',
            type: 'string',
            fieldset: 'courseDate'
          }),
          defineField({
            title: 'Course Period Title',
            name: 'coursePeriodTitle',
            type: 'string',
            fieldset: 'coursePeriod',
            validation: Rule => Rule.required()
          }),
          defineField({
            title: 'Course Period',
            name: 'coursePeriod',
            type: 'string',
            fieldset: 'coursePeriod'
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
          ],
          preview: {
            select: {
              title: 'courseTitle',
              image: 'image',
            },
            prepare({title, image}) {
              return {
                title: title || 'Course',
                media: image
              }
            }
          }
        },
      ]
    }),
  ]
})