<template>
  <div class="main">
    <el-row class="search">
      <el-col :span="2">操作时间</el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button @click="search">搜索</el-button>
        <el-button @click="rest">重置</el-button>
      </el-col>
    </el-row>
    <div class="allTable">
      <div ref="deviceChart" class="device deviceChart"></div>
      <div class="device deviceTable">
        <el-table :data="tableData" height="79vh" border style="width: 100%" class="nowTable">
          <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
          <el-table-column prop="date" label="设备名称" align="center"> </el-table-column>
          <el-table-column prop="name" label="启动次数" align="center"> </el-table-column>
          <el-table-column prop="address" label="设备数量" align="center"> </el-table-column>
        </el-table>
        <div class="footer">
          <el-pagination :page-size="size" layout="prev, pager, next" :total="total" @current-page="currentPage">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      date: [],
      tableData: [{}, {}, {}],
      page: 1,
      size: 10,
      total: 0
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getDeviceLsit()
  },
  mounted() {
    this.initDeviceChart()
    window.onresize = () => {
      //调用methods中的事件
      const myChart = this.$echarts.init(this.$refs.deviceChart)
      myChart.resize()
    }
  },
  destroyed() {},
  methods: {
    search() {},
    currentPage(val) {
      this.page = val
    },
    getDeviceLsit() {},
    rest() {
      this.date = []
    },
    initDeviceChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(this.$refs.deviceChart)
      // 绘制图表
      myChart.setOption({
        title: {
          text: '终端设备使用统计',
          left: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [100, 300],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 10, name: 'rose1' },
              { value: 5, name: 'rose2' },
              { value: 15, name: 'rose3' },
              { value: 25, name: 'rose4' },
              { value: 20, name: 'rose5' },
              { value: 35, name: 'rose6' },
              { value: 30, name: 'rose7' },
              { value: 40, name: 'rose8' }
            ]
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.allTable {
  display: flex;
  height: 100%;
  .device {
    width: 50%;
    height: 90%;
  }
}
</style>
