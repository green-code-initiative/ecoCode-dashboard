<template>
  <div class="tag-card">
    <div class="head">
      <div>
        <div class="title">
          <strong>{{ props.tagIssues.tag }}</strong>
        </div>
        <div
          class="ellispse"
          data-for="issue_ellispse_tooltip"
          data-tip="Affected rules correspond to the number of rules associated with errors identified by SonarQube, among the Greensight rules that impact this component"
          data-iscapture="true"
        >
          i
          <q-tooltip class="tooltip tooltip-bg-dark" anchor="top middle" self="bottom middle">
            <div class="tooltip-small">
              Affected rules correspond to the number of rules associated with errors identified by
              SonarQube, among the Greensight rules that impact this component
            </div>
          </q-tooltip>
        </div>
      </div>
      <a
        v-if="!noIssues"
        :href="`${getBaseUrl()}/project/issues?branch=${props.branchLike}&id=${
          props.projectKey
        }&resolved=false&tags=${props.tagIssues.tag.toLowerCase()}`"
        target="blank"
      >
        See all issues
      </a>
    </div>
    <div class="body">
      <div class="body-left">
        <div
          class="circle-shadow-inset circle-rules-error"
          :style="{
            background: props.tagIssues.cercleStyle,
            '--bg-color': 'white'
          }"
        >
          <p class="circle-inside">
            <strong>{{ props.tagIssues.rulesWithIssues }}</strong>
            issues
          </p>
        </div>

        <div>
          <span class="circle-shadow-inset__legend">
            Affected {{ props.tagIssues.tag }} rules:
            <strong>{{ props.tagIssues.affectedRules }} / {{ props.tagIssues.tagRules }}</strong>
          </span>
        </div>
      </div>

      <div class="body-right">
        <RulesCriticities :tag-issues="props.tagIssues" :project-key="props.projectKey" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TagIssues from '../../shared/models/TagIssues'
import RulesCriticities from './RulesCriticities.vue'

const props = defineProps({
  projectKey: { type: String, required: true },
  tagIssues: { type: TagIssues, required: true },
  branchLike: { type: String, required: true }
})

const noIssues = computed(
  () =>
    props.tagIssues.minorIssues.value === 0 &&
    props.tagIssues.majorIssues.value === 0 &&
    props.tagIssues.criticalIssues.value === 0
)

const getBaseUrl = () => window.baseUrl
</script>

<style scoped>
.tag-card {
  padding: 30px 30px !important;
  flex: 1 0 40% !important;
  margin: 15px;
  height: fit-content;
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  padding-left: 30px;
  padding: 15px 10px 15px 30px;
  margin: 15px;
  border-radius: 10px;
}
.head {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.head a {
  border-bottom: none;
  color: #4aa9d5;
  font-weight: 500;
  font-size: 11px;
}
.title {
  float: left;
  margin-left: 5px;
  font-size: 18px;
  height: 10px;
}
.ellispse {
  border-radius: 100%;
  text-align: center;
  background-color: #4aa9d5;
  width: 13px;
  height: 13px;
  color: white;
  font-weight: 500;
  font-size: smaller;
  float: right;
  margin-left: 5px;
}
.body {
  display: flex;
  flex-wrap: wrap;
}
.body-left {
  flex: 1 0 40% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.body-right {
  flex: 1 0 50% !important;
}
.circle-shadow-inset {
  min-width: 130px;
  height: 130px;
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
.circle-rules-error {
  max-width: 120px;
  min-width: 120px;
  height: 120px;
  margin-bottom: 10px;
  background: white
    conic-gradient(
      from 0deg at 50% 50%,
      #85bb2f 0deg,
      #85bb2f 300deg,
      #fecb02 300deg,
      #fecb02 335deg,
      #ff8e12 335deg,
      #ff8e12 350deg,
      #e30021 350deg,
      #e30021 360deg,
      #85bb2f 360deg
    );
}
.circle-rules-error p {
  font-size: 12px;
  text-align: center;
}
.circle-rules-error strong {
  display: block;
  font-size: 30px;
  font-weight: 500;
}
.circle-shadow-inset__legend {
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  align-items: center;
  text-align: center;
  letter-spacing: -0.015em;
  display: block;
  margin: 0 auto;
}
.circle-inside {
  z-index: 1;
  margin-top: 15px;
  color: var(--text-color);
}
</style>
