<template>
  <div class="main">
    <el-row class="search">
      <el-col :span="2">系统名称</el-col>
      <el-col :span="4">
        <el-input v-model="systemName" clearable @clear="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="2">登录时间</el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="loginTime"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="rest">重置</el-button>
      </el-col>
    </el-row>
    <div class="allTable">
      <el-table :data="tableData" height="79vh" border style="width: 100%" class="nowTable">
        <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
        <el-table-column prop="roleNo" label="系统名称" align="center"> </el-table-column>
        <el-table-column prop="name" label="应用地址" align="center"> </el-table-column>
        <el-table-column prop="roleDesc" label="单机登录用户" align="center"> </el-table-column>
        <el-table-column prop="status" label="单机登陆时间" align="center"> </el-table-column>
        <el-table-column prop="updateTime" label="状态" align="center"> </el-table-column>
        <el-table-column prop="updateTime" label="返回码" align="center"> </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination :page-size="size" layout="total,prev, pager, next" :total="total" @current-change="currentPage">
        </el-pagination>
      </div>
    </div>
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
      systemName: '',
      loginTime: [],
      tableData: [{}, {}, {}, {}],
      dialogVisible: false,
      total: 0,
      size: 10,
      page: 1
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
          // this.tableData = res.data.records
          // this.total = res.data.total
        }
      })
    },
    handleClick(item, type) {},
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
::v-deep .el-range-editor.el-input__inner {
  width: 100%;
}
</style>
