<template>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="handleGoHome">Home</el-button>
          <el-button type="primary" @click="handleCreate">Create</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
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
                  <el-button @click="handleEdit(scope.row)">Edit</el-button>
                  <el-button type="danger" @click="handleDelete(scope.row)">Delete</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              layout="prev, pager, next"
              @current-change="handlePageChange"
              :total="total">
            </el-pagination>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
</template>
<script>
import { HTTP } from '../http-common.js'
import { getLanguage } from '../utils.js'

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
      var language = getLanguage()
      if (language === null) {
        language = 'en'
      }
      var url = '/' + language + '/' + entity + '/' + entityID + '/citations/' + field
      console.log(url)
      HTTP.get(url, { params: {
        page: page
      }}).then(response => {
        var data = response.data.results
        this.pageSize = response.data.per_page
        this.total = response.data.total
        this.page = page
        var nameField = 'url'
        this.data = []
        for (var item of data) {
          console.log(item)
          console.log(nameField)
          console.log(entity)
          var temp = {
            name: item[nameField],
            id: item['id']
          }
          console.log(temp)
          this.data.push(temp)
        }
        this.loading = false
      })
    },
    handleEdit (row) {
      var entity = this.$route.params.entity
      var entityID = this.$route.params.entity_id
      var field = this.$route.params.field
      var url = '/' + entity + '/' + entityID + '/citations/' + field + '/edit/' + row.id
      this.$router.push(url)
    },
    handlePageChange (page) {
      this.fetchEntity(page)
    },
    handleCreate () {
      var entity = this.$route.params.entity
      var entityID = this.$route.params.entity_id
      var field = this.$route.params.field
      var url = '/' + entity + '/' + entityID + '/citations/' + field + '/create/'
      this.$router.push(url)
    },
    handleDelete (row) {
      var entity = this.$route.params.entity
      var entityID = this.$route.params.entity_id
      var field = this.$route.params.field
      var language = getLanguage()
      var url = '/' + language + '/' + entity + '/' + entityID + '/citations/' + field + '/' + row.id
      HTTP.delete(url)
        .then(response => {
          console.log(response)
          var nextUrl = '/' + entity + '/' + entityID + '/citations/' + field + '/list/'
          this.$router.push(nextUrl)
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleGoHome () {
      this.$router.push('/')
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
