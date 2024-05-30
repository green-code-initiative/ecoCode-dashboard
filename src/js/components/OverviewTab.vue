<template>
  <div class="overview-page">
    <div class="head">
      <div class="title">
        Welcome back
        <strong v-if="state.currentUser">{{ state.currentUser.name }}</strong>
      </div>
      <img alt="Greensight Logo" :src="greensightLogo" />
    </div>
    <SensitizationComponent
      :project-key="projectKey"
      :lang="lang"
      :branch-like="branchLike"
      @on-lang-changed="$emit('onLangChanged', $event)"
    />
    <IssuesComponent :project-key="projectKey" :lang="lang" :branch-like="branchLike" />
    <TagCards :project-key="projectKey" :lang="lang" :branch-like="branchLike" />
    <footer>
      <img :src="LogoAIE" alt="Capgemini Applied Innovation Exchange" />
    </footer>
  </div>
</template>

<script setup>
import LogoAIE from 'Images/Logo-AIE.svg';
import greensightLogo from 'Images/Greensight-by-Capgemini.svg';
import { onMounted, reactive } from 'vue';
import IssuesComponent from './issues/IssuesComponent.vue';
import TagCards from './tag-cards/TagCards.vue';
import SensitizationComponent from './sensitization/SensitizationComponent.vue';
import UserService from '../shared/services/user/UserService';

const state = reactive({
  currentUser: null,
});

onMounted(async () => {
  state.currentUser = await UserService.findCurrentUser();
});

defineProps({
  projectKey: { type: String, required: true },
  lang: { type: String, required: true },
  branchLike: { type: String, required: true }
});
</script>

<style scoped>
.overview-page * {
  box-sizing: border-box;
  width: inherit;
}
.head {
  margin: 10px 35px 35px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-weight: 300;
  font-size: 24px;
}
footer {
  padding: 80px 0 40px;
  text-align: center;
}
</style>
