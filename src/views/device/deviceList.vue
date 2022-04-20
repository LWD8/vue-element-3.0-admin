<template>
  <el-main class="section-container">
    <el-tooltip placement="top">
      <el-button type="primary" plain size="small" @click="deviceType = 0, deviceForm = $options.data().deviceForm">
        <svg-icon icon-class="icon-device_add" />
      </el-button>
      <template slot="content">添加设备</template>
    </el-tooltip>
    <el-table class="mt-20" :data="deviceList" highlight-current-row @current-change="handleCurrentChange">
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">{{ scope.$index + 1 + (pages.current_page - 1) * pages.page_size }}</template>
      </el-table-column>
      <el-table-column label="编号" prop="num" />
      <el-table-column label="代理IP" prop="proxy_ip" />
      <el-table-column label="硬件码" prop="hard_ware" />
      <el-table-column label="最近登录" prop="last_time" />
      <el-table-column label="操作" prop="">
        <template slot-scope="scope">
          <el-tooltip placement="top" class="mr-10">
            <el-button size="mini" @click="editDevice(scope.row)">
              <i class="el-icon-edit" />
            </el-button>
            <template slot="content">编辑</template>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination class="ta-r" :total="+pages.total" :page="pages.current_page" :limit="pages.page_size" @pagination="getDeviceList" />
  </el-main>
</template>

<script>
import { deviceList } from '@/api/device'
export default {
  data() {
    return {
      deviceList: [],
      deviceForm: {},
      deviceType: 0, // 0 新增， 1 编辑
      pages: {},
      currentRow: null
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.getDeviceList()
  },
  methods: {
    async getDeviceList() {
      const res = await deviceList()
      if (res.code === 200) {
        this.deviceList = res.data.list || []
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
