<template>
  <div class="main">
    <el-row class="search">
      <el-col :span="1">IP</el-col>
      <el-col :span="4">
        <el-input v-model="IP" clearable @clear="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="1">SIP账号</el-col>
      <el-col :span="4">
        <el-input v-model="SIP" clearable @clear="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="rest">重置</el-button>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="10" class="rightBtn">
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
        <el-button type="primary">一键限制</el-button>
        <el-button type="primary">一键授权</el-button>
      </el-col>
    </el-row>
    <div class="allTable">
      <el-table :data="tableData" height="79vh" border style="width: 100%" class="nowTable">
        <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
        <el-table-column prop="roleNo" label="IP地址" align="center"> </el-table-column>
        <el-table-column prop="name" label="SIP账号" align="center"> </el-table-column>
        <el-table-column prop="roleDesc" label="设备类型" align="center"> </el-table-column>
        <el-table-column prop="status" label="当前状态" align="center"> </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center"> </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-popover v-model="scope.row.visible1" placement="top" width="160">
              <p>确定授权吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.visible1 = false">取消</el-button>
                <el-button type="primary" size="mini" @click="handleClick(scope.row, 'grantAuthorization')">确定</el-button>
              </div>
              <span slot="reference" class="look">授权</span>
            </el-popover>
            <el-popover v-model="scope.row.visible2" placement="top" width="160">
              <p>确定限制授权吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.visible2 = false">取消</el-button>
                <el-button type="primary" size="mini" @click="handleClick(scope.row, 'limit')">确定</el-button>
              </div>
              <span slot="reference" class="edit">限制</span>
            </el-popover>
            <el-popover v-model="scope.row.visible3" placement="top" width="160">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.visible3 = false">取消</el-button>
                <el-button type="primary" size="mini" @click="handleClick(scope.row, 'delete')">确定</el-button>
              </div>
              <span slot="reference" class="delete">删除</span>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination :page-size="size" layout="total,prev, pager, next" :total="total" @current-change="currentPage">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="`${title}IP授权`" width="28%" :visible.sync="dialogVisible">
      <div>
        <el-form ref="form" :model="form" label-width="80px" :disabled="title === '查看'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="IP地址">
                <el-input v-model="form.roleNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="SIP账号">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="设备类型">
                <el-input v-model="form.roleDesc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="当前状态">
                <el-input v-model="form.sort"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span v-if="title === '新增' || title === '编辑'" slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as login from '@/api/login'
export default {
  name: 'RoleManagement',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      IP: '',
      SIP: '',
      tableData: [],
      dialogVisible: false,
      form: {
        roleNo: '',
        name: '',
        roleDesc: '',
        sort: ''
      },
      roleEditTable: [],
      title: '新增',
      total: 0,
      size: 10,
      page: 1,
      rules: {}
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
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.title === '新增') {
            login.roleUpdate(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success('添加角色成功')
                this.dialogVisible = false
                this.getRoleList()
              } else {
                this.$message.warning('添加角色失败')
              }
              this.dialogVisible = false
            })
          } else {
            login.roleUpdate(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success('编辑角色成功')
                this.dialogVisible = false
                this.getRoleList()
              } else {
                this.$message.warning('编辑角色失败')
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    currentPage(val) {
      this.page = val
      this.getRoleList()
    },
    getRoleList() {
      const parmas = {
        size: this.size,
        start: this.page,
        name: ''
      }
      login.roleList(parmas).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      })
    },
    handleClick(item, type) {
      if (type === 'add') {
        this.title = '新增'
        this.form = {
          roleNo: '',
          name: '',
          roleDesc: '',
          sort: ''
        }
        this.dialogVisible = true
      } else if (type === 'edit') {
        this.title = '编辑'
        this.form = item
        this.dialogVisible = true
      } else if (type === 'look') {
        this.title = '查看'
        this.form = item
        this.dialogVisible = true
      } else if (type === 'delete') {
        const obj = {
          ids: item.id
        }
        login.deleteRole(obj).then(res => {
          if (res.code === 200) {
            this.getRoleList()
            this.$message.success('删除角色成功')
          } else {
            this.$message.warning('删除角色失败')
          }
        })
      }
    },
    search() {
      this.page = 1
      this.getRoleList()
    },
    rest() {
      this.page = 1
      this.getRoleList()
    }
  }
}
</script>
<style lang="scss" scoped>
.new-add {
  margin-bottom: 10px;
}
.allTable {
  .look {
    cursor: pointer;
    color: #70b603;
  }
  .edit {
    padding: 0 20px;
    cursor: pointer;
    color: #3478f6;
  }
}
.delete {
  cursor: pointer;
  color: #d9001b;
}
::v-deep .el-form-item__label {
  text-align: left;
}
::v-deep .el-table {
  font-size: 15px;
}
.rightBtn {
  text-align: right;
  padding-right: 15px;
}
</style>
