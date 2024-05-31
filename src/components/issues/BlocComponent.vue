<template>
  <li
    :class="['bloc-item', bloc.blocType]"
    :style="{
      width: `${bloc.blocSize}%`,
      backgroundColor: bloc.color,
    }"
    :key="bloc.key"
  >
    <span class="label">{{ bloc.blocName }}</span>

    <strong
      v-if="bloc.blocType !== 'optimized' && bloc.blocType !== 'not-covered'"
    >
      {{ bloc.numberOfDirectErrors }} |
      {{ bloc.numberOfErrors - bloc.numberOfDirectErrors }}
      <a
        :href="`${windowRef.baseUrl}/project/issues?directories=${bloc.path}&id=${projectKey}&branch=${branchLike}&resolved=false`"
        target="_blank"
        rel="noopener noreferrer"
        title="Open Issues"
      >
        <img :src="IconCopyLink" alt="link" />
      </a>
    </strong>

    <div v-if="bloc.blocType === 'not-covered'">
      <img height="13" width="13" :src="IconNotCovered" alt="not covered" />
    </div>

    <strong v-if="bloc.blocType === 'optimized'">
      <img height="13" width="13" :src="IconCheck" alt="check" />
    </strong>

    <q-tooltip
      class="tooltip tooltip-bg-dark"
      anchor="top middle"
      self="bottom middle"
    >
      <div class="tooltip-content">
        <div><strong>Component: </strong> {{ bloc.key }}</div>
        <div v-if="directErrors === 0 && indirectErrors === 0">
          No issues identified
        </div>
        <div v-if="directErrors > 0 || indirectErrors > 0">
          <strong>Issues:</strong>
          {{
            ` ${directErrors} ${directText} | ${indirectErrors} ${indirectText}`
          }}
        </div>
      </div>
    </q-tooltip>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue';
import IconNotCovered from '../../assets/icons/icon-not-covered.svg';
import IconCheck from '../../assets/icons/icon-check-solid.svg';
import IconCopyLink from '../../assets/icons/icon-copy-link.svg';
import Bloc from '../../shared/models/Bloc';

const windowRef = ref(window);

const props = defineProps({
  bloc: { type: Bloc, required: true },
  projectKey: { type: String, required: true },
  branchLike: { type: String, required: true }
});

const indirectErrors = computed(
  () => props.bloc.numberOfErrors - props.bloc.numberOfDirectErrors,
);
const directErrors = computed(() => props.bloc.numberOfDirectErrors);
const directText = computed(() =>
  directErrors.value > 1 ? 'Directs' : 'Direct',
);
const indirectText = computed(() =>
  indirectErrors.value > 1 ? 'Indirects' : 'Indirect',
);
</script>

<style scoped>
.bloc-item {
  height: auto;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  flex-direction: column;
  margin: 0;
  flex: 1 0 auto;
  border-radius: 5px;
}
.bloc-item a {
  position: absolute;
  top: 5px;
  right: 5px;
  border-bottom: none;
}
.not-covered {
  background-color: #bbbbbb;
}
.optimized {
  background-color: #85bb2f;
}
.low-impact {
  background-color: #fecb02;
}
.medium-impact {
  background-color: #ff8e12;
}
.high-impact {
  background-color: #e30021;
}
.label {
  white-space: pre-wrap;
  word-wrap: break-word !important;
  width: 100%;
  font-weight: bolder;
  font-size: 12px;
}
.tooltip-content {
  line-height: 20px;
}
</style>
