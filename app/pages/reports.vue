<script setup>
import { ref, onMounted, computed } from 'vue'
import { jsPDF } from "jspdf"
import { Chart, registerables } from "chart.js"
import { useEmails } from '@/composables/useEmails.js'

Chart.register(...registerables)

const { emails } = useEmails()

const reportData = computed(() => {
  const depts = {}
  emails.value.forEach(email => {
    const dept = email.dept
    if (!depts[dept]) depts[dept] = { department: dept, pfNumber: "-", total: 0, active: 0, inactive: 0, exited: 0, retired: 0 }

    depts[dept].total++
    if (email.status==="Active") depts[dept].active++
    if (email.status==="Inactive") depts[dept].inactive++
    if (email.status==="Exited") depts[dept].exited++
    if (email.status==="Retired") depts[dept].retired++
  })
  return Object.values(depts)
})

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  const ctx = chartRef.value.getContext("2d")
  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: reportData.value.map(r => r.department),
      datasets: [
        { label:"Active", data: reportData.value.map(r=>r.active), backgroundColor:"rgba(34,197,94,0.7)" },
        { label:"Inactive", data: reportData.value.map(r=>r.inactive), backgroundColor:"rgba(239,68,68,0.7)" },
        { label:"Exited", data: reportData.value.map(r=>r.exited), backgroundColor:"rgba(147,51,234,0.7)" },
        { label:"Retired", data: reportData.value.map(r=>r.retired), backgroundColor:"rgba(251,191,36,0.7)" }
      ]
    },
    options: { responsive:true, plugins:{legend:{position:"top"}} }
  })
})

const generatePDF = () => {
  const doc = new jsPDF("p","mm","a4")
  const logo = new Image()
  logo.src = "/images/KVDA_LOGo.png"
  logo.onload = () => {
    doc.addImage(logo,"PNG",10,10,25,25)
    doc.setFontSize(16); doc.text("KVDA Organisation",40,18)
    doc.setFontSize(12); doc.text("Email Analytics Report",40,26)
    doc.setFontSize(9); doc.text(`Generated on: ${new Date().toLocaleString()}`,40,32)

    let y=45; doc.setFontSize(9)
    doc.text("Department",10,y); doc.text("PF No",50,y); doc.text("Total",70,y)
    doc.text("Active",85,y); doc.text("Inactive",105,y); doc.text("Exited",130,y); doc.text("Retired",155,y)
    y+=6
    reportData.value.forEach(item=>{
      doc.text(item.department,10,y)
      doc.text(item.pfNumber,50,y)
      doc.text(String(item.total),70,y)
      doc.text(String(item.active),85,y)
      doc.text(String(item.inactive),105,y)
      doc.text(String(item.exited),130,y)
      doc.text(String(item.retired),155,y)
      y+=6
    })
    y+=10
    if(chartRef.value){
      const chartImage = chartRef.value.toDataURL("image/png",1.0)
      doc.addImage(chartImage,"PNG",10,y,190,80)
    }
    doc.setFontSize(8)
    doc.text("Generated from KVDA Mail Management System",10,290)
    doc.save("KVDA_Email_Report.pdf")
  }
}
</script>

<template>
  <div class="bg-[#0f172a] min-h-screen text-gray-200 p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-orange-400">Reports & Analytics</h1>
      <button @click="generatePDF" class="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold shadow-md">Generate PDF</button>
    </div>

    <div class="bg-[#1e293b] rounded-2xl shadow-lg p-6 mb-6 overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-[#111827] text-orange-400">
          <tr>
            <th class="p-3">Department</th>
            <th class="p-3">PF No</th>
            <th class="p-3">Total</th>
            <th class="p-3">Active</th>
            <th class="p-3">Inactive</th>
            <th class="p-3">Exited</th>
            <th class="p-3">Retired</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in reportData" :key="index" class="border-b border-gray-700 hover:bg-[#162032] transition">
            <td class="p-3">{{ item.department }}</td>
            <td class="p-3 text-blue-400 font-semibold">{{ item.pfNumber }}</td>
            <td class="p-3 text-white">{{ item.total }}</td>
            <td class="p-3 text-green-400 font-semibold">{{ item.active }}</td>
            <td class="p-3 text-red-400 font-semibold">{{ item.inactive }}</td>
            <td class="p-3 text-gray-400 font-semibold">{{ item.exited }}</td>
            <td class="p-3 text-yellow-400 font-semibold">{{ item.retired }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-[#1e293b] rounded-2xl shadow-lg p-6">
      <canvas ref="chartRef" height="120"></canvas>
    </div>
  </div>
</template>
