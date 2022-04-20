<template>
  <el-main class="section-container">
    <el-tooltip placement="top">
      <el-button type="primary" plain size="small" @click="userType = 0 , isOpenDrawer = true, userForm = $options.data().userForm">
        <svg-icon icon-class="user_add" />
      </el-button>
      <template slot="content">添加用户</template>
    </el-tooltip>
    <el-table class="mt-20" :data="userList" highlight-current-row @current-change="handleCurrentChange">
      <el-table-column label="序号" prop="" width="80">
        <template slot-scope="scope">{{ scope.$index + 1 + (pages.current_page - 1) * pages.page_size }}</template>
      </el-table-column>
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="昵称" prop="nickname" />
      <el-table-column label="手机号" prop="mobile" />
      <el-table-column label="邮箱" prop="email" />
      <el-table-column label="加入时间" prop="created_at" />
      <el-table-column label="操作" prop="">
        <template slot-scope="scope">
          <el-tooltip placement="top" class="mr-10">
            <el-button size="mini" @click="editUser(scope.row)">
              <i class="el-icon-edit" />
            </el-button>
            <template slot="content">编辑</template>
          </el-tooltip>
          <el-popconfirm placement="top" width="160" title="确定删除记录吗？" confirm-button-text="删除" cancel-button-text="取消" confirm-button-type="danger" cancel-button-type="text" hide-icon @confirm="delUser(scope.row)">
            <template slot="reference">
              <div class="inlineBlock">
                <el-tooltip placement="top">
                  <el-button type="danger" size="mini">
                    <i class="el-icon-delete" />
                  </el-button>
                  <template slot="content">删除</template>
                </el-tooltip>
              </div>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <pagination class="ta-r" :total="pages.total" :page="pages.current_page" :limit="pages.page_size" @pagination="getUserList" />

    <!-- 抽屉 -->
    <el-drawer :title="userType ? '编辑用户' : '添加用户'" :visible.sync="isOpenDrawer" direction="rtl" size="30%" :before-close="handleDrawerClose" :destroy-on-close="true" :show-close="true" :wrapper-closable="true">
      <div class="drawer-container">
        <el-form ref="userForm" :model="userForm" label-width="80px" :inline="false" size="normal">
          <el-form-item label="用户名">
            <el-input v-model="userForm.username" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="userForm.nickname" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="userForm.mobile" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userForm.email" />
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="userForm.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userForm.password" />
          </el-form-item>
          <el-form-item label="角色绑定">
            <el-input v-model="userForm.roles" />
          </el-form-item>
          <el-form-item>
            <el-button>取消</el-button>
            <el-button v-if="userType === 1" type="primary" @click="onEdit">立即修改</el-button>
            <el-button v-if="userType === 0" type="primary" @click="onNew">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </el-main>
</template>

<script>
import { getUserList } from '@/api/account'
export default {
  data() {
    return {
      userList: [],
      pages: {},
      currentRow: null,
      userType: 0, // 0 新增 1 编辑
      isOpenDrawer: false,
      userForm: {
        username: '',
        nickname: '',
        mobile: '',
        email: '',
        password: '',
        roles: ''
      },
      visible: false
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const res = await getUserList()
      if (res.code === 200) {
        this.userList = res.data.list || []
        this.pages = res.data.pages || {}
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    handleDrawerClose(done) {
      done()
    },
    editUser(row) {
      this.userForm = row
      this.userType = 1
      this.isOpenDrawer = true
    },
    delUser(row) {

    },
    onEdit() {

    },
    onNew() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
