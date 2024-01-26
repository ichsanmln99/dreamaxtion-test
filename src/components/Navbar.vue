<template>
  <div class="fixed w-full z-30 bg-gradient-to-b from-base-100">
    <div class="flex justify-between items-center main-container py-4">
      <div class="flex gap-20 items-center">
        <RouterLink to="/" class="text-primary font-bold text-2xl">DreamFlix</RouterLink>
        <div
          class="bg-base-300/10 w-full h-dvh fixed top-0 left-0 z-10 backdrop-blur-sm md:hidden"
          :class="isOpen ? 'block' : 'hidden'"
          @click="toggleMenu"
        ></div>
        <div
          :class="isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
          class="flex md:gap-8 gap-16 fixed md:relative bg-base-100 flex-col md:flex-row top-0 left-0 h-dvh md:h-fit md:w-auto md:bg-transparent w-4/5 z-10 p-20 md:p-0 transition-all md:transition-none ease-in-out"
        >
          <RouterLink
            @click="toggleMenu"
            to="/"
            class="text-2xl md:text-base hover:opacity-80"
            href=""
            >Home</RouterLink
          >
          <RouterLink
            @click="toggleMenu"
            to="/watchlist"
            class="text-2xl md:text-base hover:opacity-80"
            href=""
          >
            Watchlist
            <span class="badge badge-xs badge-primary ml-2">{{ watchList.data.value.length }}</span>
          </RouterLink>
        </div>
      </div>
      <div class="flex">
        <input
          v-if="isSearchActive"
          v-model="searchInput"
          @keypress.enter="navigateToSearchPage"
          ref="inputRef"
          type="text"
          class="input input-bordered input-ghost"
          placeholder="Type a Movie Title"
          @focusout="toggleSearch"
        />
        <template v-else>
          <button @click="toggleSearch" class="btn btn-ghost btn-circle" title="Watchlist">
            <Icon width="24" height="24" icon="mdi:search"></Icon>
          </button>
          <button class="btn btn-ghost btn-circle md:hidden" @click="toggleMenu" title="Watchlist">
            <Icon width="24" height="24" icon="mdi:menu"></Icon>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import useWatchlist from '@/composables/useWatchlist'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const watchList = useWatchlist()

const isSearchActive = ref(false)
const isOpen = ref(false)
const searchInput = ref('')
const inputRef = ref<HTMLInputElement>()

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function toggleSearch() {
  isSearchActive.value = !isSearchActive.value

  if (isSearchActive.value) {
    nextTick(() => {
      inputRef.value?.focus()
      searchInput.value = ''
    })
  }
}

function navigateToSearchPage() {
  if (searchInput.value) {
    router.push({
      path: '/search',
      query: {
        query: searchInput.value
      }
    })
  }
}
</script>
