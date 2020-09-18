<template>
  <div class="main">
    <el-row class="search">
      <el-col :span="2">角色名称</el-col>
      <el-col :span="4">
        <el-input v-model="searchVal" clearable @clear="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="search">搜索</el-button>
        <el-button @click="rest">重置</el-button>
      </el-col>
    </el-row>
    <div class="allTable">
      <el-table :data="tableData" height="79vh" border style="width: 100%" class="nowTable">
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="roleNo" label="角色编号" align="center"> </el-table-column>
        <el-table-column prop="name" label="角色名称" align="center"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" align="center"> </el-table-column>
        <!-- <el-table-column prop="address" label="分配用户" align="center"> </el-table-column> -->
        <el-table-column prop="updateTime" label="最近设置时间" align="center"></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <span style="color: #70b603; cursor: pointer" @click="handleClick(scope.row)">设置权限</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination :page-size="size" layout="prev, pager, next" :total="total" @current-page="currentPage">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="设置功能权限" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-tree
          ref="tree"
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :check-strictly="true"
          :default-checked-keys="checkKeys"
          :props="defaultProps"
        >
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as login from '@/api/login'
export default {
  name: '',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      searchVal: '',
      tableData: [],
      treeData: [],
      dialogVisible: false,
      total: 0,
      size: 10,
      page: 1,
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      checkKeys: [],
      nowItem: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getRoleList()
  },
  mounted() {},
  destroyed() {},
  methods: {
    onSubmit() {
      const menuIds = this.$refs.tree.getCheckedKeys().join(',')
      const obj = {
        roleId: this.nowItem.id,
        ids: menuIds
      }
      login.setRoleMenus(obj).then(res => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.$message.success('角色菜单设置成功')
          this.getRoleList()
        } else {
          this.$message.warning('角色菜单设置失败')
        }
      })
    },
    //获取菜单数据列表
    getMenuList(item) {
      this.nowItem = item
      login.menuList().then(res => {
        if (res.code === 200) {
          this.treeData = res.data
          this.checkKeys = item.menuIds.split(',')
        }
      })
    },
    getRoleList() {
      const parmas = {
        size: this.size,
        start: this.page,
        name: this.searchVal
      }
      login.roleList(parmas).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      })
    },
    handleClick(item) {
      this.dialogVisible = true
      this.getMenuList(item)
    },
    rest() {
      this.searchVal = ''
      this.page = 1
      this.getRoleList()
    },
    search() {
      this.page = 1
      this.getRoleList()
    },
    currentPage(val) {
      this.page = val
      this.getRoleList()
    }
  }
}
</script>
<style lang="scss" scoped></style>
