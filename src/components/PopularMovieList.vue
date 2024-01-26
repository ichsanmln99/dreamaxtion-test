<template>
  <h3 class="text-2xl font-bold">Popular Movies</h3>
  <Swiper
    class="!py-10"
    :modules="[Navigation]"
    :navigation="true"
    :breakpoints="{
      0: {
        slidesPerView: 1.8,
        spaceBetween: '14px'
      },
      640: {
        slidesPerView: 3.5,
        spaceBetween: '14px'
      },
      768: {
        slidesPerView: 3.8,
        spaceBetween: '14px'
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: '14px'
      },
      1280: {
        slidesPerView: 5.5,
        spaceBetween: '14px'
      }
    }"
  >
    <swiper-slide v-for="movie in popularMovies" :key="movie.id">
      <MovieCard
        :id="movie.id"
        :poster_path="movie.poster_path"
        :backdrop_path="movie.backdrop_path"
        :title="movie.title"
        :vote_average="movie.vote_average"
        :release_date="movie.release_date"
        :overview="movie.overview"
        :is_recommended="isRecommended(movie)"
        type="movie"
      ></MovieCard>
    </swiper-slide>
  </Swiper>
</template>

<script setup lang="ts">
import type { Movie } from '../interfaces'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import { ref } from 'vue'
import MovieCard from './MovieCard.vue'
import useTMBDApi from '../composables/useTMDBApi'

const api = useTMBDApi()

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
