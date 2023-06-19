import { RefObject } from 'react'

export function createTrigger<T = any>(type: string, detail?: T, target_element?: RefObject<any>) {
  if (target_element) {
    target_element.current.dispatchEvent(new CustomEvent(type, { detail: detail }))
  } else {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('alert', { detail: detail }))
    }
  }
}
