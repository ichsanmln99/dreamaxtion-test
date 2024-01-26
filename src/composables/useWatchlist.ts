import type { MovieCardProps } from '@/interfaces/movieCard.interface'
import { useStorage } from '@vueuse/core'
import { computed, type Ref } from 'vue'

export default function () {
  const data: Ref<MovieCardProps[]> = useStorage('watchlist', [], localStorage)
  const ids = computed(() => data.value.map((data) => data.id))

  function add(movie: MovieCardProps) {
    if (!isAdded(movie.id)) {
      data.value.push(movie)
    }
  }

  function remove(id: number) {
    data.value = data.value.filter((val) => val.id !== id)
  }

  function isAdded(id: number) {
    return ids.value.includes(id)
  }

  return { data, add, remove, ids, isAdded }
}
