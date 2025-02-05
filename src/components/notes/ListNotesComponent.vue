<template>
  <p v-if="paramCreate" class="notesUntitled">Untitled Note</p>
  <div class="notesList">
    <h1></h1>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { paramCreate } = defineProps<{
  paramCreate: boolean;
}>();
</script>

<style lang="scss" scoped>
.notesUntitled {
  font-family: getInter(SemiBold);
  font-size: 16px;
  line-height: 1.2;
  letter-spacing: -0.3px;
  background-color: $bg-cl-note;
  padding: 8px;
  border-radius: 6px;
}
</style>
