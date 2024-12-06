import { defineType, defineField } from 'sanity'
import {GROUPS} from '../../../constants'

export const formType = defineType({
  name: 'form',
  title: 'Form',
  type: 'object',
  groups: GROUPS,
  fieldsets: [
  ],
  fields: [
    defineField({
      name: 'nameTitle',
      title: 'Name Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'emailTitle',
        title: 'Email Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'phoneTitle',
        title: 'Phone Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'contactEmail',
        title: 'Contact Email',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'emailContent',
        title: 'Email Message Content For User',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'emailContentForUs',
        title: 'Email Message Content For Us',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
  ]
})