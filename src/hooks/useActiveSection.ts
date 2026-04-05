import { useEffect, useState } from 'react'

const DEFAULT_ID = 'hero'

export function useActiveSection(sectionIds: string[], rootMargin = '-45% 0px -45% 0px'): string {
  const [activeId, setActiveId] = useState(DEFAULT_ID)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { root: null, rootMargin, threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds, rootMargin])

  return activeId
}
