<template>
  <el-container>
    <el-header id="header">
      <img src="https://sinarproject.org/logo.png">
    </el-header>
    <el-main>
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
        <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      language: 'en',
      languageName: 'English',
      languageKey: {
        en: 'English',
        ms: 'Malay'
      }
    }
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
