<template>
  <div class="login-container">
    <el-container style="margin:140px 15%;height:63%">
      <el-aside width="61%" class="login-door">
      </el-aside>
      <el-main >

        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <img src="../../assets/logo_white.png" alt='sufe' width="100px" height='100px' class='logo_white'/>
     <!--    <div class="title-container">
            <h3 class="title">学业预警系统</h3>
          </div> -->

          <el-form-item prop="username">
<!--            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span> -->
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
<!--            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span> -->
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
           <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-button :loading="loading" type="plain" class='login-button' @click.native.prevent="handleLogin">LOGIN
          </el-button>
        </el-form>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log(this.redirect)
        this.redirect = route.query && route.query.redirect
        console.log(this.redirect)
      },

      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#1e1e1e;
$cursor: #550000;
$border-color:#142559;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.el-main{
  // border-top: 2.5px solid darkblue;
  // border-right: 2.5px solid darkblue;
  // border-bottom: 2.5px solid darkblue;
  // border-top: ;
  // padding: 3px;
  // margin: 0;
  background-color: white;
  border-top: 4.5px solid rgba($color: #152149, $alpha: 1.0);
  border-bottom: 4.5px solid rgba($color: #152149, $alpha: 1.0);
  border-right: 4.5px solid rgba($color: #152149, $alpha: 1.0);
  }
/* reset element-ui css */
  .login-container {
    text-align: center;
    .el-input {
      // padding-bottom: 0.5px;

      display: inline-block;
      height: 45px;
      width: 75%;


      input {
        border: 0px;
        border-bottom: 2px solid #b9c1cb;
        display:table-cell;
        vertical-align:text-bottom;
        // 透明
        background: transparent;
        // padding: 0;
        // border: 1px solid red;


        // bottom: 0px;
        // 去除浏览器的默认样式
        -webkit-appearance: none;
        border-radius: 0px;
        padding-left:5px;
        color: $light_gray;
        // height: 20px;
        caret-color: $cursor;


      }
    }

    .el-form-item {
      background: rgba(255, 255, 255, 0.1);
      // border-radius: 5px;
    }
    .logo_white{
      position: relative;
      padding: 0;
      top:3%;
      margin-bottom: 7%;
    }
    .login-button{
      margin-top: 30px;
      // height:4px;
      width:80%;
      color: #dde5fd;
      background-color: #000062;
      text-align: center;
      font-family: "microsoft yahei";
      font-size: 10px ;
      font-stretch: wider;
      letter-spacing: 0.7px;

      // font-weight: bold;
      border-radius: 0%;
      // border: 1px solid red ;
      line-height: 3px;
    }
  }

</style>

<style lang="scss" scoped>
$bg:#ffffff;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-door{
  background-image: url(../../assets/door.png);
  background-repeat: no-repeat;
  background-position:0% 100%;
  background-size: 100% 100%;
  // filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale');
  // -moz-background-size:100% 100%;
  border-top: 1px solid rgba($color: #152149, $alpha: 1.0);
  border-bottom: 1px solid rgba($color: #152149, $alpha: 1.0);
  border-left: 1px solid rgba($color: #152149, $alpha: 1.0);
  border-radius: 0.3% 0 0 0.3%;
  overflow: hidden;
  // padding: 0 0 0 0px;
}
.login-container {
  height: 100%;
  width: 100%;
  background-image: url('../../assets/bg.png');
  // background-color: $bg;
  // background-size:contain;
  // background-size: ;
  background-position: 0% 100%;
  background-size: 100% 100%;
  background-repeat:no-repeat;
  background-attachment:fixed;
  background-position:center;
  overflow: hidden;
  // overflow-y:hidden;
  ::-webkit-scrollbar {
     width: 0;
  }
  .login-form {
    position: relative;
    width: 100%;
    height:100%;
    padding: 0 0 0 0px;
    // 父元素宽度确定的情况下,上下不变动,左右可实现自动居中
    // margin: 6% 66%;
    //删

    background-color:$bg;
    border-radius: 5%;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 0px 6px 15px;
    color: $dark_gray;
    //
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    //删
    // border:solid 1px red
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
