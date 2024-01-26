<template>
  <div class="main-container">
    <Suspense>
      <SearchResult></SearchResult>

      <template #fallback>
        <SearchResultSkeleton></SearchResultSkeleton>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import SearchResult from '@/components/SearchResult.vue'
import SearchResultSkeleton from '@/components/skeletons/SearchResultSkeleton.vue'
</script>
