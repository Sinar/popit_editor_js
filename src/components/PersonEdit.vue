<template>
  <el-card class="form">
    <form-schema :schema="schema" v-model="model">

    </form-schema>
  </el-card>
</template>
<script>
import FormSchema from 'vue-json-schema'
import schema from '../schema/person_form.json'
import { HTTP } from '../http-common.js'

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
      model: {}
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
      var loggedIn = this.$store.loggedIn
      if (loggedIn === true) {
        HTTP.put(url, this.model)
          .then(response => {
            console.log(response)
          })
          .catch(e => {
            console.log(e)
          })
      } else {
        this.$route.push('/login')
      }
    },
    fetch_entity (entityId) {
      var url = '/en/persons/' + entityId
      HTTP.get(url)
        .then(response => {
          this.model = response.data.result
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
