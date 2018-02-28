<template>
  <el-card class="form">
    <form-schema ref="formSchema" :schema="schema" v-model="model">
      <el-button type="primary" @click="submit">Edit</el-button>
    </form-schema>
  </el-card>
</template>
<script>
import FormSchema from 'vue-json-schema'
import schema from '../schema/person_form.json'
import { HTTP } from '../http-common.js'
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
  prop: field.title
}))

FormSchema.setComponent('text', 'el-input')

export default {
  data () {
    return {
      schema: schema,
      model: {},
      origData: {}
    }
  },
  watch: {
    '$route': function (to, from) {
      this.fetch_entity(this.$route.params.entity_id)
    }
  },
  created () {
    console.log(this.$store.state.loggedIn)
    this.fetch_entity(this.$route.params.entity_id)
  },
  methods: {
    submit (e) {
      var entityId = this.$route.params.entity_id
      var url = '/en/persons/' + entityId
      var loggedIn = this.$store.state.loggedIn
      console.log(loggedIn)
      if (loggedIn) {
        this.$refs.formSchema.form().validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(this.model))
            console.log(JSON.stringify(this.origData))
            var newObj = objectDiff(this.model)
            console.log(JSON.stringify(newObj))
            this.$refs.formSchema.clearErrorMessage()
            HTTP.put(url, newObj)
              .then(response => {
                console.log(response)
              })
              .catch(e => {
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
    fetch_entity (entityId) {
      var url = '/en/persons/' + entityId
      HTTP.get(url)
        .then(response => {
          this.model = response.data.result
          this.origData = response.data.result
          console.log(this.model)
        })
        .catch(e => {
          console.log(e)
        })
    },
    object_diff (obj) {
      var newObj = {}
      for (var key in obj) {
        if (obj[key] !== '') {
          newObj[key] = obj[key]
        }
      }
      return newObj
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
