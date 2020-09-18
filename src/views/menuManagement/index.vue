<template>
  <div class="main">
    <el-row class="search">
      <!-- <el-col :span="2">菜单名称</el-col>
      <el-col :span="4">
        <el-input v-model="searchVal" clearable @clear="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col> -->
      <el-col :span="2">
        <!-- <el-button @click="search">搜索</el-button>
        <el-button @click="rest">重置</el-button> -->
        <el-button @click="handleClick('', 'add')">新增</el-button>
      </el-col>
    </el-row>
    <div class="allTable">
      <el-table
        :data="tableData"
        height="83vh"
        border
        style="width: 100%"
        class="nowTable"
        row-key="id"
        :tree-props="{ children: 'child', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="name" label="菜单名称" align="center"> </el-table-column>
        <el-table-column prop="code" label="菜单级别" align="center"> </el-table-column>
        <el-table-column prop="clazz" label="图标" align="center"> </el-table-column>
        <el-table-column prop="path" label="链接" align="center"> </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <span class="look" @click="handleClick(scope.row, 'look')">查看</span>
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
      <!-- <div class="footer">
        <el-pagination :page-size="size" layout="prev, pager, next" :total="total" @current-page="currentPage">
        </el-pagination>
      </div> -->
    </div>
    <el-dialog :title="`${title}菜单`" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-form ref="form" :model="form" label-width="80px" :disabled="title === '查看'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="菜单编码">
                <el-input v-model="form.code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="菜单名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="菜单链接">
                <el-input v-model="form.path"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="父级节点">
                <el-input v-model="form.parent"></el-input>
              </el-form-item>
            </el-col>
            <el-col v-if="title !== '新增'" :span="24">
              <el-form-item label="节点ID">
                <el-input v-model="form.id" :disabled="title === '编辑'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="是否显示">
                <el-switch v-model="form.type"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="菜单图标">
                <el-input v-model="form.clazz"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="排序">
                <el-input v-model="form.sort"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span v-if="title !== '查看'" slot="footer" class="dialog-footer">
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
      tableData: [],
      dialogVisible: false,
      form: {
        children: [],
        clazz: '',
        code: '',
        description: '',
        id: '',
        name: '',
        path: '',
        sort: 0,
        type: 0
      },
      title: '新增',
      searchVal: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getMenuList()
  },
  mounted() {},
  destroyed() {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.type = 0
          if (this.title === '新增') {
            login.menuUpdate(this.form).then(res => {
              if (res.code === 200) {
                this.dialogVisible = false
                this.getMenuList()
                this.$message.success('添加菜单成功')
              } else {
                this.$message.warning('添加菜单失败')
              }
            })
          } else {
            login.menuUpdate(this.form).then(res => {
              if (res.code === 200) {
                this.dialogVisible = false
                this.getMenuList()
                this.$message.success('编辑菜单成功')
              } else {
                this.$message.warning('编辑菜单失败')
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    rest() {
      this.searchVal = ''
      this.page = 1
      this.getMenuList()
    },
    search() {
      this.page = 1
      this.getMenuList()
    },
    currentPage(val) {
      this.page = val
      this.getMenuList()
    },
    //获取菜单数据列表
    getMenuList() {
      login.menuList().then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
    },
    handleClick(item, type) {
      if (type === 'add') {
        this.dialogVisible = true
        this.title = '新增'
        this.form = {
          children: [],
          clazz: '',
          code: '',
          description: '',
          id: '',
          name: '',
          path: '',
          sort: null,
          type: 0
        }
      } else if (type === 'edit') {
        this.dialogVisible = true
        this.title = '编辑'
        this.form = item
      } else if (type === 'look') {
        this.dialogVisible = true
        this.title = '查看'
        this.form = item
      } else if (type === 'delete') {
        const obj = {
          ids: item.id
        }
        login.menuDelete(obj).then(res => {
          if (res.code === 200) {
            this.$message.success('菜单删除成功')
            this.getMenuList()
          } else {
            this.$message.warning('菜单删除失败')
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.look {
  cursor: pointer;
  color: #70b603;
}
.edit {
  padding: 0 20px;
  cursor: pointer;
  color: #3478f6;
}
.delete {
  cursor: pointer;
  color: #d9001b;
}
.allTable {
  padding-bottom: 10px;
}
</style>
