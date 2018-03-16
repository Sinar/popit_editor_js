<template>
  <el-main>
    <el-row>
      <el-card class="form">
        <form-schema ref="formSchema" :schema="schema" v-model="model">
          <el-button type="primary" @click="submit">Create</el-button>
        </form-schema>
      </el-card>
    </el-row>
  </el-main>
</template>
<script>
import FormSchema from 'vue-json-schema'
import { HTTP } from '../http-common.js'
import { getLanguage } from '../utils.js'
import objectDiff from '../objDiff.js'

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
  props: {
    schema: Object,
    entities: String
  },
  data: function () {
    return {
      model: {}
    }
  },
  methods: {
    submit (e) {
      var language = getLanguage()

      var url = '/' + language + '/' + this.entities + '/'
      var loggedIn = this.$store.state.loggedIn
      if (loggedIn) {
        this.$refs.formSchema.form().validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(this.model))
            this.$refs.formSchema.clearErrorMessage()
            var newObj = objectDiff(this.model)
            console.log(newObj)
            HTTP.post(url, newObj)
              .then(response => {
                console.log(response)
                var nextURL = '/' + this.entities + '/edit/' + response.data.result.id
                this.$router.push(nextURL)
              })
              .catch(e => {
                console.log(e)
                if ('response' in e) {
                  console.log(e.response.data)
                  console.log(e.response.data.errors)
                  var errData = e.response.data.errors
                  for (var errorKey in errData) {
                    var errMsg = 'Error in ' + errorKey + ': ' + errData[errorKey]
                    this.$message.error(errMsg)
                  }
                }
              })
          } else {
            this.$refs.formSchema.setErrorMessage('Please Fill in the form')
            return false
          }
        })
      } else {
        this.$router.push('/login')
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
