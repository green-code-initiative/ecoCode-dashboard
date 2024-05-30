<template>
  <div class="collapsed-component">
    <div @mousemove="onMoveComponent">
      <div
        class="collapse-button"
        @click="$emit('collapse')"
        @keyup="$emit('collapse')"
      >
        <img width="12" :src="IconArrowDownUp" alt="collapse" />
      </div>
      <div class="body">
        <div class="body-left">
          <div class="title">Your eco-design score is</div>
          <ul class="rate-list">
            <li :class="rateData.class">
              <strong>{{ rate.letter }}</strong>
            </li>
            <li>A</li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
            <li>E</li>
          </ul>
          <div class="rate-description">
            <strong>{{ rateData.labelBold }}</strong>
            <br />
            <br />
            {{ rateData.label }}
            <br />
            <div
              class="tooltip-calc"
              @mouseover="showScoreTooltip"
              @focusin="showScoreTooltip"
            >
              how my score is calculated ?
              <SensitizationTooltip
                :label="rateData.labelLong"
                :nb-severity="nbSeverity"
                :project-key="projectKey"
                :branch-like="branchLike"
                ref="refSensitizationTooltip"
              />
            </div>
          </div>
        </div>

        <div class="body-right">
          <div class="title">
            {{
              rate.percentage === 100
                ? 'Go Further'
                : 'Priority rule to correct'
            }}
          </div>
          <div class="priority-rule">{{ ruleToCorrect.name }}</div>
          <div class="card-description" v-html="ruleToCorrect.htmlDesc" />
          <div class="tags" v-if="rate.percentage < 100">
            <div class="tag">
              <div :class="severity.class" />
              <p>{{ severity.label }} impact</p>
            </div>
            <div class="tag" :key="tag.label" v-for="tag in ruleTags">
              <!-- {{ tag.icon }} -->
              <img width="20" :src="tag.icon" alt="" />
              <p>{{ tag.label }}</p>
            </div>
          </div>
          <div class="btn-group">
            <button
              class="btn-app"
              type="button"
              @click="
                windowRef.open(
                  rate.percentage < 100
                    ? `${getBaseUrl()}/project/issues?branch=${branchLike}&resolved=false&rules=${ruleToCorrect.key}&id=${projectKey}`
                    : 'https://institutnr.org',
                )
              "
            >
              See {{ rate.percentage < 100 ? 'issues' : 'more' }}
            </button>
            <button
              v-if="rate.percentage < 100"
              class="btn-app-blue"
              type="button"
              @click="
                windowRef.open(
                  `${getBaseUrl()}/coding_rules?open=${ruleToCorrect.key}&q=${ruleToCorrect.key}`,
                )
              "
            >
              More infos
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IconArrowDownUp from 'Icons/icon-arrow-up.svg';
import SensitizationTooltip from './SensitizationTooltip.vue';

defineProps({
  rateData: { type: Object, required: true },
  rate: { type: Object, required: true },
  nbSeverity: { type: Object, required: true },
  projectKey: { type: String, required: true },
  ruleToCorrect: { type: Object, required: true },
  severity: { type: Object, required: true },
  ruleTags: { type: Array, required: true },
  branchLike: { type: String, required: true }
});

const windowRef = ref(window);
const refSensitizationTooltip = ref(null);

const scoreTooltipClosable = ref(true);

function showScoreTooltip() {
  refSensitizationTooltip.value.show();

  scoreTooltipClosable.value = false;
  setTimeout(() => {
    scoreTooltipClosable.value = true;
  }, 2000);
}

function onMoveComponent() {
  if (scoreTooltipClosable.value) {
    refSensitizationTooltip.value.hide();
  }
}

const getBaseUrl = () => window.baseUrl;
</script>

