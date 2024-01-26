<template>
  <h3 class="text-3xl font-bold mb-8">Search Result</h3>

  <div class="mb-8">
    <p>
      <span class="opacity-60">{{ searchResult?.total_results || 0 }} results for</span> "{{
        route.query.query
      }}"
    </p>
  </div>
  <div v-if="hasResult" class="grid lg:grid-cols-5 grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-6">
    <MovieCard
      v-for="movie in searchResult?.results"
      :key="movie.id"
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
  </div>

  <div v-if="hasResult" class="flex justify-between my-10 items-center">
    <div>
      <RouterLink
        :to="{
          query: {
            query: searchQuery,
            page: page - 1
          }
        }"
        v-if="searchResult.page > 1"
        class="btn btn-ghost"
      >
        <Icon width="32" height="32" icon="mdi:chevron-left"></Icon> Previous
      </RouterLink>
    </div>
    <div v-if="searchResult.total_pages > 1" class="opacity-60 text-sm">
      {{ searchResult.page }} / {{ searchResult.total_pages }}
    </div>
    <div>
      <RouterLink
        v-if="searchResult.page >= 1 && searchResult.page < searchResult.total_pages"
        :to="{
          query: {
            query: searchQuery,
            page: page + 1
          }
        }"
        class="btn btn-ghost"
      >
        Next
        <Icon width="32" height="32" icon="mdi:chevron-right"></Icon>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '../interfaces'
import type { SearchResponse } from '@/interfaces'

import MovieCard from '@/components/MovieCard.vue'
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import useTMDBApi from '@/composables/useTMDBApi'
import { Icon } from '@iconify/vue/dist/iconify.js'

const route = useRoute()
const api = useTMDBApi()

const searchResult = ref<SearchResponse>({
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
})

const searchQuery = computed(() => route.query.query as string)
const page = computed(() => parseInt(route.query.page as string) || 1)
const hasResult = computed(() => searchResult.value?.total_results > 0)

function isRecommended(movie: Movie) {
  return movie.vote_count > 1000 && movie.vote_average > 8
}

async function search(query: string, page: number) {
  try {
    const { data, status } = await api.search({
      type: 'movie',
      query,
      page
    })

    if (status === 200) {
      searchResult.value = data
    }
  } catch (error) {
    console.log(error)
  }
}

await search(searchQuery.value, page.value)

watch(route, (newRoute) => {
  search(searchQuery.value, page.value)
})
</script>
