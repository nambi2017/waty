import {DocumentIcon} from '@sanity/icons'
import { defineType, defineField } from 'sanity'
import {GROUPS} from '../../constants'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'object',
  icon: DocumentIcon,
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
      name: 'identifier',
      title: 'Page Identifier',
      type: 'slug',
      group: 'editorial',
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
      name: 'title',
      group: 'editorial',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      group: 'editorial',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'editorial',
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
    // Toggle for Item Array
    defineField({
      name: 'showItems',
      title: 'Display Items Section',
      type: 'boolean',
      group: 'editorial',
      initialValue: false,
    }),
    // Conditional Array Field with Two Types
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      group: 'editorial',
      hidden: ({document}) => !document?.showItems,
      of: [
        {
          type: 'object',
          name: 'simpleItem',
          title: 'Simple Item',
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
            {
              name: 'type',
              type: 'string',
              initialValue: 'simple',
              readOnly: true,
              hidden: true
            }
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
        {
          type: 'object',
          name: 'detailedItem',
          title: 'Detailed Item',
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
            {
              name: 'image',
              type: 'image',
              title: 'Item Image',
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
            },
            {
              name: 'link',
              type: 'url',
              title: 'Item Link'
            },
            {
              name: 'type',
              type: 'string',
              initialValue: 'detailed',
              readOnly: true,
              hidden: true
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image'
            },
            prepare({title, subtitle, media}) {
              return {
                title: title || 'Untitled Detailed Item',
                subtitle: subtitle || 'Detailed Item',
                media: media || DocumentIcon
              }
            }
          }
        }
      ]
    }),
    // First Link Fields
    defineField({
      title: 'First Link Title',
      name: 'firstLinkTitle',
      type: 'string',
      group: 'editorial',
      fieldset: 'firstLink',
      validation: Rule => Rule.required()
    }),
    defineField({
      title: 'First Link Description',
      name: 'firstLinkDescription',
      type: 'string',
      group: 'editorial',
      fieldset: 'firstLink'
    }),
    defineField({
      title: 'First Link URL',
      name: 'firstLinkUrl',
      type: 'url',
      group: 'editorial',
      fieldset: 'firstLink',
      validation: Rule => Rule.required()
    }),
    // Second Link Fields
    defineField({
      title: 'Second Link Title',
      name: 'secondLinkTitle',
      type: 'string',
      group: 'editorial',
      fieldset: 'secondLink',
      validation: Rule => Rule.required()
    }),
    defineField({
      title: 'Second Link Description',
      name: 'secondLinkDescription',
      type: 'string',
      group: 'editorial',
      fieldset: 'secondLink'
    }),
    defineField({
      title: 'Second Link URL',
      name: 'secondLinkUrl',
      type: 'url',
      group: 'editorial',
      fieldset: 'secondLink',
      validation: Rule => Rule.required()
    })
  ],
})