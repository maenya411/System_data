<script setup>
defineProps({
  title: String,
  value: Number,
  color: String
})
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
    <p class="text-gray-500">{{ title }}</p>
    <h3 :class="['text-3xl font-bold mt-2', color]">
      {{ value }}
    </h3>
  </div>
</template>