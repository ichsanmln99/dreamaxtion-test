<template>
  <div class="-mt-20">
    <Swiper>
      <swiper-slide v-for="movie in popularMovies" :key="movie.id">
        <div
          class="carousel-image"
          v-bind:style="{
            backgroundImage: `url(${image.get({ size: 'original', url: movie.backdrop_path })})`
          }"
        >
          <div class="carousel-content main-container flex flex-col-reverse md:flex-row gap-8">
            <div class="flex-1">
              <div class="lg:w-6/12 w-full">
                <RouterLink :to="'/detail/movie/' + movie.id"
                  ><h2 class="text-4xl md:text-6xl font-bold mb-4 hover:text-primary">
                    {{ movie.title }}
                  </h2></RouterLink
                >
                <div class="movie-detail mb-4">
                  <span class="movie-detail-item">
                    <Icon
                      class="text-accent inline-block mr-1"
                      width="10"
                      height="10"
                      icon="mdi:star"
                    ></Icon
                    >{{ movie.vote_average.toFixed(1) }}
                  </span>
                  <span class="movie-detail-item">{{ movie.release_date.substring(0, 4) }}</span>
                  <span class="movie-detail-item" v-if="isRecommended(movie)">
                    <div class="badge badge-accent badge-sm font-semibold">
                      <Icon
                        class="inline-block mr-1"
                        width="12"
                        height="12"
                        icon="mdi:thumb-up"
                      ></Icon>
                      Recommended
                    </div>
                  </span>
                </div>
                <p class="line-clamp-2 text-lg mb-10">{{ movie.overview }}</p>

                <div>
                  <button
                    v-if="watchList.isAdded(movie.id)"
                    @click="watchList.remove(movie.id)"
                    class="btn btn-secondary btn-outline md:btn-lg"
                  >
                    <Icon width="32" height="32" icon="mdi:bookmark-check"></Icon>
                    Watchlisted
                  </button>
                  <button
                    v-else
                    @click="
                      watchList.add({
                        id: movie.id,
                        backdrop_path: movie.backdrop_path,
                        overview: movie.overview,
                        poster_path: movie.poster_path,
                        release_date: movie.release_date,
                        title: movie.title,
                        vote_average: movie.vote_average,
                        is_recommended: isRecommended(movie),
                        type: 'movie'
                      })
                    "
                    class="btn btn-secondary md:btn-lg"
                  >
                    <Icon width="32" height="32" icon="mdi:bookmark-plus-outline"></Icon>
                    Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
            <div>
              <img
                :src="image.get({ size: '200', url: movie.poster_path })"
                alt=""
                class="rounded-xl h-full w-auto"
              />
            </div>
          </div>
        </div>
      </swiper-slide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '../interfaces'
import { Icon } from '@iconify/vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import useTMBDApi from '../composables/useTMDBApi'
import useImage from '../composables/useImage'
import useWatchlist from '@/composables/useWatchlist'

const image = useImage()
const api = useTMBDApi()
const watchList = useWatchlist()

const popularMovies = ref<Movie[]>([])

async function getPopularMovie() {
  try {
    const { data, status } = await api.getPopularMovie()

    if (status === 200) popularMovies.value = data.results
  } catch (error) {
    console.log(error)
  }
}

function isRecommended(movie: Movie) {
  return movie.vote_count > 1000 && movie.vote_average > 8
}

await getPopularMovie()
</script>

<style>
.carousel-image {
  background-repeat: no-repeat;
  background-size: 120%;
  object-fit: cover;
  @apply w-full  h-full relative;
}

.carousel-image::before {
  content: '';
  @apply w-full h-3/4 z-10 absolute bottom-0 left-0 bg-gradient-to-t from-base-100;
}

.carousel-image::before {
  content: '';
  @apply w-full h-full absolute bg-base-100/80 backdrop-blur-sm;
}

.carousel-content {
  @apply relative top-0 left-0 z-20  w-full pt-32;
}
</style>
