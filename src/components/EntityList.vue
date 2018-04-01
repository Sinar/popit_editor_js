<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="handleCreate">Create</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="search">
          <el-form ref="form" :model="search" :inline="true">
            <el-form-item label="Search">
              <el-input v-model="search.query"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">Search</el-button>
              <el-button>Clear</el-button>
            </el-form-item>
          </el-form>
        </el-card>
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
      search: {
        query: ''
      },
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
      var language = localStorage.getItem('language')
      if (language === null) {
        language = 'en'
      }
      var url = '/' + language + '/' + entity
      HTTP.get(url, { params: {
        page: page
      }}).then(response => {
        var data = response.data.results
        this.pageSize = response.data.per_page
        this.total = response.data.total
        this.page = page
        var nameField
        if (['persons', 'organizations'].includes(entity)) {
          nameField = 'name'
        } else {
          nameField = 'label'
        }
        this.nameField = nameField
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
          this.loading = false
        }
      })
    },
    handleEdit (row) {
      var entity = this.$route.params.entity
      var url = '/' + entity + '/edit/' + row.id
      this.$router.push(url)
    },
    handlePageChange (page) {
      this.fetchEntity(page)
    },
    handleCreate () {
      var entity = this.$route.params.entity
      var url = '/' + entity + '/create/'
      this.$router.push(url)
    },
    handleSearch () {
      console.log(this.search.query)
      var entity = this.$route.params.entity
      var queryParam
      var page = 1
      var language = getLanguage()
      var url = '/' + language + '/search/' + entity

      if (['persons', 'organizations'].includes(entity)) {
        queryParam = 'name:' + this.search.query
      } else {
        queryParam = 'label:' + this.search.query
      }

      HTTP.get(url, { params: {
        page: page,
        q: queryParam
      }}).then(response => {
        var data = response.data.results
        this.pageSize = response.data.per_page
        this.total = response.data.total
        this.page = page
        console.log(url)
        console.log(response)
        var nameField
        if (['persons', 'organizations'].includes(entity)) {
          nameField = 'name'
        } else {
          nameField = 'label'
        }
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
          this.loading = false
        }
      })
    },
    handleDelete (row) {
      var entity = this.$route.params.entity
      var language = getLanguage()
      var url = '/' + language + '/' + entity + '/' + row.id
      HTTP.delete(url)
        .then(response => {
          console.log(response)
          var nextURL = '/' + entity + '/list'
          this.$router.push(nextURL)
        })
        .catch(e => {
          console.log(e)
        })
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
  .search {
    width: 1200px;
    text-align: left;
    margin: auto;
  }
</style>
