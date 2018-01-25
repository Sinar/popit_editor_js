<template>
    <form-schema :schema="schema" v-model="model">

    </form-schema>
</template>
<script>
import FormSchema from 'vue-json-schema'
import schema from '../schema/person_form.json'

export default {
  data () {
    return {
      schema: schema,
      model: {}
    }
  },
  methods: {
    submit (e) {
    }
  },
  components: {
    FormSchema
  }
}
</script>
