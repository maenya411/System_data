<template>
  <aside class="w-64 bg-[#0f172a] text-gray-300 min-h-screen p-6 border-r border-gray-800">

    <!-- Logo / Title -->
    <h2 class="text-2xl font-semibold text-white mb-12 tracking-wide">
      Dashboard
    </h2>

    <nav class="space-y-3">

      <!-- Active Item -->
      <a
        href="#"
        class="group relative flex items-center px-4 py-3 rounded-xl
               bg-blue-600/20 text-blue-400 font-medium
               transition-all duration-300
               hover:bg-blue-600/30 hover:text-white">

        <!-- Active Left Indicator -->
        <span class="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-lg"></span>

        <span class="ml-3">Emails</span>
      </a>

      <!-- Other Links -->
      <a
        href="#"
        class="group relative flex items-center px-4 py-3 rounded-xl
               transition-all duration-300
               hover:bg-gray-800 hover:text-white
               hover:pl-6">

        <span class="absolute left-0 top-0 h-full w-1 bg-transparent
                     group-hover:bg-orange-500 rounded-r-lg
                     transition-all duration-300"></span>

        <span class="ml-3">Departments</span>
      </a>

      <a
        href="#"
        class="group relative flex items-center px-4 py-3 rounded-xl
               transition-all duration-300
               hover:bg-gray-800 hover:text-white
               hover:pl-6">

        <span class="absolute left-0 top-0 h-full w-1 bg-transparent
                     group-hover:bg-purple-500 rounded-r-lg
                     transition-all duration-300"></span>

        <span class="ml-3">Reports</span>
      </a>

      <a
        href="#"
        class="group relative flex items-center px-4 py-3 rounded-xl
               transition-all duration-300
               hover:bg-gray-800 hover:text-white
               hover:pl-6">

        <span class="absolute left-0 top-0 h-full w-1 bg-transparent
                     group-hover:bg-gray-400 rounded-r-lg
                     transition-all duration-300"></span>

        <span class="ml-3">Settings</span>
      </a>

    </nav>

  </aside>
</template>