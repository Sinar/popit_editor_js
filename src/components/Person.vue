<template>
  <el-card class="form">
    <form-schema ref="formSchema" :schema="schema" v-model="model">
      <el-button type="primary" @click="submit">Create</el-button>
    </form-schema>
  </el-card>
</template>
<script>
import FormSchema from 'vue-json-schema'
import schema from '../schema/person_form.json'
import { HTTP } from '../http-common.js'
import { getLanguage } from '../utils.js'

FormSchema.setComponent('form', 'el-form', ({ vm }) => {
  const labelPosition = 'top'
  const labelWidth = '120px'
  const model = vm.data
  const rule = {}

  vm.fields.forEach((field) => {
    const type = field.schemaType
    const required = field.required
    const message = field.title
    const trigger = 'blur'

    rule[field.name] = { type, required, message, trigger }
  })

  return { labelWidth, rule, model, labelPosition }
})

FormSchema.setComponent('label', 'el-form-item', ({ field }) => ({
  prop: field.name
}))

FormSchema.setComponent('text', 'el-input')

export default {
  data () {
    return {
      schema: schema,
      model: {}
    }
  },
  methods: {
    submit (e) {
      var language = getLanguage()

      var url = '/' + language + '/persons/'
      var loggedIn = this.$store.state.loggedIn
      if (loggedIn) {
        this.$refs.formSchema.form().validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(this.model))
            this.$refs.formSchema.clearErrorMessage()
            HTTP.post(url, this.model)
              .then(response => {
                console.log(response)
              })
              .catch(e => {
                console.log(e.response.data)
                console.log(e.response.data.errors)
                var errData = e.response.data.errors
                for (var errorKey in errData) {
                  var errMsg = 'Error in ' + errorKey + ': ' + errData[errorKey]
                  this.$message.error(errMsg)
                }
                console.log(e)
              })
          } else {
            this.$refs.formSchema.setErrorMessage('Please Fill in the form')
            return false
          }
        })
      } else {
        this.$route.push('/login')
      }
    }
  },
  components: {
    FormSchema
  }
}
</script>
<style scoped>
  .form {
    text-align: left;
    width: 600px;
    margin: auto;
  }
  .el-form {
    text-align: left;
  }
</style>
