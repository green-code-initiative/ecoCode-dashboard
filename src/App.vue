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
      <p>You did it!</p>
      <AbcdeScore value="C" />
    </div>
    <div class="wrapper">
      <input type="button" @click="fetchIssues" value="click"><br>
      <output></output>
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
