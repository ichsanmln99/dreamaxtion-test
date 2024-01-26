<template>
  <div class="main-container">
    <div class="bg-base-200 overflow-hidden rounded-2xl">
      <div class="h-[300px] w-full bg-base-200 flex gap-1">
        <img
          class="w-52 h-full wobject-cover shadow-xl hidden md:block"
          :src="image.get({ url: poster_path, size: 200 })"
          alt=""
        />
        <img
          class="flex-1 h-full object-cover"
          :src="image.get({ url: backdrop_path, size: 500 })"
          alt=""
        />
      </div>
      <div class="md:p-8 p-6 flex flex-col md:flex-row gap-x-10 gap-12">
        <div class="md:w-8/12 flex flex-col gap-8">
          <h2 class="text-3xl font-bold">
            {{ title }}
          </h2>
          <div>
            {{ overview }}
          </div>
        </div>
        <div class="md:w-4/12 md:px-4">
          <h3 class="text-2xl font-bold mb-6">Information</h3>
          <div class="w-full flex flex-col gap-4">
            <div class="flex">
              <div class="w-1/2 font-bold">Genre</div>
              <div class="w-1/2 opacity-60 flex gap-2 flex-wrap">
                <span
                  v-for="genre in genres"
                  :key="genre.id"
                  class="badge badge-secondary badge-outline"
                  >{{ genre.name }}</span
                >
              </div>
            </div>
            <div class="flex">
              <div class="w-1/2 font-bold">Rating</div>
              <div class="w-1/2 opacity-60">
                <Icon
                  class="text-accent inline-block mr-1"
                  width="12"
                  height="12"
                  icon="mdi:star"
                ></Icon
                >{{ vote_average.toFixed(1) }}
              </div>
            </div>
            <div class="flex">
              <div class="w-1/2 font-bold">Release Date</div>
              <div class="w-1/2 opacity-60">{{ release_date || '-' }}</div>
            </div>
            <div class="flex">
              <div class="w-1/2 font-bold">Language</div>
              <div class="w-1/2 opacity-60">
                <span v-if="languages">{{
                  languages.length > 0 ? languages.join(', ') : '-'
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  poster_path: string
  backdrop_path: string
  title: string
  overview: string
  genres: { name: string; id: number }[]
  vote_average: number
  release_date: string
  languages: string[]
}

import { defineProps } from 'vue'
import { Icon } from '@iconify/vue'
import useImage from '../composables/useImage'
const image = useImage()

const props = defineProps<Props>()
</script>
