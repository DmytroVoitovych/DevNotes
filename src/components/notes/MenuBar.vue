<template>
  <nav class="menuBar">
    <ul class="mobLinkList">
      <li>
        <el-button tag="router-link" :to="{ name: 'notes' }" data-link="Home"
          ><HomeIco
        /></el-button>
      </li>
      <el-divider direction="vertical"></el-divider>
      <li>
        <el-button tag="router-link" :to="{ name: 'search' }" data-link="Search"
          ><SearchIco
        /></el-button>
      </li>
      <el-divider direction="vertical"></el-divider>
      <li>
        <el-button
          tag="router-link"
          class="stroke"
          :to="{ name: 'archivednotes' }"
          data-link="Archived"
        >
          <ArchiveIco
        /></el-button>
      </li>
      <el-divider direction="vertical"></el-divider>
      <li>
        <el-button tag="router-link" class="stroke" :to="{ name: 'tags' }" data-link="Tags">
          <TagIco
        /></el-button>
      </li>
      <el-divider direction="vertical"></el-divider>
      <li>
        <el-button tag="router-link" :to="{ name: 'settings' }" data-link="Settings"
          ><SettingIco
        /></el-button>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts" setup>
import { HomeIco, ArchiveIco, TagIco, SettingIco, SearchIco } from "@/assets/iconImport";
</script>
<style lang="scss" scoped>
.mobLinkList {
  display: flex;
  justify-content: space-evenly;

  & > li {
    display: flex;
  }

  .el-divider--vertical {
    display: none;
    height: auto;
    margin: 0 auto;
    border-color: var(--bor-cl-menu, $bor-cl-menu);

    @include mq(medium) {
      display: block;
    }
  }

  .el-button {
    height: auto;
    padding: 4px 22px;
    border: none;
    fill: var(--link-cl-grey, $link-cl-grey);
    background-color: transparent;

    @include mq(medium) {
      display: grid;
      place-items: center;
      gap: 4px;
      text-decoration: none;
    }

    &.stroke {
      fill: none;
      stroke: var(--link-cl-grey, $link-cl-grey);
    }

    &.router-link-active {
      background-color: var(--bg-cl-nav, $bg-cl-nav);
      fill: $link-cl-active;

      @include mq(medium) {
        &:after {
          color: $link-cl-active;
        }
      }
    }
    &.router-link-active.stroke {
      background-color: var(--bg-cl-nav, $bg-cl-nav);
      fill: none;
      stroke: $link-cl-active;
    }

    @include mq(medium) {
      &:after {
        content: attr(data-link);
        font-family: var(--family-dynamic);
        font-weight: normal;
        font-size: 12px;
        line-height: 1.2;
        letter-spacing: -0.2px;
      }
    }
  }
}
</style>
