<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>{{message}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="no">取 消</el-button>
        <el-button type="danger" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisible", "message"],
  methods: {
    no() {
      this.$emit('no')
    },
    ok() {
      this.$emit('ok')
    }
  },
}
</script>

<style>
 .el-dialog__headerbtn {
   display: none !important;
 }
</style>

