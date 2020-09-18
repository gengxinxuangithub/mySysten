<template>
  <div class="main">
    <el-row class="search">
      <el-col :span="2">组件名称</el-col>
      <el-col :span="3">
        <el-input v-model="component" clearable @clear="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="rest">重置</el-button>
      </el-col>
      <el-col :span="16">
        <el-button type="primary" @click="handleClick('', 'regist')">注册</el-button>
      </el-col>
    </el-row>
    <div class="allTable">
      <el-table :data="tableData" height="79vh" border style="width: 100%" class="nowTable">
        <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
        <el-table-column prop="policeCode" label="模板编号" align="center"> </el-table-column>
        <el-table-column prop="name" label="模板名称" align="center"> </el-table-column>
        <el-table-column prop="phone" label="模板描述" align="center" width="350"> </el-table-column>
        <el-table-column prop="orgName" label="注册时间" align="center"> </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <span class="add" @click="handleClick(scope.row, 'look')">查看</span>
            <span class="edit" @click="handleClick(scope.row, 'edit')">编辑</span>
            <span slot="reference" class="delete" @click="handleClick(scope.row, 'cancel')">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination :page-size="size" layout="total, prev, pager, next" :total="total" @current-change="currentPage">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="`${title}组件`" :visible.sync="dialogVisible" width="34%">
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" :disabled="title === '查看'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="模板编号" prop="policeCode">
                <el-input v-model="form.policeCode" :label="form.policeCode" :value="form.id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="模板名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="模板描述" prop="orgName">
                <el-input v-model="form.orgName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="调用地址" prop="address">
                <el-input v-if="title === '查看'" v-model="form.address"></el-input>
                <el-select v-else v-model="form.address" placeholder="请选择">
                  <el-option label="区域一" value="地址"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="创建时间" prop="date">
                <el-input v-if="title === '查看'" v-model="form.date"></el-input>
                <el-date-picker
                  v-else
                  v-model="form.date1"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span v-if="title === '注册' || title === '编辑'" slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="确定要删除吗？" :visible.sync="centerDialogVisible" width="20%" center>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser()">确 定</el-button>
      </span>
    </el-dialog>
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
      tableData: [
        {
          policeCode: 'aa',
          name: 'aa',
          phone: 'aa',
          orgName: 'aa'
        },
        {
          policeCode: 'aa',
          name: 'aa',
          phone: 'aa',
          orgName: 'aa'
        }
      ],
      form: {
        name: '22'
      },
      size: 10,
      total: 0,
      page: 1,
      component: '',
      rows: '',
      title: '查看',
      dialogVisible: false,
      centerDialogVisible: false,
      rules: {
        name: [{ required: true, message: '模板名称不能为空' }],
        policeCode: [{ required: true, message: '模板编号不能为空', trigger: 'focus' }],
        address: [{ required: true, message: '地址不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    handleClick(item, type) {
      if (type === 'regist') {
        this.title = '注册'
        this.form = {}
        this.dialogVisible = true
      } else if (type === 'edit') {
        this.title = '编辑'
        this.form = item
        this.dialogVisible = true
      } else if (type === 'look') {
        this.title = '查看'
        this.form = item
        this.dialogVisible = true
      } else if (type === 'cancel') {
        this.centerDialogVisible = true
        this.rows = item
      }
    },
    search() {},
    rest() {
      this.component = ''
      this.page = 1
    },
    currentPage(val) {
      this.page = val
    },
    submitForm() {
      if (this.title === '注册') {
        console.log('注册')
      } else {
        console.log('编辑')
      }
      this.dialogVisible = false
    },
    cancelForm() {
      this.dialogVisible = false
      this.form = {}
    },
    deleteUser(value) {
      this.centerDialogVisible = false
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
::v-deep .el-col-16 {
  text-align: right;
  padding-right: 10px;
}
::v-deep .el-table {
  font-size: 15px;
}
::v-deep .el-dialog {
  border-radius: 8px;
}
::v-deep .el-dialog__body {
  padding: 11px 20px;
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
::v-deep .el-dialog__body {
  padding: 23px 20px;
}
</style>
