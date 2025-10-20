export interface IGameCard {
  name: string
  image: string
  platforms: ('pc' | 'mobile')[]
  description?: string
  link: string
  state: 'playing' | 'quit'
  uid?: string
}
