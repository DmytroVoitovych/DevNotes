<template>
  <div class="stickyNav">
    <LogoComponent class="asideLogo" />
    <nav class="asideNav">
      <ul class="asideMenuList">
        <li>
          <el-button tag="router-link" :to="{ name: 'notes' }" data-link="All notes"
            ><HomeIco
          /></el-button>
        </li>
        <li>
          <el-button
            tag="router-link"
            class="stroke"
            :to="{ name: 'archivednotes' }"
            data-link="Archived Notes"
          >
            <ArchiveIco />
          </el-button>
        </li>
      </ul>
      <el-divider />
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { ArchiveIco, HomeIco } from "@/assets/iconImport";
import LogoComponent from "../shared/LogoComponent.vue";
</script>
<style lang="scss" scoped>
.stickyNav {
  position: sticky;
  top: 0;
  background-color: var(--bg-cl-base, $bg-cl-base);
  padding-top: 28.5px;
}

.asideLogo {
  fill: var(--txt-cl-h, $txt-cl-h);
  margin-bottom: 29px;
}

.asideNav {
  .el-divider {
    border-top: 1px solid var(--bor-cl-base, $bor-cl-base);
    margin-bottom: 0;
    margin-top: 8px;
  }
}

.asideMenuList {
  li:first-child {
    margin-bottom: 4px;
  }

  .el-button {
    display: flex;
    justify-content: left;
    height: auto;
    padding: 10px 12px;
    border: none;
    fill: var(--link-cl-black, $link-cl-black);
    border-radius: 8px;
    background-color: transparent;
    transition:
      background-color 250ms ease-in-out,
      fill 250ms ease-in-out,
      stroke 250ms ease-in-out;

    &.stroke {
      fill: none;
      stroke: var(--link-cl-black, $link-cl-black);
    }

    &.router-link-active {
      fill: $link-cl-active;
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

    &:after {
      content: attr(data-link);
      font-family: var(--family-dynamic);
      font-weight: 500;
      font-size: 14px;
      line-height: 1.2;
      letter-spacing: -0.2px;
      margin-left: 8px;
      color: var(--txt-cl-h, $txt-cl-h);
    }

    @media (hover: hover) {
      &:hover {
        background-color: var(--link-cl-aside-bg-active, $link-cl-aside-bg-active);
        fill: $link-cl-active;
      }
      &.stroke:hover {
        fill: none;
        stroke: $link-cl-active;
      }
    }
  }
}
</style>
