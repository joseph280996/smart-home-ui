import { CSSProperties, ReactNode } from 'react'

type NumberInRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface AuthWrapperProps {
  title: string
  style?: CSSProperties
  children: ReactNode
  width: NumberInRange
}
