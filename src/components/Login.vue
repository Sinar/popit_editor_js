<template>
    <el-card class="form">
        <el-form ref="form" :model="form">
            <el-form-item label="Auth Token">
                <el-input v-model="form.authToken"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addToken">Add Token</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
export default {
  data () {
    return {
      form: {
        authToken: ''
      }
    }
  },
  methods: {
    addToken () {
      console.log(this.form.authToken)
    }
  }
}
</script>
