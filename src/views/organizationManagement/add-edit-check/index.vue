<template>
  <el-form class="add-edit-check">
    <el-row class="message-edit">
      <el-col :span="23" class="message-edit-title">{{ operateType | operateTile }}组织信息</el-col>
      <el-col :span="1" class="message-edit-cancel" @click.native="close">×</el-col>
    </el-row>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
      :disabled="operateType === 'look'"
    >
      <el-form-item label="组织名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="组织简称" prop="shortName">
        <el-input v-model="ruleForm.shortName"></el-input>
      </el-form-item>
      <el-form-item label="组织编号" prop="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item label="上级单位" prop="regionPid">
        <el-cascader
          ref="cascaderHandle"
          v-model="ruleForm.regionPid"
          :options="options"
          :props="{ expandTrigger: 'hover', label: 'name', value: 'id', checkStrictly: true }"
          :show-all-levels="false"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="电话" prop="concatPhone">
        <el-input v-model="ruleForm.concatPhone"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')" @click.native="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-form>
</template>
<script>
import { updataOrganizeMessage, addOrganizeMessage } from '@/api/allRequest.js'
export default {
  filters: {
    operateTile(val) {
      if (val === 'edit') {
        return '编辑'
      } else if (val === 'add') {
        return '新增'
      } else {
        return '查看'
      }
    }
  },
  props: {
    operateType: {
      type: String,
      default() {
        return 'cancel'
      }
    },
    flag: {
      type: Boolean,
      default() {
        return false
      }
    },
    data: {
      type: Object,
      default: () => {}
    },
    superior: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        shortName: '',
        code: '',
        regionPid: '',
        concatPhone: '',
        sort: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
        ],
        shortName: [
          { required: true, message: '请输入组织简称', trigger: 'change' },
          { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入组织编号', trigger: 'change' },
          { min: 13, max: 13, message: '编号必须十三位' }
        ],
        regionPid: [{ required: true, message: '请选择上级单位', trigger: 'change' }]
      },
      options: []
    }
  },
  created() {
    this.getRuleFormData()
  },

  mounted() {
    this.fatherCode()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          formName = this.ruleForm
          if (this.operateType === 'edit') {
            updataOrganizeMessage(formName).then(res => {
              if (res.code === 200) {
                this.$emit('getOrganizeList')
                this.$message('更新成功')
                this.close()
              } else {
                this.$message('更新失败')
              }
            })
          } else if (this.operateType === 'add') {
            addOrganizeMessage(formName).then(res => {
              if (res.code === 200) {
                this.$emit('getOrganizeList')
                this.$message('添加成功')
                this.close()
              } else {
                this.$message('添加失败')
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    close() {
      this.$emit('close', false)
    },
    getRuleFormData() {
      if (this.operateType === 'add') {
        this.ruleForm = {}
      } else {
        this.ruleForm = this.data
      }
    },
    handleChange(value) {
      const a = value[value.length - 1]
      this.ruleForm.regionPid = a
      this.$refs.cascaderHandle.dropDownVisible = false
    },
    fatherCode() {
      this.options = this.superior
    }
  }
}
</script>
<style lang="scss" scoped>
.add-edit-check {
  position: absolute;
  top: 15%;
  left: 35%;
  border: 1px solid #d7d7d7;
  border-radius: 2%;
  padding: 20px 30px;
  background-color: white;

  //修改表单间距
  ::v-deep .el-form {
    width: 400px;
  }
  ::v-deep .el-form-item {
    margin-bottom: 15px;
  }
  ::v-deep .el-form-item__label {
    text-align: left;
  }

  ::v-deep .el-form-item__content {
    margin-left: 0px;
    text-align: center;
  }
  ::v-deep .el-button + .el-button {
    margin-left: 67px;
  }

  //修改表单样式
  ::v-deep .el-input__inner {
    height: 32px;
    border-radius: 0px;
  }
}
.message-edit {
  vertical-align: middle;
  line-height: 18px;
  margin-bottom: 20px;
  &-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
  }
  &-cancel {
    font-size: 26px;
    color: #606266;
    cursor: pointer;
    font-family: '楷体';
  }
}
::v-deep .el-cascader {
  width: 100%;
}
</style>
