<template>
  <div class="language-component">
    <div class="dropdown">
      <label for="items">Selected language :</label>
      <q-select
        class="select"
        v-model="selectedLang"
        :options="languages"
        borderless
        bold
        ref="refSelect"
        popup-content-class="options"
        :disable-main-btn="true"
        :popup-content-style="{ borderRadius: '13px' }"
        hide-dropdown-icon
      >
        <template #append>
          <img width="20" :src="IconArrowDown" alt="collapse" />
        </template>
        <template #selected>
          <div class="selected">{{ selectedLang.label }}</div>
        </template>
        <template #option="{ opt }">
          <q-item class="option" clickable @click="onItemSelected(opt)">
            {{ opt.label }}
          </q-item>
        </template>
      </q-select>
    </div>
    <button
      type="button"
      class="btn-app"
      style="font-size: 16px"
      @click="seeIssues"
    >
      See All {{ selectedLang.label }} issues
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IconArrowDown from 'Icons/icon-arrow-down.svg';

const refSelect = ref(null);
const emit = defineEmits(['onLangChanged']);
const props = defineProps({ projectKey: { type: String, required: true }, branchLike: { type: String, required: true } });

const languages = ref([
  {
    lang: 'java-greensight',
    label: 'JAVA',
  },
  {
    lang: 'php-greensight',
    label: 'Php',
  },
  {
    lang: 'py-greensight',
    label: 'Python',
  },
]);

const selectedLang = ref(languages.value[0]);

function onItemSelected(option) {
  selectedLang.value = option;
  refSelect.value.hidePopup();
  emit('onLangChanged', option.lang);
}

function seeIssues() {
  const lang = selectedLang.value.lang.split('-')[0];
  const context = window.baseUrl;
  window.open(
    `${context}/project/issues?resolved=false&languages=${lang}&id=${props.projectKey}&branch=${props.branchLike}`,
  );
}
</script>

<style scoped>
.language-component {
  margin: 0 15px;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background-color: #dfdddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  font-size: 20px;
  padding: 1rem 40px;
}

.dropdown {
  display: flex;
  justify-content: center;
  align-items: center;
}

.select {
  width: 170px;
  margin-left: 20px;
}

.selected {
  font-size: 22px;
  font-weight: 1000;
  margin-left: 10px;
}

.option {
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 700;
  height: 50px;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
