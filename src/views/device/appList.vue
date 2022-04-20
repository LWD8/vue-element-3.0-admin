<template>
  <el-main>
    <el-tooltip placement="top">
      <el-button type="primary" plain size="small" @click="userType = 0 , appForm = $options.data().appForm">
        <svg-icon icon-class="icon-add-app" />
      </el-button>
      <template slot="content">添加账号</template>
    </el-tooltip>
    <el-table class="mt-20" :data="appList" highlight-current-row @current-change="handleCurrentChange">
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">{{ scope.$index + 1 + (pages.current_page - 1) * pages.page_size }}</template>
      </el-table-column>
      <el-table-column label="用户ID" prop="user_id" />
      <el-table-column label="硬件编号" prop="hard_ware" />
      <el-table-column label="APPID" prop="app_id" />
      <el-table-column label="账户" prop="account" />
      <el-table-column label="上次登录" prop="login_time" />
      <el-table-column label="操作" prop="">
        <template slot-scope="scope">
          <el-tooltip placement="top" class="mr-10">
            <el-button size="mini" @click="editApp(scope.row)">
              <i class="el-icon-edit" />
            </el-button>
            <template slot="content">编辑</template>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination class="ta-r" :total="+pages.total" :page="pages.current_page" :limit="pages.page_size" @pagination="getAppList" />
  </el-main>
</template>

<script>
import { appList } from '@/api/device'
export default {
  data() {
    return {
      appList: [],
      appType: 0, // 0 新增， 1 编辑
      appForm: {},
      pages: {},
      currentRow: null
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.getAppList()
  },
  methods: {
    async getAppList() {
      const res = await appList()
      if (res.code === 200) {
        this.appList = res.data.list || []
        this.pages = res.data.pages || {}
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
