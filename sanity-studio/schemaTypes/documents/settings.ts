// schemas/item.ts
import { defineType, defineField } from 'sanity'
import {CogIcon, ControlsIcon, DocumentIcon} from '@sanity/icons'
import {GROUPS} from '../../constants'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: GROUPS,
  fieldsets: [
    {
      name: 'footer',
      title: 'Footer',
      options: { collapsible: true, collapsed: false }
    },
  ],
  fields: [
    defineField({
      name: 'identifier',
      title: 'Page Identifier',
      type: 'slug',
      validation: (Rule) => Rule.required().error('A unique identifier is required'),
      options: {
        source: 'title',
        maxLength: 200,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200),
        isUnique: async (slug, context) => {
          const {document, getClient} = context
          const client = getClient({apiVersion: '2024-03-14'})
          const id = document?._id.replace(/^drafts\./, '')
          
          const params = {
            draft: `drafts.${id}`,
            published: id,
            slug: slug
          }
          
          const query = `!defined(*[
            _type == "page" &&
            !(_id in [$draft, $published]) &&
            identifier.current == $slug
          ][0]._id)`
          
          return await client.fetch(query, params)
        }
      }
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string'
    }),
    defineField({
        name: 'logo',
        title: 'Logo',
        type: 'image',
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
      defineField({
        name: 'headerItems',
        title: 'Header Items',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'content',
            title: 'Content',
            fields: [
              {
                name: 'navTitle',
                type: 'string',
                title: 'Nav Item Title',
                validation: Rule => Rule.required()
              },
            ],
            preview: {
              select: {
                title: 'navTitle',
              },
              prepare({title}) {
                return {
                  title: title || 'Header Item',
                  media: ControlsIcon
                }
              }
            }
          },
        ]
      }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      fieldset: 'footer',
      type: 'string'
    }),
    defineField({
        name: 'address',
        title: 'Address',
        fieldset: 'footer',
        type: 'string'
    }),
    defineField({
      name: 'contactUs',
      title: 'Contact Us',
      fieldset: 'footer',
      type: 'string'
    }),
    defineField({
      name: 'contactIcon',
      title: 'Contact Icon',
      type: 'image',
      fieldset: 'footer',
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
    defineField({
      name: 'contactNumber',
      title: 'Contact Number',
      fieldset: 'footer',
      type: 'string'
    }),
    defineField({
        name: 'rightReservedText',
        title: 'Rights Reserved',
        fieldset: 'footer',
        type: 'string'
      }),
    defineField({
        name: 'externalLinks',
        title: 'External Links',
        fieldset: 'footer',
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
              ],
            fields: [
                defineField({
                    name: 'externalLinkImage',
                    title: 'External Link Image',
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
              {
                name: 'externalUrl',
                type: 'url',
                title: 'External URL',
                validation: Rule => Rule.required()
              },
            ],
            preview: {
              select: {
                title: 'title',
                image: 'externalLinkImage'
              },
              prepare({title, image}) {
                return {
                  title: title || 'External URL',
                  media: image || DocumentIcon
                }
              }
            }
          },
        ]
      }),
  ]
})
