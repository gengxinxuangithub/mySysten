<template>
  <div class="main">
    <el-row class="search">
      <el-col :span="2">操作时间</el-col>
      <el-col :span="6">
        <el-date-picker v-model="time" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button @click="serch">搜索</el-button>
        <el-button @click="rest">重置</el-button>
      </el-col>
    </el-row>
    <div class="allTable">
      <el-table :data="tableData" height="79vh" border style="width: 100%" class="nowTable">
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="personName" label="姓名" align="center"> </el-table-column>
        <el-table-column prop="accountName" label="登录账号" align="center"> </el-table-column>
        <el-table-column prop="content" label="接口服务类" align="center"> </el-table-column>
        <el-table-column prop="operation" label="接口服务方法" align="center"> </el-table-column>
        <el-table-column label="操作时间" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.operateTime) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination :page-size="size" layout="total, prev, pager, next" :total="total" @current-change="currentPage">
        </el-pagination>
      </div>
    </div>
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
      time: [],
      total: 0,
      size: 10,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getLogList()
  },
  mounted() {},
  destroyed() {},
  methods: {
    formatDate(value) {
      const date = new Date(value)
      const YY = date.getFullYear() + '-'
      const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      const mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      const ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return YY + MM + DD + ' ' + hh + mm + ss
    },
    currentPage(val) {
      this.page = val
      this.getLogList()
    },
    serch() {
      this.page = 1
      this.getLogList()
    },
    rest() {
      this.page = 1
      this.time = []
      this.getLogList()
    },
    getLogList() {
      const obj = {
        size: this.size,
        start: this.page,
        endDate: this.time[0] ? this.formatDate(this.time[0]) : '',
        startDate: this.time[0] ? this.formatDate(this.time[1]) : ''
      }
      login.logList(obj).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    handleClick(item) {
      const obj = {
        id: item.id
      }
      login.logDetail(obj).then(res => {
        if (res.code === 200) {
          console.log(res.data, '日志详情')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
