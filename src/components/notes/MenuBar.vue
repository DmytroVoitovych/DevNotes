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
        <el-button tag="router-link" to="/search" data-link="Search"><SearchIco /></el-button>
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
        <el-button tag="router-link" class="stroke" to="/tag" data-link="Tags">
          <TagIco
        /></el-button>
      </li>
      <el-divider direction="vertical"></el-divider>
      <li>
        <el-button tag="router-link" to="/setting" data-link="Settings"><SettingIco /></el-button>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts" setup>
import HomeIco from '@/assets/images/icon-home.svg';
import SearchIco from '@/assets/images/icon-search.svg';
import ArchiveIco from '@/assets/images/icon-archive.svg';
import TagIco from '@/assets/images/icon-tag.svg';
import SettingIco from '@/assets/images/icon-settings.svg';
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
    border-color: $bor-cl-menu;

    @include mq(medium) {
      display: block;
    }
  }

  .el-button {
    height: auto;
    padding: 4px 22px;
    border: none;
    fill: $link-cl-grey;

    @include mq(medium) {
      display: grid;
      place-items: center;
      gap: 4px;
      text-decoration: none;
    }

    &.stroke {
      fill: none;
      stroke: $link-cl-grey;
    }

    &.router-link-active {
      background-color: $bg-cl-nav;
      fill: $link-cl-active;

      @include mq(medium) {
        &:after {
          color: $link-cl-active;
        }
      }
    }
    &.router-link-active.stroke {
      background-color: $bg-cl-nav;
      fill: none;
      stroke: $link-cl-active;
    }

    @include mq(medium) {
      &:after {
        content: attr(data-link);
        font-family: getInter();
        font-size: 12px;
        line-height: 1.2;
        letter-spacing: -0.2px;
      }
    }
  }
}
</style>
