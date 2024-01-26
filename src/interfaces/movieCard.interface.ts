export interface MovieCardProps {
  id: number
  poster_path: string
  backdrop_path: string
  title: string
  vote_average: number
  release_date: string
  overview: string
  type: 'tv' | 'movie'
  is_recommended?: boolean
}
