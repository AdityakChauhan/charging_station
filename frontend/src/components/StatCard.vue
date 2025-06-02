<template>
  <div class="p-6 rounded-xl bg-slate-900 ring-1 ring-slate-800 shadow-md hover:shadow-cyan-500/10 transition-shadow">
    <div class="flex justify-between items-center">
      <div>
        <p class="text-sm text-slate-400">{{ title }}</p>
        <p class="text-2xl font-semibold mt-1">{{ value }}</p>
      </div>
      <div :class="`p-3 rounded-lg bg-${color}-500/10 text-${color}-400`">
        <span class="text-xl">{{ iconEmoji }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  value: [String, Number],
  icon: String, // values: check, cross, chip, zap
  color: String  // tailwind color like 'green', 'red', etc.
})

const iconEmojiMap = {
  check: '✅',
  cross: '❌',
  chip: '🧠',
  zap: '⚡'
}

const iconEmoji = iconEmojiMap[props.icon] || '📊'
</script>
