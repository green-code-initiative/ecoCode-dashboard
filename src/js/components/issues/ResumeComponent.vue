<template>
  <div class="resume-component">
    <div class="coverage-title">
      <h3>Plugin coverage</h3>
      <div
        class="ellispse"
        data-for="coverage_ellispse_tip"
        data-tip="This percentage is given as an indication. There is no specific action to carried out."
        data-iscapture="true"
      >
        i
        <q-tooltip
          class="tooltip tooltip-bg-light"
          anchor="top middle"
          self="bottom middle"
        >
          <div class="tooltip-small">
            This percentage is given as an indication. There is no specific
            action to carried out.
          </div>
        </q-tooltip>
      </div>
    </div>
    <div
      class="circle-shadow-inset circle-shadow-inset--blue"
      :style="{
        '--angle': `${(state.pluginCoverage / 100) * 360}deg`,
        marginBottom: '85px',
      }"
    >
      <p>
        <strong>{{ state.pluginCoverage }} </strong>%
        <span class="circle-shadow-inset__legend_sidebar">
          of {{ linesOfCodeFormatted }} lines
        </span>
      </p>
    </div>

    <h3>Optimized rules</h3>
    <div
      :class="[
        'circle-shadow-inset',
        state.optimizableRules.optimizableRulesCircleColorClass,
      ]"
      :style="{
        '--angle': `${
          (state.optimizableRules.optimizableRulesPercentage / 100) * 360
        }deg`,
      }"
    >
      <p>
        <strong>{{ state.optimizableRules.optimizableRulesIssues }}</strong>
        <span class="circle-shadow-inset__legend_sidebar">
          of {{ state.greensightRules }} rules
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed, watch } from 'vue';
import {
  rulesStoreKey,
  totalAppCodeLinesStoreKey,
} from '../../shared/common/storageKeys';
import SideBarService from '../../shared/services/sidebar/SideBarService';
import { getStoredData } from '../../shared/storage/DataStorage';

const props = defineProps({
  lang: { type: String, required: true },
});

const state = reactive({
  pluginCoverage: 0,
  linesOfCode: 0,
  greensightRules: 0,
  optimizableRules: {
    optimizableRulesCircleColorClass: '',
    optimizableRulesPercentage: 0,
    optimizableRulesIssues: 0,
  },
});

async function init() {
  state.pluginCoverage = await SideBarService.calculatePluginCoverage();
  state.optimizableRules = await SideBarService.calculateOptimizedRules();
  state.linesOfCode = await getStoredData(totalAppCodeLinesStoreKey);
  state.greensightRules = (await getStoredData(rulesStoreKey)).length;
}

const lang = computed(() => props.lang);

watch(lang, (newLang, oldLang) => {
  if (newLang !== oldLang) {
    init();
  }
});

onMounted(() => {
  init();
});

const linesOfCodeFormatted = computed(() =>
  Math.abs(state.linesOfCode) > 999
    ? `${
        Math.sign(state.linesOfCode) *
        (Math.abs(state.linesOfCode) / 1000).toFixed(1)
      }k`
    : Math.sign(state.linesOfCode) * Math.abs(state.linesOfCode),
);
</script>

<style scoped>
.resume-component {
  width: 26%;
  height: 100%;
  margin: 0px 50px 0px 20px;
  background: #3f3d56;
  box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.15);
  --bg-color: #3f3d56;
  color: white;
  padding: 50px 10px 20px 10px;
  text-align: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.resume-component h3 {
  color: inherit;
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 10px;
  width: auto;
}
.coverage-title {
  display: flex;
  justify-content: center;
}
.ellispse {
  width: 13px;
  height: 13px;
  border-radius: 100%;
  background-color: #4aa9d5;
  color: #3f3d56;
  font-weight: 500;
  font-size: smaller;
  text-align: center;
  margin-left: 5px;
}
.circle-shadow-inset {
  border-radius: 50%;
  background: var(--bg-color)
    conic-gradient(
      from 0deg at 50% 50%,
      var(--text-color) 0deg,
      var(--text-color) var(--angle),
      rgba(0, 0, 0, 0.2),
      var(--angle),
      rgba(0, 0, 0, 0.2),
      359.97deg,
      var(--text-color) 360deg
    );
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-left: 0;
  height: 120px;
  width: 120px;
  margin: 0 auto;
  margin-bottom: 75px;
}
.circle-shadow-inset::before {
  content: '';
  position: absolute;
  height: 80%;
  width: 80%;
  left: 10%;
  top: 10%;
  border-radius: 50%;
  background: var(--bg-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.circle-shadow-inset--blue {
  --text-color: #4aa9d5;
}
.circle-shadow-inset--orange {
  --text-color: #ff8e12;
}
.circle-shadow-inset--green {
  --text-color: #85bb2f;
}
.circle-shadow-inset--yellow {
  --text-color: #fecb02;
}
.circle-shadow-inset--red {
  --text-color: #e30021;
}
.circle-shadow-inset p {
  position: relative;
  font-size: 16px;
  color: var(--text-color);
  margin-bottom: 0;
}
.circle-shadow-inset strong {
  font-size: 20px;
  font-weight: 500;
}

.circle-shadow-inset__legend_sidebar {
  position: absolute;
  color: #bbbbbb;
  left: 50%;
  width: 160px;
  transform: translateX(-50%);
  bottom: -80px;
  font-size: 14px;
  font-weight: bolder;
  text-align: center;
}
</style>
