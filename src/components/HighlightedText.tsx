import React from 'react'

type Props = {
  text: string
  highlight?: string | null
  className?: string
}

/** Renders `text`, wrapping the first occurrence of `highlight` (case-insensitive) in an accent-colored span. */
export const HighlightedText: React.FC<Props> = ({ text, highlight, className }) => {
  if (!highlight) return <>{text}</>

  const index = text.toLowerCase().indexOf(highlight.toLowerCase())
  if (index === -1) return <>{text}</>

  const before = text.slice(0, index)
  const match = text.slice(index, index + highlight.length)
  const after = text.slice(index + highlight.length)

  return (
    <>
      {before}
      <span className={className ?? 'text-accent'}>{match}</span>
      {after}
    </>
  )
}
