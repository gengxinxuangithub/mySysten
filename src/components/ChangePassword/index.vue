<template>
  <el-dialog
    title="修改密码"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :show-close="false"
    append-to-body
    width="30%"
  >
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="ruleForm.oldPassword" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="ruleForm.newPassword" />
      </el-form-item>
      <el-form-item label="确认密码" prop="doubleCheckPassword">
        <el-input v-model="ruleForm.doubleCheckPassword" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="ok('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    passwordVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateOldPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const doubleCheckNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        doubleCheckPassword: ''
      },
      rules: {
        oldPassword: [{ validator: validateOldPassword, required: true, trigger: 'blur' }],
        newPassword: [{ validator: validateNewPassword, required: true, trigger: 'blur' }],
        doubleCheckPassword: [{ validator: doubleCheckNewPassword, required: true, trigger: 'blur' }]
      },
      visible: false
    }
  },
  watch: {
    passwordVisible: {
      handler(n, o) {
        this.visible = n
      },
      immediate: true
    }
  },
  methods: {
    cancel(formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:passwordVisible', false)
    },
    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formName].resetFields()
          this.$emit('update:passwordVisible', false)
        } else {
          this.$message.error('修改密码失败')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
