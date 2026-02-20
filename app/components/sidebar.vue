<template>
  <aside class="w-64 bg-[#0f172a] text-gray-300 min-h-screen p-6 border-r border-gray-800 flex flex-col">

    <!-- Logo / Title -->
    <h2 class="text-2xl font-bold text-white mb-12 tracking-wide">
      KVDA MAIL SYSTEM
    </h2>

    <nav class="flex-1 space-y-3">

      <!-- Dashboard -->
      <NuxtLink
        to="/"
        class="group relative flex items-center px-4 py-3 rounded-xl
               bg-blue-600/20 text-blue-400 font-medium
               transition-all duration-300
               hover:bg-blue-600/30 hover:text-white"
      >
        <span class="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-lg"></span>
        <span class="ml-3">Dashboard</span>
      </NuxtLink>

      <!-- Departments -->
      <NuxtLink
        to="/departments"
        class="group relative flex items-center px-4 py-3 rounded-xl
               transition-all duration-300
               hover:bg-gray-800 hover:text-white
               hover:pl-6"
      >
        <span class="absolute left-0 top-0 h-full w-1 bg-transparent
                     group-hover:bg-orange-500 rounded-r-lg
                     transition-all duration-300"></span>
        <span class="ml-3">Departments</span>
      </NuxtLink>

      <!-- Reports -->
      <NuxtLink
        to="/reports"
        class="group relative flex items-center px-4 py-3 rounded-xl
               transition-all duration-300
               hover:bg-gray-800 hover:text-white
               hover:pl-6"
      >
        <span class="absolute left-0 top-0 h-full w-1 bg-transparent
                     group-hover:bg-purple-500 rounded-r-lg
                     transition-all duration-300"></span>
        <span class="ml-3">Reports</span>
      </NuxtLink>

      <!-- Settings -->
      <NuxtLink
        to="/settings"
        class="group relative flex items-center px-4 py-3 rounded-xl
               transition-all duration-300
               hover:bg-gray-800 hover:text-white
               hover:pl-6"
      >
        <span class="absolute left-0 top-0 h-full w-1 bg-transparent
                     group-hover:bg-gray-400 rounded-r-lg
                     transition-all duration-300"></span>
        <span class="ml-3">Settings</span>
      </NuxtLink>

    </nav>
  </aside>
</template>

<script setup>
// No extra logic needed for now
</script>