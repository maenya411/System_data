<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToAdmin = () => {
  router.push('/admin')  // Adjust route as needed
}
</script>

<template>
  <div class="flex min-h-screen bg-black text-gray-100">

    <!-- SIDEBAR -->
    <aside class="w-64 bg-gray-950 border-r border-gray-800 p-6 flex flex-col">

      <div class="mb-10">
        <h1 class="text-2xl font-bold text-white">
          <span class="text-orange-500">KVDA MAIL SYSTEM</span>
        </h1>
        <p class="text-xs text-gray-400">welcome</p>
      </div>

      <nav class="flex-1 space-y-3 text-gray-300">
        <NuxtLink
          to="/"
          class="block px-4 py-2 rounded-xl hover:bg-orange-600 hover:text-white transition"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink
          to="/departments"
          class="block px-4 py-2 rounded-xl hover:bg-orange-600 hover:text-white transition"
        >
          Departments
        </NuxtLink>
        <NuxtLink
          to="/reports"
          class="block px-4 py-2 rounded-xl hover:bg-orange-600 hover:text-white transition"
        >
          Reports
        </NuxtLink>
        <NuxtLink
          to="/settings"
          class="block px-4 py-2 rounded-xl hover:bg-orange-600 hover:text-white transition"
        >
          Settings
        </NuxtLink>
      </nav>
    </aside>

    <!-- MAIN CONTENT -->
    <div class="flex-1 flex flex-col bg-black">

      <!-- TOP NAVBAR -->
      <header
        class="bg-gray-950 border-b border-gray-800 px-6 py-4 flex justify-between items-center"
      >
        <h2 class="font-semibold text-lg text-white">
          Organisation Email Dashboard
        </h2>

        <!-- ONLY ONE ADMIN BUTTON HERE -->
        <button
          type="button"
          @click="goToAdmin"
          class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md"
        >
         Login
        </button>
      </header>

      <!-- PAGE CONTENT -->
      <main class="flex-1 p-6 bg-black">
        <slot />
      </main>

      <!-- FOOTER -->
      <footer
        class="bg-gray-950 text-gray-400 text-center py-4 border-t border-gray-800"
      >
        @maenyaclinton2026.      
        All rights reserved.
      </footer>
    </div>
  </div>
</template>
