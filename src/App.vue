<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import RuleIconTag from './components/Mollecules/RuleIconTag/RuleIconTag.vue'
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
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <rule-icon-tag label="network" />
    </div>
    <div class="wrapper">
      <input type="button" @click="fetchIssues" value="click"><br>
      <output></output>
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
