<template>
  <span :class="getClass">
    <slot></slot>
    <BasicHelp :class="`${prefixCls}-help`" v-if="helpMessage" :content="helpMessage" />
  </span>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { useSlots, computed } from 'vue';
  import BasicHelp from './BasicHelp.vue';

  const props = defineProps({
    /**
     * Help text list or string
     * @default: ''
     */
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    /**
     * Whether the color block on the left side of the title
     * @default: false
     */
    span: { type: Boolean },
    /**
     * Whether to default the text, that is, not bold
     * @default: false
     */
    normal: { type: Boolean },
  });

  const prefixCls = 'basic-title';
  const slots = useSlots();
  const getClass = computed(() => [
    prefixCls,
    { [`${prefixCls}-show-span`]: props.span && slots.default },
    { [`${prefixCls}-normal`]: props.normal },
  ]);
</script>
<style lang="scss" scoped>
  .basic-title {
    display: flex;
    align-items: center;
  }
  :deep(.basic-help) {
    margin-left: 4px;
    cursor: auto;
  }
</style>
