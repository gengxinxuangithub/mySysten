<template>
  <div class="main">
    <el-row class="search">
      <el-col :span="2">组织名称</el-col>
      <el-col :span="4">
        <el-input v-model="search" clearable @clear="getOrganizeList"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="getOrgByName">搜索</el-button>
        <el-button size="medium" type="primary" @click="handleAdd(ADD_WINDOW)">新增</el-button>
        <el-button @click="reset">重置</el-button>
      </el-col>
    </el-row>
    <div class="allTable">
      <el-table
        :data="tableData"
        height="84vh"
        border
        style="width: 100%"
        class="nowTable"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="组织名称" align="center"> </el-table-column>
        <el-table-column prop="code" label="代码编号" align="center"> </el-table-column>
        <el-table-column prop="concatPhone" label="电话号码" align="center"> </el-table-column>
        <el-table-column prop="sort" label="排序" align="center"> </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope" class="operate-button">
            <el-button type="text" style="color: #70b603" @click="handleClick(scope.row, CHECK_WINDOW)">查看</el-button>
            <el-button type="text" class="edit" @click="handleClick(scope.row, EDIT_WINDOW)">编辑</el-button>
            <el-button type="text" class="cancel" @click="isHasChildren(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <add-edit-check
      v-if="flag"
      :data="data"
      :superior="superior"
      :flag="flag"
      :operate-type="operateType"
      @close="close"
      @getOrganizeList="getOrganizeList"
    />
    <el-dialog :visible.sync="centerDialogVisible" width="18%" :append-to-body="true">
      <span class="isCancel">确认要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="deleteRow()">删 除</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="centerDialogVisible1" width="18%" :append-to-body="true">
      <span class="isCancel">请先删除子目录</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddEditCheck from './add-edit-check/index'
import { getOrganizeTree, deleteOrganizeMessage, getOrganizeByName } from '@/api/allRequest.js'
const ADD_WINDOW = 'add'
const CHECK_WINDOW = 'look'
const EDIT_WINDOW = 'edit'
const CANCEL_WINDOW = 'cancel'
export default {
  components: {
    AddEditCheck
  },
  mixins: [],
  props: {},
  data() {
    return {
      centerDialogVisible: false,
      centerDialogVisible1: false,
      data: {},
      rows: {},
      total: 10,
      size: 10,
      page: 1,
      superior: [],
      tableData: [],
      search: '',
      flag: false,
      operateType: ADD_WINDOW,
      ADD_WINDOW,
      CHECK_WINDOW,
      EDIT_WINDOW,
      CANCEL_WINDOW
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getOrganizeList()
  },
  mounted() {},
  destroyed() {},
  methods: {
    handleClick(values, status) {
      this.flag = !this.flag
      this.data = values
      this.operateType = status
    },
    //新增
    handleAdd(status) {
      this.flag = !this.flag
      this.operateType = status
    },
    //删除行
    deleteRow() {
      deleteOrganizeMessage({
        ids: this.rows.id
      }).then(res => {
        if (res.code === 200) {
          this.$message('删除成功')
          this.getOrganizeList()
          this.centerDialogVisible = false
        } else {
          this.$message('删除失败')
        }
      })
    },
    close(value) {
      this.flag = value
    },
    isHasChildren(data) {
      this.rows = data
      if (!data.children) {
        return (this.centerDialogVisible = true)
      } else {
        return (this.centerDialogVisible1 = true), (this.centerDialogVisible = false)
      }
    },
    async getOrganizeList() {
      const data = await getOrganizeTree()
      this.tableData = data.data
      this.superior = data.data
    },
    getOrgByName() {
      getOrganizeByName({
        name: this.search
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        } else {
          this.$message('查询失败')
        }
      })
    },
    reset() {
      this.search = ''
      this.getOrganizeList()
    }
  }
}
</script>
<style lang="scss" scoped>
.allTable {
  height: 100%;
}
.nowTable {
  font-size: 15px;
}
::v-deep .el-dialog__body {
  text-align: center;
}
::v-deep .el-button--text {
  font-size: 15px;
}
::v-deep .cancel {
  margin-left: 30px;
  color: red;
}
::v-deep .el-button + .el-button {
  margin-left: 30px;
}
::v-deep .el-dialog__footer {
  text-align: center;
}
::v-deep .el-select {
  width: 100%;
}
</style>
