<template>
  <el-main>
    <el-row>
      <el-card class="form">
        <el-form ref="form" :model="form">
            <h2>Login</h2>
            <p>Please login before proceeding</p>
            <el-form-item label="Auth Token">
                <el-input v-model="form.authToken"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addToken">Add Token</el-button>
            </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </el-main>
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
      console.log('adding ' + this.form.authToken)
      console.log('previously is ' + localStorage.getItem('token'))
      this.$store.dispatch('login', { authToken: this.form.authToken })
        .then(() => {
          console.log('added ' + localStorage.getItem('token'))
          this.$router.push('/')
        })
    }
  }
}
</script>
