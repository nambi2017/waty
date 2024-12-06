import {DocumentIcon} from '@sanity/icons'
import { defineType, defineField } from 'sanity'
import {GROUPS} from '../../../constants'

export const headerType = defineType({
  name: 'header',
  title: 'Header',
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
      name: 'motto',
      title: 'Motto',
      group: 'editorial',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerTitle',
      title: 'Header Title',
      group: 'editorial',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerDescription',
      title: 'Header Description',
      group: 'editorial',
      type: 'text',
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
      type: 'string',
      group: 'editorial',
      fieldset: 'firstLink',
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
      type: 'string',
      group: 'editorial',
      fieldset: 'secondLink',
    })
  ],
})