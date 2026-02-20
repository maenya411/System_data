<script setup>
import Sidebar from '~/components/Sidebar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const goToAdmin = () => {
  router.push('/admin')  // Adjust route as needed
}
</script>

<template>
  <div class="flex min-h-screen bg-black text-gray-100">

    <!-- SIDEBAR -->
    <Sidebar />

    <!-- MAIN CONTENT -->
    <div class="flex-1 flex flex-col bg-black">

      <!-- TOP NAVBAR -->
      <header
        class="bg-gray-950 border-b border-gray-800 px-6 py-4 flex justify-between items-center"
      >
        <h2 class="font-semibold text-lg text-white">
          Organisation Email Dashboard
        </h2>

        <!-- LOGIN / ADMIN BUTTON -->
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
        @maenyaclinton2026. All rights reserved.
      </footer>

    </div>
  </div>
</template>