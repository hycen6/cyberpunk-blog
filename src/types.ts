import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void
export interface IPost {
  path: string
  title: string
  description?: string
  isRecent?: boolean
  date: string
  tags?: string[]
}
