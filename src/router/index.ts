import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DetailTVShow from '../views/detail/TVShow.vue'
import DetailMovie from '../views/detail/Movie.vue'
import WatchList from '../views/WatchList.vue'
import Search from '@/views/Search.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/tv/:id',
      name: 'detail-tv',
      component: DetailTVShow
    },
    {
      path: '/detail/movie/:id',
      name: 'detail-movie',
      component: DetailMovie
    },
    {
      path: '/watchlist',
      name: 'watchlist',
      component: WatchList
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})

export default router
