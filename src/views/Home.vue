<template>
  <div>
    <Suspense>
      <Highlight></Highlight>
      <template #fallback>
        <HighlightSkeleton class="mb-20" />
      </template>
    </Suspense>

    <div class="main-container mt-10">
      <Suspense>
        <PopularMovieList></PopularMovieList>
        <template #fallback> <MovieListSkeleton class="mb-24" /> </template>
      </Suspense>

      <Suspense>
        <popularTVShowList></popularTVShowList>
        <template #fallback> <MovieListSkeleton /> </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import Highlight from '@/components/Highlight.vue'
import MovieListSkeleton from '@/components/skeletons/MovieListSkeleton.vue'
import HighlightSkeleton from '@/components/skeletons/HighlightSkeleton.vue'
import PopularMovieList from '@/components/PopularMovieList.vue'
import popularTVShowList from '@/components/PopularTVShowList.vue'
</script>
