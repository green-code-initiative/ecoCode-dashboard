<template>
  <q-menu
    ref="refScoreTooltip"
    class="tooltip tooltip-bg-dark"
    anchor="top middle"
    self="bottom middle"
  >
    <div class="tooltip-content" @mouseleave="hide" @focusout="hide">
      <p>
        <strong>Calculation method: </strong><br />
        {{ label }}
      </p>
      <br />
      <p>
        <strong>Identified issues in your app:</strong>
      </p>
      <div
        v-for="issues in identifiedIssues"
        :key="issues.label"
        :class="[`links-${issues.severity}`, 'links']"
      >
        <div
          @click="onClickOpenIssues(issues.severity)"
          @keyup="onClickOpenIssues(issues.severity)"
        >
          {{ issues.data }} Low impact
          <img :src="IconArrowRight" alt="" class="img-links" />
        </div>
      </div>
    </div>
  </q-menu>
</template>

<script setup>
import { computed, ref } from 'vue';
import IconArrowRight from 'Icons/icon-arrow-right.svg';

const refScoreTooltip = ref(null);

const props = defineProps({
  label: { type: String, required: true },
  projectKey: { type: String, required: true },
  nbSeverity: { type: Object, required: true },
});

const identifiedIssues = computed(() => [
  {
    severity: 'minor',
    label: 'Low',
    data: props.nbSeverity.minor,
  },
  {
    severity: 'major',
    label: 'Medium',
    data: props.nbSeverity.major,
  },
  {
    severity: 'critical',
    label: 'High',
    data: props.nbSeverity.critical,
  },
]);

function onClickOpenIssues(severity) {
  const context = window.baseUrl;
  window.open(
    `${context}/issues?id=${
      props.projectKey
    }&resolved=false&severities=${severity.toUpperCase()}&tags=greensight`,
  );
}

function show() {
  refScoreTooltip.value.show();
}

function hide() {
  refScoreTooltip.value.hide();
}

defineExpose({ show, hide });
</script>

<style scoped>
.tooltip-content {
  width: 200px;
}
.links-minor {
  color: #fecb02;
}
.links-major {
  color: #ff8e12;
}
.links-critical {
  color: #e30021;
}
.links {
  cursor: pointer;
  font-weight: 400;
}
.img-links {
  margin-top: 3px;
  margin-left: 5px;
  height: 10px;
}
</style>
