import {defineField, defineType} from 'sanity'
import ReadTimeInput from '../components/ReadTimeInput'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'title', maxLength: 96},
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short Description',
      validation: (Rule) => Rule.required().min(10).max(300),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      description: 'Automatically updates when post is published',
      initialValue: () => {
        const now = new Date()
        return now.toISOString()
      },
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'number',
      readOnly: true,
      initialValue: 1,
      components: {
        input: ReadTimeInput,
      },
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      title: 'Featured?',
      initialValue: false,
    }),
    defineField({
      name: 'visibility',
      type: 'string',
      title: 'Visibility',
      options: {
        list: [
          {title: 'Public', value: 'public'},
          {title: 'Private', value: 'private'},
          {title: 'Unlisted', value: 'unlisted'},
        ],
        layout: 'radio',
      },
      initialValue: 'public',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {name: 'seoTitle', type: 'string', title: 'SEO Title'},
        {name: 'seoDescription', type: 'text', title: 'SEO Description'},
        {name: 'seoImage', type: 'image', title: 'SEO Image'},
      ],
    }),
  ],
})
