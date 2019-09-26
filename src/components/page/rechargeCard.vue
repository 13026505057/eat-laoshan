<template>
    <div class="recharge">
        
        <div class="content1" v-if="content1Hid">
            <!-- <div class="leftContent"> -->
                 
            <!-- </div> -->
            <!-- <div class="rightContent"> -->
                
            <!-- </div> -->
            <div class="etui">
                <div class="btncenter">
                    <div @click="topupClick" class="topup">充 值</div>
                    <div @click="balanceClick" class="balance">余 额</div>
                </div>
                
            </div>
          
        </div>
        <div class="content2" v-if="content2Hid">
            <div class="topupform">
                <div class="title">{{title}}</div>
                <div class="msgContent">
                    
                    <div class="rightmsg">
                        <el-form ref="form" :model="form" label-width="140px">
                            <el-form-item label="卡号">
                                <el-input clearable autofocus  @input="balanceChange" v-model="form.card_num" style="width:700px;"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名">
                                <el-input disabled @input="balanceChange" v-model="form.user_true_name" style="width:700px;"></el-input>
                            </el-form-item>
                            <el-form-item label="余额">
                                <el-input disabled v-model="form.amount" style="width:700px;"></el-input>
                            </el-form-item>
                            <el-form-item label="充值金额"  v-if="topUpHid"
                                prop="quantity"
                                :rules="[
                                {
                                    type: 'number',
                                    required: true,
                                    message: '请输入金额',
                                    trigger: 'blur'
                                }, {
                                    type: 'number', message: '金额必须为数字值'
                                }

                                ]">
                                <el-input placeholder="" clearable autocomplete="off" v-model.number="form.quantity" style="width:700px;"></el-input>
                            </el-form-item>
                            

                            <el-form-item >
                                <el-button v-if="topUpHid" type="primary" @click="onSubmit('form')">充值</el-button>
                                <el-button @click="cancelClick">关闭</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="lefthead">
                        <img class="user_head" :src="face_url" alt="">
                    </div>
                </div>
                
                
            </div>
            
        </div>
        
        

    </div>
</template>

<script>
    import  TMap from '../../TMap';
    import md5 from 'js-md5';
    import vBreadcrumb from '../common/breadcrumb.vue';
    export default {
        components:{
                vBreadcrumb
        },
        data: function(){
            return {
                content1Hid:true,
                content2Hid:false,
                title:'',
                form:{
                    card_num:'',
                    amount:'',
                    quantity:'',
                    user_true_name:'',
                },
                topUpHid:false,
                topupIpt:true,
                user_id:'',
                face_url:'',
            }
                
        },
        mounted() {
         
            
        },
        methods: {
            
            //获取权限组列表
            getPowerList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');         
                self.$axios({
                    method: 'post',
                    url: '/group/get',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    if(data.data.code==0){
                    self.powerList = data.data.data;
                    }else{
                    self.$response(data,self);
                    }
                });
            },
            // 充值
            topupClick(){
                var self = this;
                self.content1Hid = false;
                self.content2Hid = true;
                self.title = "充值";
                self.topUpHid = true;
                self.form = {
                    card_num:'',
                    amount:'',
                    quantity:'',
                    user_true_name:'',
                };
                self.face_url = '';
            },
            // 余额
            balanceClick(){
                var self = this;
                self.content1Hid = false;
                self.content2Hid = true;
                self.title = "余额";
                self.topUpHid = false;
                self.form = {
                    card_num:'',
                    amount:'',
                    quantity:'',
                    user_true_name:'',
                };
                self.face_url="";
            },
            // 输入框值
            balanceChange(val){
                console.log(val);
                var self = this;
                if(val == ""){
                    self.topupIpt = true;
                    self.form.user_true_name = "";
                    self.face_url = "";
                    self.form.amount = "";
                }else{
                    self.topupIpt = false;
                    console.log(self.topupIpt)
                    var params = new URLSearchParams();
                    var token = localStorage.getItem('auth');
                    params.append('pageNum',1); 
                    params.append('pageSize',10); 
                    params.append('card_num',self.form.card_num); 
                    // params.append('user_type','yuangong');
                    self.$axios({
                        method: 'post',
                        url: '/user/getByPage',
                        data: params,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                    }).then(function(data){
                        if(data.data.code==0){
                            if(data.data.data.list.length == 0 ){
                                // self.form.user_true_name = "";
                                // self.face_url = "";
                                // self.form.amount = "";
                            }else{
                                self.form.user_true_name = data.data.data.list[0].user_true_name;
                                self.face_url = data.data.data.list[0].face_url;
                                self.form.amount = data.data.data.list[0].amount/100;

                                self.user_id = data.data.data.list[0].user_id;
                            }
                            
                            // self.total = data.data.data.total;
                        
                        }else{
                            self.$response(data,self);
                        }
                    });
                }
                
            },
            // 点击充值
            onSubmit(formName){
                 this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const self = this;
                        var params = new URLSearchParams();
                        var token = localStorage.getItem('auth');
                        if(self.user_id == ""){
                            self.$message({
                                type: 'error',
                                message: '请刷卡'
                            });
                        }else if(self.form.quantity == ""){
                            self.$message({
                                type: 'error',
                                message: '请输入金额'
                            });
                        }else{
                            params.append('user_id',self.user_id);
                            params.append('quantity',self.form.quantity*100);
                            self.$axios({
                                method: 'post',
                                url: '/user/addBank',
                                data: params,
                                headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                            }).then(function(data){
                                if(data.data.code==0){
                                    self.$message({
                                        type: 'success',
                                        message: '充值金额是: ' + self.form.quantity+"元"
                                    });
                                    setTimeout(function(){
                                        self.content1Hid = true;
                                        self.content2Hid = false;
                                    },2000)
                                    
                                    
                                }else{
                                    self.$response(data,self);
                                }
                            });
                        }
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancelClick(){
                var self = this;
                self.content1Hid = true;
                self.content2Hid = false;
            }
        }
     
    }
