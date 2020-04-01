<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      
      >
      <span>是否删除文章？</span>
      <span slot="footer" class="dialog-footer">
        <el-button >取 消</el-button>
        <el-button type="danger" @click="del">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // props: ['dialogVisible'],
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    del() {
      
    }
  },
}
</script>
