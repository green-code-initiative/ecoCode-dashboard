<template>
  <div class="issues-component">
    <BlocsComponent
      :project-key="projectKey"
      :lang="lang"
      :branch-like="branchLike"
    />
    <ResumeComponent :lang="lang" />
  </div>
</template>

<script setup>
import BlocsComponent from './BlocsComponent.vue'
import ResumeComponent from './ResumeComponent.vue'

defineProps({
  projectKey: { type: String, required: true },
  lang: { type: String, required: true },
  branchLike: { type: String, required: true }
})
</script>

<style scoped>
.issues-component {
  display: flex;
  align-items: center;
  margin: 40px 15px;
}
</style>
