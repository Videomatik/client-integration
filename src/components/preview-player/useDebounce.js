import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'

export default function useDebounce(value, delay = 800, options = {}) {
  const [debouncedValue, setValue] = useState(value)
  const debouncedSetValue = useCallback(debounce(setValue, delay, options), [setValue, delay])

  useEffect(
    () => {
      debouncedSetValue(value)
    },
    [value],
  )

  return debouncedValue
}
