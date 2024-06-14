<script setup>
import ImpactTag from '../../Atoms/ImpactTag/ImpactTag.vue'

defineProps({
  ruleName: {
    type: String,
    required: true
  },
  ruleDescription: {
    type: String,
    required: true
  },
  ratePercentage: {
    type: String,
    required: true
  },
  ruleImpact: {
    type: String,
    required: true
  },
  ruleTags: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="priority-rule">{{ ruleName }}</div>
  <div class="card-description" v-html="ruleDescription" />
  <div class="tags" v-if="ratePercentage < 100">
    <impact-tag :impact="impact" />
    <div class="tag" :key="tag.label" v-for="tag in ruleTags">
      <!-- {{ tag.icon }} -->
      <img width="20" :src="tag.icon" alt="" />
      <p>{{ tag.label }}</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
