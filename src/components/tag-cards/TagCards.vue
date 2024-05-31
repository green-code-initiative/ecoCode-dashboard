<template>
  <div class="tag-cards">
    <TagCard
      v-for="tagIssues in state.issuesTags"
      :project-key="props.projectKey"
      :key="tagIssues.key"
      :tagIssues="tagIssues"
      :branch-like="branchLike"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, watch } from 'vue';
import { Tags } from '../../shared/common/constants';
import TagsService from '../../shared/services/tags/TagsService';
import TagCard from './TagCard.vue';

const state = reactive({
  issuesTags: [],
});

const props = defineProps({
  projectKey: { type: String, required: true },
  lang: { type: String, required: true },
  branchLike: {type:String, required: true }
});

async function init() {
  const keyTags = Object.keys(Tags).filter((key) => key !== 'MAINTENANCE');
  state.issuesTags = await Promise.all(
    keyTags.map((key) =>
      TagsService.buildTagIssues(props.projectKey, Tags[key]),
    ),
  );
}

const lang = computed(() => props.lang);

//On language chang
watch(lang, (newLang, oldLang) => {
  if (newLang !== oldLang) {
    init();
  }
});

onMounted(async () => {
  init();
});
</script>

<style scoped>
.tag-cards {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
}
</style>
