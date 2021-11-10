<template>
  <div class="page-container absolute inset-0 flex flex-col">slot</div>
</template>

<style lang="less" scoped>
.page-header-wrapper {
  height: 60px;
  background: #fff;

  .title {
    font-weight: 500;
  }
  .description {
    font-size: 10px;
    padding: 3px 0;
    color: #b5b5c3;
  }
}

.page-body-wrapper {
  overflow: auto;
}
</style>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  header: {
    type: Boolean,
    default: true,
  },
  flex: {
    type: Boolean,
    default: false,
  },
  flexDirection: {
    type: String as PropType<'row' | 'column'>,
    default: 'row',
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  padding: {
    type: Boolean,
    default: true,
  },
});
</script>
