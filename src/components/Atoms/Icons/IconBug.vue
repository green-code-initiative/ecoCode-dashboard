<script setup>
defineProps({
  size: {
    type: Number,
    default: 48,
  }
})
</script>
<template>
  <svg
    class="little-spacer-right"
    :height="`${size}px`"
    :width="`${size}px`"
    version="1.1"
    viewBox="0 0 16 16"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    style="
      fill-rule: evenodd;
      clip-rule: evenodd;
      stroke-linejoin: round;
      stroke-miterlimit: 1.41421;
    "
  >
    <path
      d="M10.09,1.88A2.86,2.86,0,0,0,8,1a2.87,2.87,0,0,0-2.11.87A2.93,2.93,0,0,0,5,4h6A2.93,2.93,0,0,0,10.09,1.88Z"
      style="fill: rgb(68, 68, 68)"
    ></path>
    <path
      d="M14.54,9H13V5.6L14.3,4.42a.5.5,0,0,0,0-.71.49.49,0,0,0-.7,0L12.17,5H3.82L2.34,3.66a.5.5,0,0,0-.67.74L2.94,5.55V9H1.46a.5.5,0,0,0,0,1H3a5.2,5.2,0,0,0,1.05,2.32l-2,1.81a.5.5,0,1,0,.67.74l2-1.82A4.62,4.62,0,0,0,7,14.1V8A1,1,0,0,1,8,7a.94.94,0,0,1,1,.9v6.17A4.55,4.55,0,0,0,11.18,13l2,1.83a.51.51,0,0,0,.33.13.48.48,0,0,0,.37-.17.49.49,0,0,0,0-.7l-2-1.8a5.34,5.34,0,0,0,1-2.29h1.64a.5.5,0,0,0,0-1Z"
      style="fill: currentcolor"
    ></path>
  </svg>
</template>
