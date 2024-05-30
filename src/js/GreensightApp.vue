<template>
  <!-- Main root div is required to provent warning from vue.js
  This is because we are passing as rootprops the datas provided by Sonarqube-->
  <div>
    <QInnerLoading :showing="state.loading" />

    <div
      v-if="!state.loading"
      id="greensight_app"
      class="page-limited greensight-page"
    >
      <OverviewTab
        :project-key="projectKey"
        :lang="state.repo"
        :branchLike="branchName"
        @on-lang-changed="onLangChanged"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import {
  addDataToStore,
  clearStore,
  initCache,
} from './shared/storage/DataStorage';
import { findIssues, findNumberIssuesOfEachRule } from './shared/api/IssuesApi';
import { findRulesGreensight } from './shared/api/RuleApi';
import { findTotalAppCodeLines } from './shared/api/MeasuresApi';
import { findComponent } from './shared/api/ComponentApi';
import {
  issuesStoreKey,
  rulesStoreKey,
  totalAppCodeLinesStoreKey,
  fileComponentsStoreKey,
  dirComponentsStoreKey,
  numberIssuesOfEachRuleStoreKey,
  minorIssuesProjectStoreKey,
  majorIssuesProjectStoreKey,
  criticalIssuesProjectStoreKey,
  blockerIssuesProjectStoreKey,
  findTreeStoreKey,
} from './shared/common/storageKeys';
import { Tags } from './shared/common/constants';
import ComponentsTree from './shared/utils/ComponentsTree';
import OverviewTab from './components/OverviewTab.vue';

const props = defineProps({
  // Sonarqube provided informations about current projet
  component: { type: Object, required: true },
  currentUser: { type: Object, required: true },
  branchLike: { type: Object, required: true },
});

const state = reactive({
  repo: 'java-greensight',
  loading: true,
  allIssues: [],
});

const projectKey = computed(() => props.component.key);
const branchName = computed(() => props.branchLike.name);
async function initData(repo) {
  await clearStore();
  await initCache();

  // Récupère les issues avec le tag Greensight
  const issues = await findIssues(projectKey.value, repo, branchName.value);

  const rules = await findRulesGreensight(repo);
  const totalLines = await findTotalAppCodeLines(projectKey.value,branchName.value);
  const baseComponent = await findComponent(projectKey.value, branchName.value);

  await addDataToStore(issuesStoreKey, issues);

  const numberIssuesOfEachRule = await findNumberIssuesOfEachRule();

  await addDataToStore(rulesStoreKey, rules);
  await addDataToStore(totalAppCodeLinesStoreKey, totalLines);
  await addDataToStore(numberIssuesOfEachRuleStoreKey, numberIssuesOfEachRule);

  const minorProjectIssuesSeverities = issues.filter((issue) =>
    issue.severity.includes('MINOR'),
  );
  const majorProjectIssuesSeverities = issues.filter((issue) =>
    issue.severity.includes('MAJOR'),
  );
  const criticalProjectIssuesSeverities = issues.filter((issue) =>
    issue.severity.includes('CRITICAL'),
  );
  const blockerProjectIssuesSeverities = issues.filter((issue) =>
    issue.severity.includes('BLOCKER'),
  );

  await addDataToStore(
    minorIssuesProjectStoreKey,
    minorProjectIssuesSeverities,
  );
  await addDataToStore(
    majorIssuesProjectStoreKey,
    majorProjectIssuesSeverities,
  );
  await addDataToStore(
    criticalIssuesProjectStoreKey,
    criticalProjectIssuesSeverities,
  );
  await addDataToStore(
    blockerIssuesProjectStoreKey,
    blockerProjectIssuesSeverities,
  );

  const tree = new ComponentsTree(baseComponent.component);
  await tree.build(repo);

  await addDataToStore(findTreeStoreKey, tree);

  const directories = await tree.getComposites();
  const files = await tree.getLeaves();

  await addDataToStore(dirComponentsStoreKey, directories);
  await addDataToStore(fileComponentsStoreKey, files);

  await Object.keys(Tags).forEach(async (key) => {
    const tagLowerCase = Tags[key].toLowerCase();
    const issuesTag = issues.filter((i) => i.tags.includes(tagLowerCase));
    const rulesTag = rules.filter((i) => i.sysTags.includes(tagLowerCase));

    await addDataToStore(`${issuesStoreKey}/tag/${tagLowerCase}`, issuesTag);
    await addDataToStore(`${rulesStoreKey}/tag/${tagLowerCase}`, rulesTag);
  });

  state.issues = issues;
  state.loading = false;
}

async function onLangChanged(lang) {
  await initData(lang);
  state.repo = lang;
}

onMounted(() => {
  initData(state.repo);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap');

.greensight-page {
  min-height: 100vh;
  font-family: Montserrat, Arial, Helvetica, sans-serif;
  font-weight: 300;
  padding: 35px;
}

.greensight-page h2 {
  font-size: 18px;
}
</style>

<style>

h1, .h1{
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
</style>
