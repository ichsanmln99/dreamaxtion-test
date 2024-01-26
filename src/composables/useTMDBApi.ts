import axios from 'axios'
import type {
  MovieDetailsResponse,
  MovieResponse,
  SearchResponse,
  TVShowsResponse,
  TVShowDetailsResponse
} from '../interfaces'

const fetch = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: 'Bearer ' + import.meta.env.VITE_API_READ_ACCESS
  }
})

export default function () {
  function getPopularMovie() {
    return fetch.get<MovieResponse>('/movie/popular')
  }
  function getPopularTVShow() {
    return fetch.get<TVShowsResponse>('/tv/popular')
  }
  function getMovieDetails(movieId: number) {
    return fetch.get<MovieDetailsResponse>('/movie/' + movieId)
  }
  function getTVShowDetails(TVShowId: number) {
    return fetch.get<TVShowDetailsResponse>('/tv/' + TVShowId)
  }
  function search({ type, query, page = 1 }: { type: string; query: string; page: number }) {
    return fetch.get<SearchResponse>('/search/' + type, {
      params: {
        query,
        page
      }
    })
  }

  return {
    getPopularMovie,
    getPopularTVShow,
    getMovieDetails,
    getTVShowDetails,
    search
  }
}
