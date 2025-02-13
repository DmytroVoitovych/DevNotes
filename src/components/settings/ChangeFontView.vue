<template>
  <el-form-item label="Resources">
    <el-radio-group v-model="mode">
      <el-radio border value="Sponsor">Font</el-radio>
      <el-radio border value="Venue">Venue</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary">Apply</el-button>
  </el-form-item>
</template>
