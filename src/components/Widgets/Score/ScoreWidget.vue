<template>
  <div class="wrapper">
    <span v-if="!state.score">
      <i class="fa fa-spinner fa-spin" /> Loading score...
    </span>
    <span v-else-if="state.error">
      <i class="fa fa-exclamation-triangle" /> Score not available - {{ state.error }}
    </span>
    <span v-else>
      <AbcdeScore :value="state.score" />
    </span>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';

import AbcdeScore from '@/components/design-system/Molecules/AbcdeScore/AbcdeScore.vue'

import { calculateProjectScore } from './score.service';

const props = defineProps({
  projectKey: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  }
})

const state = reactive({ score: '', error: null });

onMounted(async () => {
  try {
    state.score = await calculateProjectScore(props.projectKey, props.branch);
  } catch (error) {
    state.score = 'N/A';
    console.error('Error fetching score:', error);
    state.error = JSON.stringify(Object.values(error));
  }
});
</script>

<style scoped>
.wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}
</style>