<template>
  <DetailCard
    v-if="detail"
    :poster_path="detail.poster_path"
    :backdrop_path="detail.backdrop_path"
    :title="detail.name"
    :overview="detail.overview"
    :genres="detail.genres"
    :vote_average="detail.vote_average"
    :release_date="detail.first_air_date"
    :languages="detail.spoken_languages.map((lang) => lang.name)"
  ></DetailCard>
</template>

<script setup lang="ts">
import type { TVShowDetailsResponse } from '@/interfaces'
import DetailCard from '@/components/DetailCard.vue'
import useTMDBApi from '@/composables/useTMDBApi'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const api = useTMDBApi()
const movieId = parseInt(route.params.id as string)
const detail = ref<TVShowDetailsResponse>()

async function getTVShowDetails() {
  try {
    const { data, status } = await api.getTVShowDetails(movieId)

    if (status === 200) {
      detail.value = data
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await getTVShowDetails()
})
</script>
