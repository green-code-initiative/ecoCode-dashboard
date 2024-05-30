<template>
  <div class="sensitization-component">
    <LanguageComponent
      @on-lang-changed="$emit('onLangChanged', $event)"
      :project-key="projectKey"
      :branch-like="branchLike"
    />
    <NotCollapsedComponent
      v-if="!state.collapse"
      @collapse="state.collapse = !state.collapse"
      :rate="state.rate"
      :rate-class="rateData.class"
      :rule-to-correct="state.ruleToCorrect.name"
    />
    <CollapsedComponent
      v-else
      @collapse="state.collapse = !state.collapse"
      :rate-data="rateData"
      :rate="state.rate"
      :nb-severity="state.nbSev"
      :project-key="projectKey"
      :rule-to-correct="state.ruleToCorrect"
      :severity="state.severity"
      :rule-tags="state.ruleTags"
      :branch-like="branchLike"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, computed, watch } from 'vue';
import { findRuleWithKey } from '../../shared/api/RuleApi';
import { issuesUrl } from '../../shared/common/apiUrls';
import { Severities } from '../../shared/common/constants';
import {
  blockerIssuesProjectStoreKey,
  criticalIssuesProjectStoreKey,
  issuesStoreKey,
  majorIssuesProjectStoreKey,
  minorIssuesProjectStoreKey,
  numberIssuesOfEachRuleStoreKey,
} from '../../shared/common/storageKeys';
import {
  getRuleTagIcon,
  getSeverityLabelAndIcon,
} from '../../shared/common/utils';
import SensitizationService from '../../shared/services/sensitization/SensitizationService';
import { getStoredData } from '../../shared/storage/DataStorage';
import NotCollapsedComponent from './NotCollapsedComponent.vue';
import CollapsedComponent from './CollapsedComponent.vue';
import LanguageComponent from './LanguageComponent.vue';

const state = reactive({
  collapse: true,
  rate: {},
  nbSev: { minor: 0, major: 0, critical: 0, blocker: 0 },
  ruleToCorrect: {},
  ruleTags: [],
  severity: {},
});

const props = defineProps({
  projectKey: { type: String, required: true },
  lang: { type: String, required: true },
  branchLike: { type: String, required: true }
});

async function getNumberSeverities() {
  const minorSeverities = await getStoredData(minorIssuesProjectStoreKey);
  const majorSeverities = await getStoredData(majorIssuesProjectStoreKey);
  const criticalSeverities = await getStoredData(criticalIssuesProjectStoreKey);
  const blockerSeverities = await getStoredData(blockerIssuesProjectStoreKey);

  return {
    minor: minorSeverities.length,
    major: majorSeverities.length,
    critical: criticalSeverities.length,
    blocker: blockerSeverities.length,
  };
}

const rateData = computed(() => {
  switch (state.rate.letter) {
    case 'A':
      return {
        class: ['rate', 'a'],
        labelBold: 'Your app is fully optimized, congratulations!',
        label: "Don't forget to check it again if you update your app.",
        labelLong: '100 % optimized, congrats!',
      };
    case 'B':
      return {
        class: ['rate', 'b'],
        labelBold: 'Your app is nearly optimized.',
        label:
          'Well done! You can continue by fixing the recommended rule on the right side. This is the one that currently has the highest impact on your app.',
        labelLong: 'You have between 1 and 9 minor severities.',
      };
    case 'C':
      return {
        class: ['rate', 'c'],
        labelBold: 'Your app is not fully optimized.',
        label:
          'Keep going! You can continue by fixing the recommended rule on the right side. This is the one that currently has the highest impact on your app.',
        labelLong:
          'You have between 10 and 19 minor severities or you have 1 or many major severity.',
      };
    case 'D':
      return {
        class: ['rate', 'd'],
        labelBold: 'Many elements of your application can be optimized.',
        label:
          "Don't worry! You can start by fixing the recommended rule on the right side. This is the one that currently has the highest impact on your app.",
        labelLong:
          'You have more than 20 minor severities or more than 10 major severities or 1 or many critical severities.',
      };
    case 'E':
      return {
        class: ['rate', 'e'],
        labelBold: 'Several elements of your application can be optimized.',
        label:
          "Don't worry! You can start by fixing the recommended rule on the right side. This is the one that currently has the highest impact on your app.",
        labelLong: 'You have 1 or more than 1 blocker severities.',
      };
    default:
      return {
        class: [],
        labelBold: '',
        label: 'Unknown results',
        labelLong: 'Unknown results',
      };
  }
});

async function setOptimisationTip() {
  let numberIssuesOfEachRule = [];

  if (state.rate.percentage) {
    if (state.rate.percentage < 100) {
      numberIssuesOfEachRule = await getStoredData(
        numberIssuesOfEachRuleStoreKey,
      );
      const response = await getStoredData(issuesStoreKey);

      const highestSeverityInIssues = response.sort((a, b) => {
        if (Severities[a.severity] > Severities[b.severity]) {
          return 1;
        }
        return -1;
      })[response.length - 1];
      const extractSeverityStoreKey = `${issuesUrl}/search/severity/${highestSeverityInIssues.severity}`;
      const res = await getStoredData(extractSeverityStoreKey);

      const rulesToCompare = [];
      res.forEach((issue) => {
        numberIssuesOfEachRule.forEach((x) => {
          if (x != null) {
            if (x.val === issue.rule) {
              rulesToCompare.push(x);
            }
          }
        });
      });
      const finalRuleKey = rulesToCompare.sort((a, b) => {
        if (a.count > b.count) {
          return 1;
        }
        return -1;
      })[rulesToCompare.length - 1];
      const fr = await findRuleWithKey(finalRuleKey.val);

      const div = document.createElement('div');
      div.innerHTML = fr.htmlDesc.trim();
      fr.htmlDesc = div.firstChild.innerHTML;

      state.ruleToCorrect = fr;

      const tagsList = [];
      fr.sysTags.forEach((tag) => {
        const tagIconAndLabel = getRuleTagIcon(tag);
        if (tagIconAndLabel) {
          tagsList.push(tagIconAndLabel);
        }
      });

      state.ruleTags = tagsList;
      state.severity = getSeverityLabelAndIcon(fr.severity);
    } else if (state.rate.percentage === 100) {
      state.ruleToCorrect = {
        htmlDesc:
          ' Now that your application is fully optimized, you can go further by consulting the resources below. ',
      };
    }
  }
}

async function init() {
  state.rate = await SensitizationService.calculateOptimizationRate();
  state.nbSev = await getNumberSeverities();
  await setOptimisationTip();
}

const lang = computed(() => props.lang);

watch(lang, (newLang, oldLang) => {
  if (newLang !== oldLang) {
    init();
  }
});

onMounted(async () => {
  init();
});
</script>

<style scoped></style>
