<template>
  <div class="main-container">
    <h3 class="text-3xl font-bold mb-8">My Watchlist</h3>
    <div
      v-if="watchList.data.value.length > 0"
      class="grid lg:grid-cols-6 grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-6"
    >
      <MovieCard
        v-for="movie in watchList.data.value"
        :key="movie.id"
        :id="movie.id"
        :poster_path="movie.poster_path"
        :backdrop_path="movie.backdrop_path"
        :title="movie.title"
        :vote_average="movie.vote_average"
        :release_date="movie.release_date"
        :overview="movie.overview"
        :is_recommended="movie.is_recommended"
        :type="movie.type"
      ></MovieCard>
    </div>
    <div v-else>
      <div class="flex justify-center items-center">
        <p class="text-lg opacity-30 select-none py-20">Your Watchlist is Empty</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import useWatchlist from '@/composables/useWatchlist'

const watchList = useWatchlist()
</script>
