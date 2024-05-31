<template>
  <div class="blocs-component">
    <div class="head">
      <div class="title-group">
        <div class="title">
          Issues <strong>by components</strong>
        </div>
      </div>
      <ul class="legends">
        <li
          v-for="filter in state.blocFilter"
          :key="filter.key"
        >
          <div
            :class="[
              {
                legend: true,
                'legend-active': filter.active
              }
            ]"
            @click="applyFilter(filter.key)"
            @keyUp="applyFilter(filter.key)"
          >
            <span :class="['legend-icon', filter.cssClass]">
              {{ filter.counter }}
            </span>

            <span v-if="filter.key === 'optimized'">
              <strong>{{ filter.displayName }}</strong>
            </span>
            <span v-else-if="filter.key === 'not covered'">
              <span>{{ filter.displayName }}</span>
            </span>
            <span v-else>
              <strong>{{ filter.displayName }}</strong> impact
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="body">
      <div class="blocs">
        <ul class="blocs-wrapper">
          <BlocComponent
            v-for="(bloc, index) in state.displayedBlocs"
            :key="index"
            :bloc="bloc"
            :project-key="projectKey"
            :branch-like="branchLike"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, onMounted, watch } from 'vue'
//import BlocService from '../../shared/services/blocs/BlocService'
import BlocComponent from './BlocComponent.vue'
import Bloc from '@/shared/models/Bloc'

const props = defineProps({
  projectKey: { type: String, required: true },
  lang: { type: String, required: true },
  branchLike: { type: String, required: true }
})

const state = reactive({
  //Mocked objects to display the elements, see Bloc Object for the attributes and './shared/services/blocs/BlocServices' for the population of the fields
  blocs: [
    new Bloc('optimized', 5, 'a', 6, '#85bb2f', 5, 'main', 'none', 'null', 1, 2),
    new Bloc('optimized', 5, 'a', 6, '#85bb2f', 5, 'main', 'none', 'null', 1, 2),
    new Bloc('optimized', 5, 'a', 6, '#85bb2f', 5, 'main', 'none', 'null', 1, 2),
    new Bloc('optimized', 5, 'a', 6, '#85bb2f', 5, 'main', 'none', 'null', 1, 2)
  ],
  displayedBlocs: [],
  blocFilter: [
    {
      key: 'not covered',
      cssClass: 'legend-not-covered',
      displayName: 'Not covered',
      active: false
    },
    {
      key: 'optimized',
      cssClass: 'legend-optimized',
      displayName: 'Optimized',
      active: false
    },
    {
      key: 'low-impact',
      cssClass: 'legend-low-impact',
      displayName: 'Low',
      active: false,
      counter: 0,
      severity: 'minor'
    },
    {
      key: 'medium-impact',
      cssClass: 'legend-medium-impact',
      displayName: 'Medium',
      active: false,
      counter: 0,
      severity: 'major'
    },
    {
      key: 'high-impact',
      cssClass: 'legend-high-impact',
      displayName: 'High',
      active: false,
      counter: 0,
      severity: 'critical'
    }
  ]
})

function filterBlocs() {
  let res = []
  const activeFilters = state.blocFilter.filter((f) => f.active)

  if (activeFilters.length === 0) {
    return state.blocs
  }

  for (const element of activeFilters) {
    const filter = element
    res = res.concat(state.blocs.filter((bloc) => bloc.blocType.includes(filter.key)))
  }

  return res
}

function applyFilter(key) {
  const filterIndex = state.blocFilter.findIndex((o) => o.key === key)

  state.blocFilter[filterIndex].active = !state.blocFilter[filterIndex].active

  state.displayedBlocs = filterBlocs()
}

async function setFiltersCounters() {
  const filterLow = state.blocFilter.find((x) => x.key.includes('low-impact'))
  const filterMedium = state.blocFilter.find((x) => x.key.includes('medium-impact'))
  const filterHigh = state.blocFilter.find((x) => x.key.includes('high-impact'))

  let minorIssues = []
  let majorIssues = []
  let criticalIssues = []
  for (const element of state.blocs) {
    const bloc = element
    if (bloc.minorIssues && bloc.majorIssues && bloc.criticalIssues) {
      minorIssues = minorIssues.concat(bloc.minorIssues)
      majorIssues = majorIssues.concat(bloc.majorIssues)
      criticalIssues = criticalIssues.concat(bloc.criticalIssues)
    }
  }
  minorIssues = [...new Map(minorIssues.map((item) => [item.key, item])).values()]
  majorIssues = [...new Map(majorIssues.map((item) => [item.key, item])).values()]
  criticalIssues = [...new Map(criticalIssues.map((item) => [item.key, item])).values()]

  filterLow.counter = minorIssues.length
  filterMedium.counter = majorIssues.length
  filterHigh.counter = criticalIssues.length
}

async function init() {
  //const blocService = new BlocService();
  //const blocs = await blocService.build();
  //blocs.sort((a, b) => (a.blocSize > b.blocSize ? 1 : -1));
  //state.blocs = blocs;
  state.displayedBlocs = state.blocs

  setFiltersCounters()
}

const lang = computed(() => props.lang)

watch(lang, (newLang, oldLang) => {
  if (newLang !== oldLang) {
    init()
  }
})

onMounted(async () => {
  init()
})
</script>

<style scoped>
.blocs-component {
  padding: 40px;
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  height: 100%;
  width: 78%;
  display: flex;
  flex-direction: column;
}
.head h2 {
  font-size: 20px;
}
.title-group {
  display: flex;
}
.title {
  font-size: 20px;
}
.ellispse-card {
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
.legends {
  display: flex;
  margin-top: 20px;
}
.legend {
  margin-right: 25px;
  cursor: pointer !important;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px !important;
}
.legend-active {
  background: #e6e6e6;
  border-radius: 5px;
  padding: 5px;
}
.legend-icon {
  vertical-align: middle !important;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: black;
  margin-right: 5px;
  font-size: 11px !important;
  font-weight: 600;
  color: white !important;
  text-align: center;
  padding-top: 4%;
}

.legend-not-covered {
  background-color: #bbbbbb;
  background-image: url('Icons/icon-not-covered.svg');
  background-repeat: no-repeat;
  background-size: 12px;
  background-position: center;
}

.legend-optimized {
  background-color: #85bb2f;
  background-image: url('Icons/icon-check-solid.svg');
  background-repeat: no-repeat;
  background-size: 11px;
  background-position: center;
}

.legend-low-impact {
  background-color: #fecb02;
}

.legend-medium-impact {
  background-color: #ff8e12;
}

.legend-high-impact {
  background-color: #e30021;
}

.body {
  display: flex;
  margin: 0 -175px 0 -35px;
  position: relative;
  padding-top: 20px;
}

.blocs {
  width: 74%;
  margin: 0 35px;
}

.blocs-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -2px;
  height: 540px;
  overflow: auto;
}
</style>
