<template>
  <div class="notesWrapper">
    <HeadingComponent>All Notes</HeadingComponent>

    <NotesInformBlock>
      <template #noteButton>
        <el-button class="createNoteButton" tag="router-link" to="/create-note">
          + Create New Note
        </el-button>
      </template>
      <template #noteInformBlock
        >You don’t have any notes yet. Start a new note to capture your thoughts and ideas.
      </template>
    </NotesInformBlock>
    <el-button class="mobCreateNote" tag="router-link" to="/create-note"><Plus /></el-button>
  </div>
</template>

<script setup lang="ts">
import HeadingComponent from '../shared/HeadingComponent.vue';
import NotesInformBlock from './NotesInformBlock.vue';
import Plus from '@/assets/images/icon-plus.svg';
</script>

<style lang="scss" scoped>
.mobCreateNote {
  width: 48px;
  height: 48px;
  padding: 8px;
  fill: $btn-cl-base;
  background-color: $btn-bg-base;
  border-radius: 999px;
  box-shadow: 0 7px 11px 0 rgba(202, 207, 216, 0.7);
  margin-top: auto;
  align-self: end;

  @include mq(medium) {
    width: 64px;
    height: 64px;
  }

  @include mq(large) {
    display: none;
  }
}

.notesWrapper {
  height: 100%;
  display: flex;
  flex-direction: column;

  @include mq(large) {
    min-width: 290px;
    max-width: 21%;
    padding: 20px 16px 20px 32px;
    border-right: 1px solid $bor-cl-base;
    height: auto;
  }

  .createNoteButton {
    display: none;
    font-family: getInter(Medium);
    padding: 12px 16px;
    border-radius: 8px;
    line-height: 1.2;
    letter-spacing: -0.2px;
    text-decoration: none;
    height: auto;
    color: $btn-cl-base;
    background-color: $btn-bg-base;
    margin-bottom: 16px;
    transition: background-color 250ms;

    &:hover {
      background-color: $hover-btn-cl;
    }

    @include mq(large) {
      display: block;
    }
  }
}
</style>
