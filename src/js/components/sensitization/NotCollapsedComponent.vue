<template>
  <div class="not-collapsed">
    <div
      class="collapse-button"
      @click="$emit('collapse')"
      @keyup="$emit('collapse')"
    >
      <img width="12" :src="IconArrowDown" alt="collapse" />
    </div>
    <div class="body">
      <div>
        <strong>Your eco-design score is</strong>
        <strong :class="rateClass">
          {{ rate.letter }}
        </strong>
      </div>
      <p v-if="rate.percentage < 100">
        <strong>
          Priority rule to correct :
          <u>{{ ruleToCorrect }}</u>
        </strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import IconArrowDown from 'Icons/icon-arrow-down.svg';

defineProps({
  rateClass: { type: Array, required: true },
  rate: { type: Object, required: true },
  ruleToCorrect: { type: String, required: true },
});
</script>

<style scoped>
.not-collapsed {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  margin: 0 15px;
}
.body p {
  font-size: 11px;
}
.body h3 {
  margin-bottom: 0px;
}
.body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 15px 30px 15px 30px;
  border-bottom-left-radius: 10px;
}
.collapse-button {
  cursor: pointer;
  float: right;
  background-color: #ffffff;
  padding: 20px 8px 20px 8px;
  border-radius: 0px 0px 10px 0px;
  height: 51px;
}
.rate {
  border-radius: 50%;
  padding: 3px 6px;
  margin-left: 5px;
  background: var(--bg-color);
  color: white;
}
.rate.a {
  --bg-color: #178c3d;
}
.rate.b {
  --bg-color: #85bb2f;
}
.rate.c {
  --bg-color: #fecb02;
}
.rate.d {
  --bg-color: #ff8e12;
}
.rate.e {
  --bg-color: #e30021;
}
</style>
