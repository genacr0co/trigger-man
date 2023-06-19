import { RefObject, useEffect } from 'react'

export const useTrigger = <T = any,>(
  type: string,
  listener: (event: CustomEvent<T>) => void,
  options?: boolean | AddEventListenerOptions | undefined,
  element?: RefObject<any>,
) => {
  useEffect(() => {
    const target = element?.current || window
    target.addEventListener(type, listener, options)

    return () => {
      target.removeEventListener(type, listener, options)
    }
  }, [type, listener, options, element])
}
