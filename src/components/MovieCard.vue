<template>
  <RouterLink :to="'/detail/' + type + '/' + id" class="relative w-full cursor-pointer group">
    <div class="relative w-full">
      <img
        class="rounded-2xl w-full"
        :src="poster_path ? image.get({ url: poster_path, size: 200 }) : '/no-poster.png'"
        alt=""
      />
      <div
        v-if="is_recommended"
        class="badge badge-accent badge-sm font-semibold absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <Icon class="inline-block mr-1" width="12" height="12" icon="mdi:thumb-up"></Icon>
        Recommended
      </div>
    </div>

    <div
      class="bg-base-300 z-20 shadow-2xl rounded-2xl w-52 h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all delay-200 duration-200"
    >
      <div class="relative min-h-24">
        <img
          class="w-full bg-cover rounded-t-2xl"
          :src="image.get({ url: backdrop_path, size: 200 })"
          alt=""
        />
        <div class="bottom-2 right-2 absolute flex gap-2">
          <button
            v-if="watchList.isAdded(id)"
            @click.stop.prevent="watchList.remove(id)"
            class="btn btn-circle btn-secondary btn-outline btn-sm shadow-xl"
          >
            <Icon width="20" height="20" icon="mdi:bookmark-check"></Icon>
          </button>
          <button
            v-else
            @click.stop.prevent="watchList.add(props)"
            class="btn btn-circle btn-secondary btn-sm shadow-xl"
          >
            <Icon width="20" height="20" icon="mdi:bookmark-plus-outline"></Icon>
          </button>
        </div>
      </div>
      <div class="p-4 flex flex-col gap-2">
        <h4 class="line-clamp-1 hover:text-primary">{{ title }}</h4>
        <div class="movie-detail text-xs">
          <span class="movie-detail-item">
            <Icon
              class="text-accent inline-block mr-1"
              width="10"
              height="10"
              icon="mdi:star"
            ></Icon
            >{{ vote_average.toFixed(1) }}
          </span>
          <span class="movie-detail-item">{{ release_date.substring(0, 4) }}</span>
          <span class="movie-detail-item" v-if="is_recommended">
            <div class="badge badge-accent badge-sm font-semibold">
              <Icon class="inline-block" width="12" height="12" icon="mdi:thumb-up"></Icon>
            </div>
          </span>
        </div>
        <p class="text-xs line-clamp-4 opacity-60">{{ overview }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { MovieCardProps } from '@/interfaces/movieCard.interface'
import { defineProps } from 'vue'
import { Icon } from '@iconify/vue'
import useImage from '../composables/useImage'
import useWatchlist from '@/composables/useWatchlist'

const image = useImage()
const watchList = useWatchlist()

const props = defineProps<MovieCardProps>()
</script>