<style scoped>
.title {
  font-weight: 700;
  margin-bottom: 30px;
  font-size: 20px;
}
.collapsed-component ul {
  list-style: none;
  margin: 14px 0;
}
.collapsed-component li {
  margin-right: 17px;
  font-weight: 700;
  font-size: 10px;
}
.collapsed-component li img {
  margin-right: 6px;
}
/* COLLAPSED */
.collapsed-component {
  background-color: #fffdfa;
  position: relative;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  margin: 0 15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.body {
  margin: 0 -32px;
  padding: 20px 40px;
  display: flex;
}
.body-left {
  flex-basis: 20%;
  padding-left: 32px;
  padding-right: 70px;
  position: relative;
}
.body-left:first-child {
  flex-basis: 47%;
}
.body-left:first-child .rate-description {
  font-size: 12px;
}
.body-left:first-child .rate-description:nth-child(2) {
  width: 200px;
}
.rate-description {
  padding-top: 20px;
}
.collapse-button {
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: #fffdfa;
  text-align: center;
  padding-top: 7px;
  height: 28px;
  width: 28px;
}
.rate-list {
  vertical-align: middle;
  position: relative;
}
.rate-list li {
  display: inline-block;
  font-size: 14px;
  width: 36px;
  height: 36px;
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
  font-weight: bold;
  padding: 9px;
  text-align: center;
  background: rgba(39, 39, 39, 0.267);
}

.rate-list li:nth-child(2) {
  background: #178c3d;
  border-radius: 30px 0px 0px 30px;
}
.rate-list li:nth-child(3) {
  background: #85bb2f;
}
.rate-list li:nth-child(4) {
  background: #fecb02;
}
.rate-list li:nth-child(5) {
  background: #ff8e12;
}
.rate-list li:nth-child(6) {
  background: #e30021;
  border-radius: 0px 30px 30px 0px;
}
.rate {
  position: absolute;
  top: var(--top);
  left: var(--left);
  border-radius: 50px;
  padding: 7px !important;
  /* padding-bottom: 10px !important; */
  font-size: 28px !important;
  background: var(--bg-color) !important;
  color: white !important;
  width: 55px !important;
  height: 55px !important;
  border: 4px solid white;
  display: flex !important;
  justify-content: center;
  align-items: center;
}

.rate.a {
  --bg-color: #178c3d;
  --top: -10px;
  --left: -10px;
}
.rate.b {
  --bg-color: #85bb2f;
  --top: -10px;
  --left: 26px;
}
.rate.c {
  --bg-color: #fecb02;
  --top: -10px;
  --left: 62px;
}
.rate.d {
  --bg-color: #ff8e12;
  --top: -10px;
  --left: 98px;
}
.rate.e {
  --bg-color: #e30021;
  --top: -10px;
  --left: 135px;
}
.tooltip-calc {
  margin-top: 20px;
  font-size: 10px;
  text-decoration: underline;
  display: inline-block;
}

/* RIGHT SIDE */
.body-right {
  flex-basis: 80%;
  border-left: 2px solid #bbbbbb;
  padding-left: 70px;
  padding-right: 30px;
}
.priority-rule {
  line-height: 24px;
  color: #444;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
}

.tags {
  display: flex;
  font-size: 10px;
  font-weight: bold;
}
.tag {
  display: flex;
  align-items: center;
  padding-top: 15px;
}
.tag p {
  padding: 0 15px 0 5px;
  margin: 0;
}
.impact {
  height: 17px;
  width: 17px;
  border-radius: 50%;
  background-color: var(--bg-color);
}
.impact.optimized {
  --bg-color: #85bb2f;
}
.impact.low {
  --bg-color: #fecb02;
}
.impact.medium {
  --bg-color: #ff8e12;
}
.impact.high {
  --bg-color: #e30021;
}
.impact.blocker {
  --bg-color: #e30021;
}
.impact.info {
  --bg-color: #4aa9d5;
}
.btn-group {
  margin-top: 24px;
  font-weight: 500;
}
.btn-group .btn-app-blue {
  margin-left: 24px;
}
.btn-group .btn-app-blue:first-child {
  margin-left: 0;
}
.btn-app-blue {
  background-color: #4aa9d5;
  border: 2px solid #4aa9d5;
  color: #444;
  padding: 8px 18px;
  border-radius: 100px;
  cursor: pointer;
}
</style>
