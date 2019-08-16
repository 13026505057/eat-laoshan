<template>
    <div class="login-wrap">
        <div class="ms-title">青岛市崂山区人民检察院</div>
        <div class="ms-title2">餐饮管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input style="width:300px;" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input style="width:300px;" type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:rgb(241, 150, 150);">Tips : 请联系管理员获取用户名和密码。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
   import md5 from 'js-md5';
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                // console.log(self.$axios.defaults.baseURL)
                var passwordmd5 = md5.hex(self.ruleForm.password);
                var params = new URLSearchParams();
                params.append('username',self.ruleForm.username);
                params.append('password',passwordmd5);
                self.$axios({
                    method: 'post',
                    url: '/login',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                 }).then(function(data){
                    console.log(data.data.code)

                    if(data.data.code=='0'){
                       
                        localStorage.setItem('auth',data.data.data.token);
                        localStorage.setItem('ad_user_true_name',data.data.data.user.username);
                        // localStorage.setItem('user_type',data.data.data.user.userGroups[0].group_id);
                        self.$router.push('/readme');
                    }else{
                        self.$response(data,self);
                    }
                 });
                 
            },
            onload(){
                var username = localStorage.getItem('username');
                var password = localStorage.getItem('password');
                if(username==null){

                }else{
                    this.ruleForm.password = password;
                    this.ruleForm.username = username;
                }
            }
        },
        mounted(){
            this.onload();
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../../static/img/loginBanner.jpg);
        background-size: 100% 100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -260px;
        text-align: center;
        font-size:35px;
        color: #fff;

    }
    .ms-title2{
        position: absolute;
        top:60%;
        width:100%;
        margin-top: -280px;
        text-align: center;
        font-size:45px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:65%;
        width:300px;
        height:160px;
        margin:-190px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background-color: #e4e4e4;
    }
    .el-input__inner{
        border-radius: 20px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>