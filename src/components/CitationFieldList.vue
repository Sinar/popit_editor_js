<template>
  <div>
  <el-card class="entities">
    <el-table :data="data"
      v-loading="loading">
      <el-table-column
        prop="name"
        label="Name">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operation">
        <template slot-scope="scope">
          <el-button @click="handleLink(scope.row)">Link</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      @current-change="handlePageChange"
      :total="total">
    </el-pagination>
  </el-card>
  </div>
</template>
<script>
import { HTTP } from '../http-common.js'

export default {
  data () {
    return {
      data: [],
      page: 1,
      pageSize: 10,
      total: 0,
      nameField: 'name',
      loading: true
    }
  },
  watch: {
    '$route': function (to, from) {
      this.fetchEntity(1)
    }
  },
  created () {
    this.fetchEntity(1)
  },
  methods: {
    fetchEntity (page) {
      this.loading = true
      var entity = this.$route.params.entity
      var entityID = this.$route.params.entity_id
      var field = this.$route.params.field
      var language = localStorage.getItem('language')
      if (language === null) {
        language = 'en'
      }
      var url = '/' + language + '/' + entity + '/' + entityID + '/citations/'
      HTTP.get(url, { params: {
        page: page
      }}).then(response => {
        var data = response.data.results
        this.pageSize = response.data.per_page
        this.total = response.data.total
        this.page = page
        this.data = []
        for (var field of data) {
          console.log(field)
          console.log(entity)
          var temp = {
            name: field,
            id: field
          }
          console.log(temp)
          this.data.push(temp)
          this.loading = false
        }
      })
    },
    handleLink (row) {
      var entity = this.$route.params.entity
      var entityID = this.$route.params.entity_id
      var field = this.$route.params.field
      var url = '/' + entity + '/' + entityID + '/citations/' + field 
      this.$router.push(url)
    },
    handlePageChange (page) {
      this.fetchEntity(page)
    }
  }
}
</script>
<style scoped>
  .entities {
    width: 1200px;
    text-align: left;
    margin: auto;
  }
</style>
