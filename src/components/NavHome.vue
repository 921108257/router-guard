<template>
<div>
  <el-row>
    <el-col :span="12" :offset="4">
      <el-menu default-active="1" :router="true" mode="horizontal">
        <el-menu-item route="/" index="1">Home</el-menu-item>
        <el-menu-item route="/user" index="2">User</el-menu-item>
        <el-menu-item @click="setUserAuthority" route="/admin" index="3">Admin</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="2">
      <h3 v-model="username" style="text-align: center">{{username}}</h3>
    </el-col>
    <el-col :span="2">
      <h4 style="text-align: center">
        <router-link to="/login"><el-link v-if="username === ''">Login</el-link></router-link>
        <el-link v-if="username !== ''" @click="logout">Logout</el-link>
      </h4>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="16" :offset="4">
      <router-view/>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "NavHome",
  data() {
    return {
      username: "",
      authority: 0
    }
  },
  methods: {
    logout() {
      let token = localStorage.getItem("token")
      token = JSON.parse(token)
      if (token.username !== '') {
        alert("已退出登录")
      }
      localStorage.removeItem("token")
      this.username = ''
    },
    getUsername() {
      let token = localStorage.getItem("token")
      token = JSON.parse(token)
      this.username = token.username
      this.authority = token.authority
    },
    setUserAuthority() {
      if (this.authority === 2) {
        alert("权限不够，请退出登录后用管理员账号登录！")
      }
    }
  },
  created() {
    this.getUsername();
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>