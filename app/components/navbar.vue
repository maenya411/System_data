<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToAdmin = () => {
  router.push('/admin')   // make sure this route exists
}
</script>

<template>
  <nav class="bg-gray-900 border-b border-gray-800 shadow-lg px-6 py-4 flex justify-between items-center">

    <h1 class="text-white font-bold text-lg">
      KVDA Email System
    </h1>


  </nav>
</template>
