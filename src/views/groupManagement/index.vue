<template>
  <div class="main">
    <el-row class="search">
      <el-col :span="2">组织名称</el-col>
      <el-col :span="4">
        <el-input v-model="searchVal" clearable placeholder="请输入内容" @clear="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="rest">重置</el-button>
        <el-button @click="handleClick('', 'add')">新增</el-button>
      </el-col>
    </el-row>
    <div class="allTable">
      <el-table :data="tableData" height="79vh" border style="width: 100%" class="nowTable">
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="name" label="分组编号" align="center"> </el-table-column>
        <el-table-column prop="date" label="分组名称" align="center"> </el-table-column>
        <el-table-column prop="address" label="分组描述" align="center"> </el-table-column>
        <el-table-column prop="address" label="创建时间" align="center"> </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <span class="add" @click="handleClick(scope.row, 'look')">查看</span>
            <span class="edit" @click="handleClick(scope.row, 'edit')">编辑</span>
            <el-popover v-model="scope.row.visible" placement="top" width="160">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="handleClick(scope.row, 'delete')">确定</el-button>
              </div>
              <span slot="reference" class="delete">删除</span>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination :page-size="size" layout="prev, pager, next" :total="total" @current-page="currentPage">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="`${title}分组`" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <el-form ref="form" :model="form" label-width="75px" label-position="center" :disabled="title === '查看'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="分组编号">
                <el-input v-model="form.groupNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分组名称">
                <el-input v-model="form.groupName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="分组描述">
                <el-input v-model="form.groupDesc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="创建时间">
                <!-- <el-date-picker v-model="form.date" type="date" placeholder="选择日期"> </el-date-picker> -->
              </el-form-item>
            </el-col>
            <el-col :span="4" style="text-align: right">
              <el-button type="primary">新增</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <el-table :data="groupPersonList" border style="width: 100%" class="nowTable">
            <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
            <el-table-column prop="name" label="姓名" align="center"> </el-table-column>
            <el-table-column prop="date" label="所在部门" align="center"> </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-popover v-model="scope.row.visible" placement="top" width="160">
                  <p>确定删除吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="scope.row.visible = false">确定</el-button>
                  </div>
                  <span slot="reference" class="delete">删除</span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
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
      groupPersonList: [],
      dialogVisible: false,
      form: {
        groupDesc: '',
        groupName: '',
        groupNo: '',
        groupPersonList: []
      },
      title: '新增',
      size: 10,
      total: 0,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getGroupList()
  },
  mounted() {},
  destroyed() {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login.editGroup(this.form).then(res => {
            if (res.code === 200) {
              this.$message.success('添加分组成功')
            } else {
              this.$message.warning('添加分组失败')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    currentPage(val) {
      this.page = val
    },
    rest() {
      this.searchVal = ''
      this.page = 1
      this.getGroupList()
    },
    //搜索分组列表
    search() {
      this.getGroupList()
    },
    handleClick(item, type) {
      if (type === 'add') {
        this.title = '新增'
        this.dialogVisible = true
      } else if (type === 'edit') {
        this.title = '编辑'
        this.dialogVisible = true
      } else if (type === 'look') {
        this.title = '查看'
        this.dialogVisible = true
      } else if (type === 'delete') {
        login.deleteGroup(item).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
          } else {
            this.$message.warning('删除失败')
          }
        })
      }
      this.getGroupList()
    },
    //分页查询分组列表
    async getGroupList() {
      let params = {
        // groupName: this.searchVal,
        size: this.size,
        start: this.page
      }
      let res = await login.groupList(params)
    },
    //添加分组
    addGroup() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.allTable {
  .add {
    cursor: pointer;
    color: #70b603;
  }
  .edit {
    padding: 0 20px;
    cursor: pointer;
    color: #3478f6;
  }
}
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.delete {
  cursor: pointer;
  color: #d9001b;
}
</style>
