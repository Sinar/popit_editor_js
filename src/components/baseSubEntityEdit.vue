<template>
  <el-card class="form">
    <form-schema ref="formSchema" :schema="schema" v-model="model">
      <el-button type="primary" @click="submit">Save</el-button>
    </form-schema>
  </el-card>
</template>
<script>
import FormSchema from 'vue-json-schema'
import { HTTP } from '../http-common.js'
import objectDiff from '../objDiff.js'
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
    console.log(field.name)

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
      model: {}
    }
  },
  props: {
    subEntity: String,
    schema: Object
  },
  watch: {
    '$route': function (to, from) {
      var entity = this.$route.params.entity
      var entityId = this.$route.params.entity_id
      var subEntityID = this.$route.params.subentity_id
      this.fetch_entity(entity, entityId, subEntityID)
    }
  },
  created () {
    var entity = this.$route.params.entity
    var entityId = this.$route.params.entity_id
    var subEntityID = this.$route.params.subentity_id
    this.fetch_entity(entity, entityId, subEntityID)
  },
  methods: {
    submit (e) {
      console.log(e)
      var entityId = this.$route.params.entity_id
      var entity = this.$route.params.entity
      var subEntityID = this.$route.params.subentity_id
      var language = getLanguage()
      var url = '/' + language + '/' + entity + '/' + entityId + '/' + this.subEntity + '/' + subEntityID
      var loggedIn = this.$store.state.loggedIn
      if (loggedIn) {
        this.$refs.formSchema.form().validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(this.model))
            var newObj = objectDiff(this.model)
            console.log(JSON.stringify(newObj))
            this.$refs.formSchema.clearErrorMessage()
            HTTP.put(url, newObj)
              .then(response => {
                console.log(response)
                var subEntityID = response.data.result.id
                var nextURL = '/' + entity + '/' + entityId + '/' + this.subEntity + '/edit/' + subEntityID
                this.$router.push(nextURL)
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
    fetch_entity (entity, entityId, subEntityID) {
      var language = getLanguage()
      var url = '/' + language + '/' + entity + '/' + entityId + '/' + this.subEntity + '/' + subEntityID
      HTTP.get(url)
        .then(response => {
          this.model = response.data.result
          console.log(this.model)
        })
        .catch(e => {
          console.log(e)
        })
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
