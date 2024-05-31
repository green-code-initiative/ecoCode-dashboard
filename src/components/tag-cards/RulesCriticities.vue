<template>
  <ul class="rules-criticities">
    <li class="criticity bullet bullet-optimized">
      &nbsp;&nbsp;<b style="margin-left: '3px'">Optimized</b> &nbsp;&nbsp;{{
        props.tagIssues.tag
      }}
      rules
      <strong class="no-issues">
        {{ props.tagIssues.optimizedRules.value }}
      </strong>
    </li>

    <BulletCriticity
      v-for="criticity in criticities"
      :key="criticity.criticity"
      :criticity="criticity"
      :project-key="props.projectKey"
      :tag="props.tagIssues.tag"
    />
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import TagIssues from '../../shared/models/TagIssues';
import BulletCriticity from './BulletCriticity.vue';

const props = defineProps({
  projectKey: { type: String, required: true },
  tagIssues: { type: TagIssues, required: true },
});

const criticities = computed(() => [
  {
    criticity: 'minor',
    text: 'Low',
    issues: props.tagIssues.minorIssues,
  },
  {
    criticity: 'major',
    text: 'Medium',
    issues: props.tagIssues.majorIssues,
  },
  {
    criticity: 'critical',
    text: 'High',
    issues: props.tagIssues.criticalIssues,
  },
]);
</script>

<style scoped>
.rules-criticities {
  width: 100%;
  height: 100%;
  border-left: 1px solid #f2f2f2;
  padding-left: 25px;
}
.clickable {
  cursor: pointer;
}
.bullet-not-covered::before {
  background-color: #bbbbbb;
}
.bullet-optimized::before {
  background-color: #85bb2f;
}
</style>

<style>
.criticity {
  display: flex;
  font-size: 12px;
  margin-bottom: 17px;
}
.criticity strong {
  margin-left: auto;
  margin-right: 10px;
}
.bullet::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  margin-top: -1px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: black;
  margin-right: 3px;
}
.no-issues {
  margin-right: 17px !important;
}
</style>
