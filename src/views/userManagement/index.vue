<template>
  <div class="main">
    <el-row class="search">
      <el-col :span="1">姓 名</el-col>
      <el-col :span="3">
        <el-input v-model="organization" clearable @clear="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="2">所在单位</el-col>
      <el-col :span="3">
        <el-input v-model="name" clearable @clear="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button size="medium" type="primary" @click="handleClick('', 'add')">新增</el-button>
        <el-button @click="rest">重置</el-button>
      </el-col>
    </el-row>
    <div class="allTable">
      <el-table :data="tableData" height="79vh" border style="width: 100%" class="nowTable">
        <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
        <el-table-column prop="policeCode" label="用户编号" align="center"> </el-table-column>
        <el-table-column prop="name" label="用户姓名" align="center"> </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"> </el-table-column>
        <el-table-column prop="orgName" label="所在单位" align="center"> </el-table-column>
        <el-table-column prop="positionName" label="职务" align="center"> </el-table-column>
        <el-table-column prop="roleName" label="角色" align="center"> </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <span class="add" @click="handleClick(scope.row, 'look')">查看</span>
            <span class="edit" @click="handleClick(scope.row, 'edit')">编辑</span>
            <el-popover v-model="scope.row.visible" placement="top" width="160">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteUser(scope.row)">确定</el-button>
              </div>
              <span slot="reference" class="delete">删除</span>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination :page-size="size" layout="total, prev, pager, next" :total="total" @current-change="currentPage">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="`${title}用户`" :visible.sync="dialogVisible" width="34%">
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" :disabled="title === '查看'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="用户编号" prop="policeCode">
                <el-input v-model="form.policeCode" :label="form.policeCode" :value="form.id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="用户姓名" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="所在部门" prop="orgName">
                <el-input v-if="title === '查看'" v-model="form.orgName"></el-input>
                <el-select v-else v-model="form.orgId" placeholder="请选择所在部门">
                  <el-option v-for="item in orgName" :key="item.index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="职务" prop="mainDuty">
                <el-input v-if="title === '查看'" v-model="form.positionName"></el-input>
                <el-select v-else v-model="form.positionName" placeholder="请选择职务">
                  <el-option
                    v-for="item in tableData"
                    :key="item.index"
                    :label="item.positionName"
                    :value="item.positionName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="角色" prop="rolName">
                <el-input v-if="title === '查看'" v-model="form.roleName"></el-input>
                <el-select v-else v-model="form.roleName" placeholder="请选择角色">
                  <el-option v-for="item in roles" :key="item.index" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="手机" prop="phone">
                <el-input v-model="form.pnhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="排序" prop="sort">
                <el-input v-model.number="form.sort"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span v-if="title === '新增' || title === '编辑'" slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userList, addUserMsg, listAll, editUserMsg, deleteUserMsg, getUserMsg, roleLists } from '@/api/allRequest.js'
export default {
  name: '',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      name: '',
      organization: '',
      dialogVisible: false,
      tableData: [{}, {}],
      orgName: [],
      roles: [],
      total: 0,
      page: 1,
      size: 14,
      title: '新增',
      form: {
        delete: 0
      },
      rules: {
        policeCode: [{ required: true, message: '用户编号不能为空', trigger: 'focus' }],
        name: [{ required: true, message: '姓名不能为空' }],
        phone: [
          { required: true, message: '手机号不能为空' },
          { type: 'number', message: '手机号必须是数字值' }
        ],
        sort: [
          { required: true, message: '排序不能为空' },
          { type: 'number', message: '排序必须是数字值' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getUserList()
    this.getOrgName()
    this.getRoleList()
  },
  mounted() {},
  destroyed() {},
  methods: {
    handleClick(item, type) {
      if (type === 'add') {
        this.title = '新增'
        this.form = {}
      } else if (type === 'edit') {
        this.title = '编辑'
        this.form = item
      } else if (type === 'look') {
        this.title = '查看'
        this.form = item
      }
      this.dialogVisible = true
    },
    search() {
      getUserMsg(this.search).then(res => {
        if (res.code === 200) {
          console.log(this.res.code)
        }
      })
    },
    rest() {
      this.organization = ''
      this.name = ''
      this.page = 1
      this.getUserList()
    },
    currentPage(val) {
      this.page = val
      this.getUserList()
    },
    submitForm() {
      if (this.title === '新增') {
        addUserMsg(this.form).then(res => {
          if (res.code === 200) {
            this.getUserList()
            this.$message('增加成功')
            this.dialogVisible = false
          } else {
            this.$message('增加失败')
          }
        })
      } else {
        editUserMsg(this.form).then(res => {
          if (res.code === 200) {
            this.getUserList()
            this.$message('修改成功')
            this.dialogVisible = false
          } else {
            this.$message('修改失败')
          }
        })
      }
    },
    getUserList() {
      const obj = {
        size: this.size,
        start: this.page
      }
      userList(obj).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
        } else {
          this.$message('获取所有用户信息失败')
        }
      })
    },
    getOrgName() {
      const obj = {
        size: this.size,
        start: this.page
      }
      listAll(obj).then(res => {
        if (res.code === 200) {
          this.orgName = res.data
        } else {
          this.$message('获取信息失败')
        }
      })
    },
    deleteUser(value) {
      deleteUserMsg({ ids: value.id }).then(res => {
        if (res.code === 200) {
          this.getUserList()
          this.$message('删除成功')
          value.visible = false
        } else {
          this.$message('删除失败')
        }
      })
    },
    cancelForm() {
      if (this.title === '新增') {
        this.dialogVisible = false
        this.form = {}
      } else {
        this.dialogVisible = false
        this.form = {}
      }
    },
    getRoleList() {
      const obj = {
        size: 100,
        start: 1
      }
      roleLists(obj).then(res => {
        if (res.code === 200) {
          this.roles = res.data.records
        } else {
          this.$message('角色列表查询失败')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.allTable {
  .add {
    cursor: pointer;
    color: #70b603;
    font-size: 15px;
  }
  .edit {
    padding: 0 30px;
    cursor: pointer;
    color: #3478f6;
    font-size: 15px;
  }
}
.delete {
  cursor: pointer;
  color: #d9001b;
  font-size: 15px;
}
::v-deep .el-table {
  font-size: 15px;
}
::v-deep .el-dialog {
  border-radius: 8px;
}
::v-deep .el-input__inner {
  border-radius: 0;
}
::v-deep .el-form-item__label {
  text-align: left;
}
::v-deep .el-dialog__footer {
  text-align: center;
  button:first-child {
    margin-right: 70px;
  }
}
::v-deep .el-select {
  width: 100%;
}
::v-deep .el-input__icon {
  width: 58px;
}
::v-deep .el-input__icon {
  width: 26px;
}
</style>
