<template>
<div>
  <el-row>
    <el-col :span="8" :offset="8">
      <h2>Router Login Interface</h2>
      <el-input v-model="username" placeholder="请输入用户名" />
      <el-input v-model="password" placeholder="请输入密码" show-password />
      <el-select v-model="option.value" placeholder="请选择权限">
        <el-option v-for="item in option" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <router-link to="/"><el-button @click="login" type="primary" plain>Login</el-button></router-link>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      option: [
        {
          value: 1,
          name: "管理员"
        },
        {
          value: 2,
          name: "用户"
        }
      ]
    }
  },
  methods: {
    login() {
      let token = {username: this.username, password: this.password, authority: this.option.value};
      localStorage.setItem("token", JSON.stringify(token))
      console.log(JSON.stringify(token))
      alert("登录成功")

    }
  }
}
</script>

<style scoped>
h2 {
  margin-top: 70px;
  text-align: center;
  color: #409EFF;
}
.el-input {
  margin-top: 30px;
}
.el-select {
  margin-top: 30px;
  width: 100%;
}
.el-button {
  width: 100%;
  margin-top: 30px;
}
</style>