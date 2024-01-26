<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div>
    <Navbar></Navbar>
    <div class="pt-20">
      <RouterView></RouterView>
    </div>
  </div>
</template>
