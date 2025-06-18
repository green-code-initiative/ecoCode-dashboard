<script setup>
import AbcdeScore from './components/Mollecules/AbcdeScore/AbcdeScore.vue'
</script>

<script>
import { findIssues } from './api/sonar/issues/sonar.issues.search.api'
async function fetchIssues() {
  const issues = await findIssues('foo', 'javascript', 'main')
  document.body.getElementsByTagName('output')[0].innerText = JSON.stringify(issues)
}
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>You did it!</h1>
      <AbcdeScore value="C" />
    </div>
    <div class="wrapper">
      <input
        type="button"
        value="click"
        @click="fetchIssues"
      ><br>
      <output />
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