</script>

<style scoped>
    .recharge{
        height:100%;
    }
    .content1{
        width:100%;
        height:100%;
        /* border:2px solid #ff0000; */
        display: flex;
        /* justify-content: space-around; */
        background-image: url(../../../static/img/3.png);
        background-size: 100% 100%;
    }
    .msgContent{
        display: flex;
        justify-content: space-around; 
    }
    .lefthead{
        width: 20%;
        text-align: center;
        border-left: 2px solid #B8B8B8;
    } 
    .rightmsg{
        width: 79%;
    }
    .user_head{
        width: 150px;
        height: 200px;
        border: 1px solid #888888;
    }
    .etui{
        width:1020px;
        height: 654px;
        /* background-color: #ECECEC; */
        border-radius: 18px;
        /* border: 2px solid #ff0000; */
        margin: 0 auto;
        align-self: center;
        display: flex;
    }
    .btncenter{
        margin: 0 auto;
        align-self: center;
    }
    .content2{
        width:100%;
        height:100%;
        /* background-image: url(../../../static/img/3.png); */
        /* background-size: 100% 100%; */
        /* border: 2px solid #409EFF; */
    }
    /* .leftContent,.rightContent{
        width:48%;
        text-align: center;
        display: flex;
        

    }  */
    .leftContent{
        /* border:2px solid #00ff40; */


    } 
    .rightContent{
        /* border:2px solid #a200ff; */
    }
    .topup,.balance{
        background-color: #3178F4;
        /* background-color: #ff0000; */
        color: #ffffff;
        width: 430px;
        height:86px;
        line-height: 86px;
        border-radius: 40px;
        text-align: center;
        margin: 0 auto;
        margin-top: 2px;
        align-self: center;
        font-size: 50px;
        font-weight: 400;
        cursor: pointer;
    }
    .topup{
        margin-bottom: 120px;
    }
    .balance{
        
    }
    .topupform{
        width:1120px;
        height: 504px;
        background-color: #ECECEC;
        border-radius: 20px;
        margin: 100px auto 0;
    }
    .title{
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        padding-top: 40px;
        margin: 40px 0;
    }
    
</style>