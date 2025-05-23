import {useFormValue, set} from 'sanity'
import {useEffect, useState} from 'react'
import type {NumberInputProps} from 'sanity'

type BlockText = {
  _type: 'block'
  children: {text: string}[]
}

type ReadTimeInputProps = NumberInputProps

export default function ReadTimeInput(props: ReadTimeInputProps) {
  const body = useFormValue(['body']) as BlockText[] | null
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    if (!body || !Array.isArray(body)) return

    const plainText = body
      .filter((block) => block._type === 'block')
      .map((block) => block.children.map((child) => child.text).join(''))
      .join(' ')

    const wordsPerMinute = 200
    const words = plainText.trim().split(/\s+/).length
    const estimated = Math.ceil(words / wordsPerMinute)

    setValue(estimated)
    
    // Chỉ gọi onChange nếu document không phải là read-only
    try {
      if (props.onChange && props.readOnly !== true) {
        props.onChange(set(estimated))
      }
    } catch (error) {
      console.error('Could not update readTime:', error)
    }
  }, [body])

  return <p>{value} min</p>
}
