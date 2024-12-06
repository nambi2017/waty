// schemas/item.ts
import { defineType, defineField } from 'sanity'
import {ActivityIcon, AddDocumentIcon, BookIcon, EnvelopeIcon, ImagesIcon, MenuIcon, ProjectsIcon, SchemaIcon, SparklesIcon, TiersIcon} from '@sanity/icons'
import {GROUPS} from '../../constants'

export const watYLearn = defineType({
  name: 'watYLearn',
  title: "Wat'Y Learn",
  type: 'document',
  icon: ProjectsIcon,
  groups: GROUPS,
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
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        { type: 'page' , icon: SchemaIcon},
        { type: 'header', icon: SparklesIcon },
        { type: 'about' , icon: MenuIcon},
        { type: 'vision' , icon: BookIcon},
        { type: 'events' , icon: ActivityIcon},
        { type: 'course' , icon: TiersIcon},
        { type: 'testimonials' , icon: EnvelopeIcon},
        { type: 'gallery' , icon: ImagesIcon},
        { type: 'form' , icon: AddDocumentIcon},
      ]
    })
  ]
})
