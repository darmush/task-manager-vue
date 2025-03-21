<template>
  <header class="fixed w-full top-0 left-0 border-b border-line-color bg-white shadow-md z-[30]">
    <div class="max-w-[1280px] mx-auto py-6 px-8 flex flex-row items-center justify-between">
      <RouterLink to="/">
        <h1 class="font-bold tracking-tighter text-right text-2xl leading-5">_Task<br>Manager</h1>
      </RouterLink>
      <div class="flex flex-row gap-4 items-center">
        <RouterLink to="/edit-tags">
          <Button text="Edit Tags"
                  :style="'white'"></Button>
        </RouterLink>
        <RouterLink to="/new-task">
          <Button text="Create Task"
                  :style="'black'"></Button>
        </RouterLink>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Button from './components/Button.vue';

</script>
