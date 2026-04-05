import { useSyncExternalStore } from 'react'

function subscribeFinePointer(cb: () => void): () => void {
  const mq = window.matchMedia('(pointer: fine)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

function getFinePointerSnapshot(): boolean {
  return window.matchMedia('(pointer: fine)').matches
}

function getFinePointerServerSnapshot(): boolean {
  return false
}

/** True when the primary input is precise (e.g. mouse). False for touch-first. */
export function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  )
}
