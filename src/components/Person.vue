<template>

</template>
<script>
import FormSchema from 'vue-json-schema'
import schema from './schema/person.json'

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
