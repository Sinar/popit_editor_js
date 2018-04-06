<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="handleGoHome">Home</el-button>
        <el-button type="primary" v-if="hasContact" @click="listContactDetails">Contact Details</el-button>
        <el-button type="primary" @click="listLinks">Links</el-button>
        <el-button type="primary" v-if="hasOtherName" @click="listOtherNames">Other Names</el-button>
        <el-button type="primary" v-if="hasIdentifier" @click="listIdentifiers">Identifiers</el-button>
        <el-button type="primary" @click="listCitations">Citations</el-button>
        <el-button type="primary" v-if="canAssignOrg" @click="assignOrg">Link Org</el-button>
        <el-button type="primary" v-if="canAssignPerson" @click="assignPerson">Link Person</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="form">
          <form-schema ref="formSchema" :schema="schema" v-model="model">
            <el-button type="primary" @click="submit">Edit</el-button>
            <el-button type="danger" @click="deleteEntity">Delete</el-button>
          </form-schema>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
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
    schema: Object,
    entity: String,
    hasContact: {
      type: Boolean,
      default: false
    },
    hasOtherName: {
      type: Boolean,
      default: false
    },
    hasIdentifier: {
      type: Boolean,
      default: false
    },
    canAssignPerson: {
      type: Boolean,
      default: false
    },
    canAssignOrg: {
      type: Boolean,
      default: false
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
      var language = getLanguage()
      var url = '/' + language + '/' + this.entity + '/' + entityId
      var loggedIn = this.$store.state.loggedIn
      console.log(loggedIn)
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
                var nextURL = '/' + this.entity + '/edit/' + response.data.result.id
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
    fetch_entity (entityId) {
      var language = getLanguage()
      var url = '/' + language + '/' + this.entity + '/' + entityId
      console.log(url)
      HTTP.get(url)
        .then(response => {
          this.model = response.data.result
          console.log(this.model)
        })
        .catch(e => {
          console.log(e)
        })
    },
    createContact () {
      var entityId = this.$route.params.entity_id
      var url = '/' + this.entity + '/' + entityId + '/contact_details/create'
      this.$router.push(url)
    },
    createLink () {
      var entityId = this.$route.params.entity_id
      var url = '/' + this.entity + '/' + entityId + '/links/create'
      this.$router.push(url)
    },
    listContactDetails () {
      var entityId = this.$route.params.entity_id
      var url = '/' + this.entity + '/' + entityId + '/contact_details/list'
      this.$router.push(url)
    },
    listLinks () {
      var entityId = this.$route.params.entity_id
      var url = '/' + this.entity + '/' + entityId + '/links/list'
      this.$router.push(url)
    },
    listCitations () {
      var entityId = this.$route.params.entity_id
      var url = '/' + this.entity + '/' + entityId + '/citations'
      this.$router.push(url)
    },
    listOtherNames () {
      var entityId = this.$route.params.entity_id
      var url = '/' + this.entity + '/' + entityId + '/other_names/list'
      this.$router.push(url)
    },
    listIdentifiers () {
      var entityId = this.$route.params.entity_id
      var url = '/' + this.entity + '/' + entityId + '/identifiers/list'
      this.$router.push(url)
    },
    deleteEntity () {
      var entityId = this.$route.params.entity_id
      var language = getLanguage()
      var url = '/' + language + '/' + this.entity + '/' + entityId
      console.log(url)
      HTTP.delete(url)
        .then(response => {
          console.log(response)
          var nextURL = '/' + this.entity + '/list'
          this.$router.push(nextURL)
        })
        .catch(e => {
          console.log(e)
        })
    },
    assignPerson () {
      var entityId = this.$route.params.entity_id
      var url = '/organizations/' + entityId + '/assignperson/'
      this.$router.push(url)
    },
    assignOrg () {
      var entityId = this.$route.params.entity_id
      var url = '/persons/' + entityId + '/assignorg/'
      this.$router.push(url)
    },
    handleGoHome () {
      this.$router.push('/')
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
