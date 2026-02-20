<script setup>
import { ref } from 'vue'

const organisationName = ref('KVDA Organisation')
const emailDomain = ref('kvda.go.ke')
</script>

<template>
  <Navbar/>
  <Sidebar/>
  <div class="bg-[#0f172a] min-h-screen text-gray-200 p-6">

    <h1 class="text-3xl font-bold mb-6 text-orange-400">
      System Settings
    </h1>

    <div class="bg-[#1e293b] p-6 rounded-2xl shadow max-w-xl">

      <div class="mb-4">
        <label class="block text-gray-400 mb-1">Organisation Name</label>
        <input v-model="organisationName"
               class="w-full bg-[#111827] border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
      </div>

      <div class="mb-6">
        <label class="block text-gray-400 mb-1">Email Domain</label>
        <input v-model="emailDomain"
               class="w-full bg-[#111827] border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
      </div>

      <button class="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 transition font-semibold">
        Save Changes
      </button>

    </div>
  </div>
</template>