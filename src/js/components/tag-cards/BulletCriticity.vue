<template>
  <li
    :class="[
      'criticity',
      'bullet',
      `bullet-${criticity.criticity}-impact`,
      { clickable: isIssues },
    ]"
    @click="isIssues ? onClickOpenIssues(tag, criticity.criticity) : null"
    @keyUp="isIssues ? onClickOpenIssues(tag, criticity.criticity) : null"
  >
    &nbsp;&nbsp;<b style="margin-left: '3px'">{{ criticity.text }}</b>
    &nbsp;impact issues
    <strong :class="{ 'no-issues': !isIssues }">{{
      criticity.issues.value
    }}</strong>
    <img :src="IconArrowRight" alt="" v-if="isIssues" />
  </li>
</template>

<script setup>
import { computed } from 'vue';
import IconArrowRight from 'Icons/icon-arrow-right.svg';

const props = defineProps({
  criticity: { type: Object, required: true },
  projectKey: { type: String, required: true },
  tag: { type: String, required: true },
});

const isIssues = computed(() => props.criticity.issues.value > 0);

function onClickOpenIssues(tag, criticity) {
  const context = window.baseUrl;
  window.open(
    `${context}/project/issues?id=${
      props.projectKey
    }&resolved=false&severities=${criticity.toUpperCase()}&tags=${props.tag.toLowerCase()}`,
  );
}
</script>

<style scoped>
.bullet-minor-impact::before {
  background-color: #fecb02;
}
.bullet-major-impact::before {
  background-color: #ff8e12;
}
.bullet-critical-impact::before {
  background-color: #e30021;
}
</style>
