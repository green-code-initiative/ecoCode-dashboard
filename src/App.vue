<script setup>
//Two component imported from the Greensight dashboard
import IssuesComponent from './components/issues/IssuesComponent.vue'
import TagCards from './components/tag-cards/TagCards.vue'

import { reactive } from 'vue'

const state = reactive({
  projectKey: 'MyTestProject',
  lang: 'FR-fr',
  branchLike: 'project-branch'
})
</script>

<template>
  <header>
    <title>EcoCode Dashboard</title>
  </header>
  <main>
    <IssuesComponent
      :project-key="state.projectKey"
      :lang="state.lang"
      :branch-like="state.branchLike"
    />
    <TagCards :project-key="state.projectKey" :lang="state.lang" :branch-like="state.branchLike" />
  </main>
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

<style scoped>
.greensight-page {
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 300;
  padding: 35px;
}

.greensight-page h2 {
  font-size: 18px;
}
</style>

<style>
h1,
.h1 {
  line-height: 24px;
  color: #333;
  font-size: 16px;
  font-weight: 400;
}

p {
  margin: 0;
}

.tooltip {
  border-radius: 10px;
  padding: 21px 21px;
  font-size: 12px;
  font-family: Montserrat, Arial, Helvetica, sans-serif;
  font-weight: 100;
  line-height: 15px;
}
.tooltip-bg-dark {
  background: #3f3d56;
  color: white;
}
.tooltip-bg-light {
  background-color: #4aa9d5;
  color: #3f3d56;
  font-weight: 500;
}
.tooltip-small {
  width: 200px;
}
.btn-app {
  color: #444;
  background-color: white;
  border: 2px solid #444;
  padding: 8px 18px;
  border-radius: 100px;
  cursor: pointer;
}

.issues-component {
  display: flex;
  align-items: center;
  margin: 40px 15px;
}
</style>
