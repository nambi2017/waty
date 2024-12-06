import { defineType, defineField } from 'sanity'
import {GROUPS} from '../../../constants'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'object',
  groups: GROUPS,
  fieldsets: [
    {
      name: 'links',
      title: 'Links Section',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'firstLink',
      title: 'First Link',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'secondLink',
      title: 'Second Link',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    defineField({
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Description',
      type: 'string',
    }),
    defineField({
      title : 'About Content',
      name: 'aboutContent',
      type: 'text',
    }),
    defineField({
      title : 'About Sub Content',
      name: 'aboutSubContent',
      type: 'text',
    }),
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
      title: 'First Link Title',
      name: 'firstLinkTitle',
      type: 'string',
      fieldset: 'firstLink',
      validation: Rule => Rule.required()
    }),
    defineField({
      title: 'First Link Description',
      name: 'firstLinkDescription',
      type: 'string',
      fieldset: 'firstLink'
    }),
    // Second Link Fields
    defineField({
      title: 'Second Link Title',
      name: 'secondLinkTitle',
      type: 'string',
      fieldset: 'secondLink',
      validation: Rule => Rule.required()
    }),
    defineField({
      title: 'Second Link Description',
      name: 'secondLinkDescription',
      type: 'string',
      fieldset: 'secondLink'
    }),
    defineField({
      title: 'Stacked Image Content',
      name: 'stackedImageContent',
      type: 'string',
      fieldset: 'links',
    }),
    defineField({
      name: 'stackImages',
      title: 'Stack Images',
      fieldset: 'links',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Enable hotspot for image cropping
          },
          fields: [
            defineField({
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility',
            }),
          ],
        },
      ],
    }),
  ]
})