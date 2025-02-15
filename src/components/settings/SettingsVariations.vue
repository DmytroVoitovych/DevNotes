<template>
  <div class="settingContainer">
    <HeadingComponent class="settingHeading">Settings</HeadingComponent>
    <ul class="settingList">
      <li>
        <RouterLink :to="{ name: 'settings', params: { settingname: 'color-theme' } }"
          ><IconSun /> Color theme
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'settings', params: { settingname: 'font-theme' } }"
          ><IconFont /> Font Theme
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'settings', params: { settingname: 'change-password' } }"
          ><IconLock /> Change Password
        </RouterLink>
      </li>
      <el-divider />
      <li>
        <button type="button"><IconExit /> Logout</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import IconSun from '@/assets/images/icon-sun.svg';
import IconFont from '@/assets/images/icon-font.svg';
import IconLock from '@/assets/images/icon-lock.svg';
import IconExit from '@/assets/images/icon-logout.svg';
</script>

<style lang="scss" scoped>
.settingContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &:has(~ form) {
    display: none;
    @include mq(large) {
      display: flex;
    }
  }

  @include mq(large) {
    overflow-y: auto;
    min-width: 290px;
    max-width: 21%;
    padding: 20px 16px 20px 32px;
    border-right: 1px solid var(--bor-cl-base, $bor-cl-base);
    height: auto;
  }

  .settingList {
    display: grid;
    row-gap: 8px;

    > li > a,
    > li > button {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--link-cl-black, $link-cl-black);
      stroke: var(--link-cl-black, $link-cl-black);
      fill: none;
      font-family: getInter(Medium);
      font-size: 14px;
      line-height: 1.2;
      letter-spacing: -0.2px;
    }

    > li:last-child {
      padding: 8px;
    }

    > li:nth-child(2) a {
      stroke: none;
      fill: var(--link-cl-black, $link-cl-black);

      &.router-link-active {
        fill: $link-cl-active;
      }
    }

    a {
      padding: 8px;
      border-radius: 6px;
    }

    & a.router-link-active {
      stroke: $link-cl-active;
      background-color: var(--link-cl-aside-bg-active, $link-cl-aside-bg-active);
      background-repeat: no-repeat;
      background-image: var(--arrow-img, $arrow-img);
      background-origin: padding-box;
      background-position: right center;
      opacity: 1;
      transition: opacity 250ms;
    }
  }

  .el-divider {
    margin: 0;
    border-color: var(--bor-cl-base, $bor-cl-base);
  }

  button {
    border: none;
    background-color: unset;
    padding: 0;

    @media (hover: hover) {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
