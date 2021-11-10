<template>
  <a-layout class="inset-0 absolute">
    <a-layout-sider><Sider></Sider></a-layout-sider>
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Sider from './components/workspace/sider.vue';
</script>
