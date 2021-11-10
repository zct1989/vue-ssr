<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
  >
    <a-menu-item key="1">
      <template #icon>
        <PieChartOutlined />
      </template>
      <span>Option 1</span>
    </a-menu-item>
    <a-menu-item key="2">
      <template #icon>
        <DesktopOutlined />
      </template>
      <span>Option 2</span>
    </a-menu-item>
    <a-menu-item key="3">
      <template #icon>
        <InboxOutlined />
      </template>
      <span>Option 3</span>
    </a-menu-item>
    <a-sub-menu key="sub1">
      <template #icon>
        <MailOutlined />
      </template>
      <template #title>Navigation One</template>
      <a-menu-item key="5">Option 5</a-menu-item>
      <a-menu-item key="6">Option 6</a-menu-item>
      <a-menu-item key="7">Option 7</a-menu-item>
      <a-menu-item key="8">Option 8</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <template #icon>
        <AppstoreOutlined />
      </template>
      <template #title>Navigation Two</template>
      <a-menu-item key="9">Option 9</a-menu-item>
      <a-menu-item key="10">Option 10</a-menu-item>
      <a-sub-menu key="sub3" title="Submenu">
        <a-menu-item key="11">Option 11</a-menu-item>
        <a-menu-item key="12">Option 12</a-menu-item>
      </a-sub-menu>
    </a-sub-menu>
  </a-menu>
</template>

<script setup lang="ts">
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';

let collapsed = $ref(false);
let selectedKeys = $ref(['1']);
let openKeys = $ref(['sub1']);
let preOpenKeys = $ref(['sub1']);

watch(
  () => openKeys,
  (val, oldVal) => {
    preOpenKeys = oldVal;
  },
);

// const toggleCollapsed = () => {
//   collapsed = !collapsed;
//   openKeys = collapsed ? [] : preOpenKeys;
// };
</script>
