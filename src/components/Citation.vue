<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="handleGoHome">Home</el-button>
        <el-button type="primary" @click="handleGoParent">Parent</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="form">
          <form-schema ref="formSchema" :schema="schema" v-model="model">
            <el-button type="primary" @click="submit">Create</el-button>
          </form-schema>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import FormSchema from 'vue-json-schema'
import schema from '../schema/link_form.json'
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
      var entityId = this.$route.params.entity_id
      var entity = this.$route.params.entity
      var popitField = this.$route.params.field
      var language = getLanguage()
      var url = '/' + language + '/' + entity + '/' + entityId + '/citations/' + popitField
      var loggedIn = this.$store.state.loggedIn
      if (loggedIn) {
        this.$refs.formSchema.form().validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(this.model))
            this.$refs.formSchema.clearErrorMessage()
            HTTP.post(url, this.model)
              .then(response => {
                console.log(response)
                var citationId = response.data.result.id
                var editUrl = '/' + entity + '/' + entityId + '/citations' + popitField + '/edit/' + citationId
                this.$router.push(editUrl)
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
        this.$router.push('/login')
      }
    },
    handleGoHome () {
      this.$router.push('/')
    },
    handleGoParent () {
      var entityId = this.$route.params.entity_id
      var entity = this.$route.params.entity
      var parentURL = '/' + entity + '/edit/' + entityId
      this.$router.push(parentURL)
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
