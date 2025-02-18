<template>
  <TagsListSkeleton />
  <div class="linkTagsContainer" v-if="notesStore.getUniqueTags.length">
    <HeadingComponent v-if="current === 'tags'">Tags</HeadingComponent>
    <h1 v-else class="desktopTagHeading">Tags</h1>

    <ul>
      <li v-for="tag of notesStore.getUniqueTags" :key="tag">
        <RouterLink :to="{ name: 'tag', params: { tag: tag } }"><TagIco />{{ tag }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import HeadingComponent from './HeadingComponent.vue';
import { userNotesStore } from '@/stores/userNotesStore';
import TagIco from '@/assets/images/icon-tag.svg';
import TagsListSkeleton from '../skeletons/TagsListSkeleton.vue';

const { current } = defineProps<{ current?: string }>();

const notesStore = userNotesStore();
</script>

<style lang="scss" scoped>
.linkTagsContainer {
  display: grid;
  row-gap: 16px;

  @include mq(large) {
    row-gap: 8px;
  }

  .desktopTagHeading {
    font-family: var(--family-dynamic);
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    letter-spacing: -0.2px;
    color: var(--txt-cl-tag, $txt-cl-tag);
    padding: 10px 12px;
  }

  li:not(:last-child) a {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--bor-cl-base, $bor-cl-base);

    @include mq(large) {
      border: none;
      margin-bottom: 4px;
    }
  }

  li:not(:first-child) a {
    padding-top: 12px;
  }

  a {
    display: flex;
    align-items: center;
    gap: 8px;
    fill: none;
    stroke: var(
      --txt-cl-description-notes,
      var(--txt-cl-description-notes, $txt-cl-description-notes)
    );
    color: var(
      --txt-cl-description-notes,
      var(--txt-cl-description-notes, $txt-cl-description-notes)
    );
    font-family: var(--family-dynamic);
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    letter-spacing: -0.2px;

    @include mq(large) {
      padding: 10px 12px;
      border-radius: 8px;

      &.router-link-active {
        stroke: $link-cl-active;
        background-color: var(--link-cl-aside-bg-active, $link-cl-aside-bg-active);
        background-repeat: no-repeat;
        background-image: var(--arrow-img, $arrow-img);
        background-origin: padding-box;
        background-position: right center;
        opacity: 1;
        transition: opacity 250ms;
      }
      &.router-link-active.stroke {
        fill: none;
        stroke: $link-cl-active;
      }
    }
  }
}
</style>
