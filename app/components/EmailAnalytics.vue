<script setup>
import { onMounted, watch } from 'vue'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'

// Register the Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

// Props: array of emails with statuses
const props = defineProps({
  emails: Array
})

let chartInstance = null

// Function to render the doughnut chart
const renderChart = () => {
  const ctx = document.getElementById('emailChart')
  if (!ctx) return

  // Count emails by status
  const active = props.emails.filter(e => e.status === 'Active').length
  const inactive = props.emails.filter(e => e.status === 'Inactive').length
  const exited = props.emails.filter(e => e.status === 'Exited').length
  const retired = props.emails.filter(e => e.status === 'Retired').length

  // Destroy previous chart if exists
  if (chartInstance) {
    chartInstance.destroy()
  }

  // Create new chart
  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Active', 'Inactive', 'Exited', 'Retired'],
      datasets: [{
        data: [active, inactive, exited, retired],
        backgroundColor: [
          '#22c55e', // green
          '#ef4444', // red
          '#6b7280', // gray
          '#f59e0b'  // yellow/orange for retired
        ],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#f3f4f6' // light text for dark mode
          }
        },
        tooltip: {
          enabled: true
        }
      }
    }
  })
}

// Render chart on mount
onMounted(() => {
  renderChart()
})

// Re-render chart whenever emails prop changes
watch(() => props.emails, () => {
  renderChart()
}, { deep: true })
</script>

<template>
  <div class="bg-gray-900 p-4 rounded-2xl shadow mb-6">
    <h3 class="text-lg font-semibold mb-4 text-gray-100">
      Email Status Analytics
    </h3>
    <canvas id="emailChart"></canvas>
  </div>
</template>

<style scoped>
/* Optional: make canvas responsive */
canvas {
  max-width: 100%;
}
</style>
