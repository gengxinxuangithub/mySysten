<template>
  <div class="main">
    <div class="top">
      <div ref="userEchart"></div>
      <div ref="departmentEchart"></div>
    </div>
    <div ref="usageRecordEchart" class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.drawUser()
    this.drawDepartment()
    this.drawUsageRecord()
    window.onresize = () => {
      //调用methods中的事件
      const userEchart = this.$echarts.init(this.$refs.userEchart)
      userEchart.resize()

      const departmentEchart = this.$echarts.init(this.$refs.departmentEchart)
      departmentEchart.resize()

      const usageRecordEchart = this.$echarts.init(this.$refs.usageRecordEchart)
      usageRecordEchart.resize()
    }
  },
  destroyed() {},
  methods: {
    drawUser() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(this.$refs.userEchart)
      // 绘制图表
      myChart.setOption({
        title: { text: '活跃用户分析（近一周）' },
        tooltip: {},
        xAxis: {
          data: ['2020-09-01', '2020-09-02', '2020-09-03', '2020-09-04', '2020-09-05', '2020-09-06', '2020-09-07']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'line',
            data: [5, 20, 26, 10, 10, 20, 30, 18]
          }
        ]
      })
    },
    drawDepartment() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(this.$refs.departmentEchart)
      // 绘制图表
      myChart.setOption({
        title: { text: '活跃部门分析（近一周）' },
        tooltip: {},
        xAxis: {
          data: ['政治部', '治安科', '110', '技侦科', '特勤处', '交通部']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    },
    drawUsageRecord() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(this.$refs.usageRecordEchart)
      // 绘制图表
      myChart.setOption({
        title: { text: '应用使用统计（近一周）' },
        tooltip: {},
        xAxis: {
          data: ['音视频通信', '会议管理', '视频控制', '短信控制', '微群', '350M电台', '4G图传']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 40]
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  .top {
    display: flex;
    div {
      width: 50%;
      height: 45vh;
    }
  }
  .bottom {
    width: 100%;
    height: 50vh;
  }
}
</style>
