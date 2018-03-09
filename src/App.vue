<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8" :offset="8" id="header"><img src="https://sinarproject.org/logo.png"></el-col>
        <el-col :span="8">
          <div id="language">
            <el-dropdown @command="handleCommand">
              <el-button>
                {{ languageName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="ms">Malay</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24">
          <router-view v-if="token" />
          <login-form v-else />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import LoginForm from './components/Login.vue'

export default {
  name: 'App',
  data: function () {
    return {
      language: 'en',
      languageName: 'English',
      languageKey: {
        en: 'English',
        ms: 'Malay'
      },
      token: localStorage.getItem('token')
    }
  },
  components: {
    LoginForm
  },
  created: function () {
    var language = localStorage.getItem('language')
    if (language === null) {
      this.language = 'en'
      this.languageName = 'English'
    } else {
      this.language = language
      this.languageName = this.languageKey[language]
    }
  },
  methods: {
    handleCommand: function (command) {
      localStorage.setItem('language', command)
      this.language = command
      this.languageName = this.languageKey[command]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#language {
  text-align: right;
}
#header {
  text-align: center;
}
</style>
