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
                    <div @click="balanceClick" class="topup">余 额</div>
                    <div @click="returnClick" class="topup">退 卡</div>
                </div>
                <div class="btncenter">
                    <div @click="sendCardClick" class="balance">发 卡</div>
                    <div @click="reportLossClick" class="balance">挂 失</div>
                    <div class="balance1"></div>
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
                                <el-input clearable ref="getFocus"  @input="balanceChange" v-model="form.card_num" style="width:700px;"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名">
                                <el-input disabled  v-model="form.user_true_name" style="width:700px;"></el-input>
                            </el-form-item>
                            <el-form-item label="余额">
                                <el-input disabled v-model="form.amount" style="width:700px;"></el-input>
                            </el-form-item>
                            <el-form-item v-if="topUpHid2" label="可退金额">
                                <el-input disabled v-model="form.amount" style="width:700px;"></el-input>
                            </el-form-item>
                            <el-form-item label="充值金额"  v-if="topUpHid1"
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

                            <el-form-item  v-if="topUpHid2" label="">
                                <!-- <el-radio-group v-model="form.resource">
                                    <el-radio :label="1" ></el-radio>
                                </el-radio-group> -->
                                <el-checkbox-group v-model="form.resource">
                                    <el-checkbox :label="1" name="type">退卡并清空余额</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item >
                                <el-button :disabled="disabledBtn" :loading="loadingBtn" v-if="topUpHid1" type="primary" @click="onSubmit('form')">充值</el-button>
                                <!-- <el-button :disabled="disabledBtn" :loading="loadingBtn" v-if="topUpHid1" type="primary" @click="reportLoss('form')">挂失</el-button> -->
                                <el-button :disabled="disabledBtn" :loading="loadingBtn" v-if="topUpHid2" type="primary" @click="returnCard('form')">退卡</el-button>
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
        <div class="content2" v-if="content3Hid">
            <div class="topupform">
                <div class="title">挂失</div>
                <div class="msgContent">
                    
                    <div class="rightmsg">
                        <el-form ref="form" :model="form" label-width="140px">
                            
                            <!-- <el-form-item label="姓名">
                                <el-input  ref="getFocus" @input="balanceChangeName" v-model="form.user_true_name" style="width:700px;"></el-input>
                            </el-form-item> -->
                            <el-form-item label="姓名">
                                <el-select style="width:700px;" clearable filterable @change="changeClick" v-model="form.user_true_name" placeholder="请选择姓名">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.user_id"
                                    :label="item.user_true_name"
                                    :value="item.user_id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="卡号">
                                <el-input disabled clearable  v-model="form.card_num" style="width:700px;"></el-input>
                            </el-form-item>
                            <el-form-item label="余额">
                                <el-input disabled v-model="form.amount" style="width:700px;"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <el-button :disabled="disabledBtn" :loading="loadingBtn" type="primary" @click="reportLoss('form')">挂失</el-button>
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
                content3Hid:false,
                title:'',
                form:{
                    card_num:'',
                    amount:'',
                    quantity:'',
                    user_true_name:'',
                    resource:[],
                },
                topUpHid1:false,
                topUpHid2:false,
                topupIpt:true,
                user_id:'',
                face_url:'',
                disabledBtn:false,
                loadingBtn:false,
                options:[],
            }
                
        },
        mounted() {
            this.getUserName();
            
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
                setTimeout(function(){
                    self.$refs.getFocus.focus();
                },500)
                
                self.title = "充值";
                self.topUpHid1 = true;
                self.topUpHid2 = false;
                self.form = {
                    card_num:'',
                    amount:'',
                    quantity:'',
                    user_true_name:'',
                };
                self.face_url = '';
                self.user_id = '';
            },
            // 余额
            balanceClick(){
                var self = this;
                self.content1Hid = false;
                self.content2Hid = true;
                setTimeout(function(){
                    self.$refs.getFocus.focus();
                },500)
                self.title = "余额";
                self.topUpHid1 = false;
                self.topUpHid2 = false;
                self.form = {
                    card_num:'',
                    amount:'',
                    quantity:'',
                    user_true_name:'',
                };
                self.face_url="";
                self.user_id = '';
            },
            // 退卡
            returnClick(){
                var self = this;
                self.content1Hid = false;
                self.content2Hid = true;
                setTimeout(function(){
                    self.$refs.getFocus.focus();
                },500)
                self.title = "退 卡";
                self.topUpHid1 = false;
                self.topUpHid2 = true;
                self.form = {
                    card_num:'',
                    amount:'',
                    quantity:'',
                    user_true_name:'',
                    resource:[1],
                };
                self.face_url="";
                self.user_id = '';
            },
            // 发卡
            sendCardClick(){
                console.log("llll")
                var self = this;
                self.$router.push('/sendCard');
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
                        }else{
                            self.$response(data,self);
                        }
                    });
                }
            },
            
            // 点击充值
            onSubmit(formName){
                this.disabledBtn = true;
                this.loadingBtn = true;
                console.log(formName)
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
                            setTimeout(function(){
                                self.disabledBtn = false;
                                self.loadingBtn = false;
                            },2000)     
                        }else if(self.form.quantity == ""){
                            self.$message({
                                type: 'error',
                                message: '请输入金额'
                            });
                            setTimeout(function(){
                                self.disabledBtn = false;
                                self.loadingBtn = false;
                            },2000)     
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
                                        self.disabledBtn = false;
                                        self.loadingBtn = false;
                                    },2000)
                                }else{
                                    self.$response(data,self);
                                    setTimeout(function(){
                                        self.disabledBtn = false;
                                        self.loadingBtn = false;
                                    },2000)      
                                }
                            });
                        }
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                        setTimeout(function(){
                            self.disabledBtn = false;
                            self.loadingBtn = false;
                        },2000)       
                    }
                });
            },
            // 点击退卡
            returnCard(){
                const self = this;
                self.disabledBtn = true;
                self.loadingBtn = true;
                console.log(self.form.resource)
                if(self.user_id == ""){
                    self.$message({
                        type: 'error',
                        message: '请刷卡'
                    });
                    setTimeout(function(){
                        self.disabledBtn = false;
                        self.loadingBtn = false;
                    },2000)
                }else{
                    var params = new URLSearchParams();
                    var token = localStorage.getItem('auth');
                    params.append('user_id',self.user_id);
                    // 0不清空 1是清空
                    if(self.form.resource[0] == 1){
                        self.$confirm('此操作将退卡并清空余额, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            params.append('amount_to_zero','1');
                            self.$axios({
                                method: 'post',
                                url: '/user/tuiKa',
                                data: params,
                                headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                            }).then(function(data){
                                if(data.data.code==0){
                                    self.$message({
                                        type: 'success',
                                        message: "退卡成功"
                                    });
                                    setTimeout(function(){
                                        self.content1Hid = true;
                                        self.content2Hid = false;
                                        self.disabledBtn = false;
                                        self.loadingBtn = false;
                                    },2000)
                                }else{
                                    self.$response(data,self);
                                }
                            });
                        }).catch(() => {
                            self.$message({
                                type: 'info',
                                message: '已取消退卡'
                            }); 
                            setTimeout(function(){
                                self.disabledBtn = false;
                                self.loadingBtn = false;
                            },2000)         
                        });
                    }else{
                        self.$confirm('此操作将退卡但不清空余额, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            params.append('amount_to_zero','0');
                            self.$axios({
                                method: 'post',
                                url: '/user/tuiKa',
                                data: params,
                                headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                            }).then(function(data){
                                if(data.data.code==0){
                                    self.$message({
                                        type: 'success',
                                        message: "退卡成功"
                                    });
                                    setTimeout(function(){
                                        self.content1Hid = true;
                                        self.content2Hid = false;
                                        self.disabledBtn = false;
                                        self.loadingBtn = false;
                                    },2000)
                                }else{
                                    self.$response(data,self);
                                }
                            });
                        }).catch(() => {
                            self.$message({
                                type: 'info',
                                message: '已取消退卡'
                            }); 
                            setTimeout(function(){
                                self.disabledBtn = false;
                                self.loadingBtn = false;
                            },2000)         
                        });
                    }
                }
                
            },
            cancelClick(){
                var self = this;
                self.content1Hid = true;
                self.content2Hid = false;
                self.content3Hid = false;
            },
            // 挂失
            reportLossClick(){
                var self = this;
                setTimeout(function(){
                    self.$refs.getFocus.focus();
                },500)
                this.content1Hid = false;
                this.content3Hid = true;
                self.form = {
                    card_num:'',
                    amount:'',
                    user_true_name:'',
                };
                self.face_url='';
                self.user_id = '';
            },
            getUserName(){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',1); 
                params.append('pageSize',10000); 
                self.$axios({
                    method: 'post',
                    url: '/user/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    if(data.data.code==0){
                        self.options = data.data.data.list;
                    }else{
                        self.$response(data,self);
                    }
                });
               
            },
            changeClick(val){
                console.log(val);
                this.getUserMsg(val)
            },
            getUserMsg(val){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',1); 
                params.append('pageSize',10); 
                params.append('user_id',val); 
                // params.append('user_type','yuangong');
                self.$axios({
                    method: 'post',
                    url: '/user/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    if(data.data.code==0){
                        if(data.data.data.list.length == 0 ){

                        }else{
                            self.form.user_true_name = data.data.data.list[0].user_true_name;
                            self.face_url = data.data.data.list[0].face_url;
                            self.form.card_num = data.data.data.list[0].card_num;
                            self.form.amount = data.data.data.list[0].amount/100;
                            self.user_id = data.data.data.list[0].user_id;
                            // console.log(self.form.card_num)
                            if(self.form.card_num == null){
                                self.$message({
                                    type: 'error',
                                    message: "该人员没有卡，无需挂失"
                                });
                            }
                        }
                        // self.total = data.data.data.total;
                    
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            
            // 点击挂失
            reportLoss(formName){
                this.disabledBtn = true;
                this.loadingBtn = true;
                console.log(formName)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const self = this;
                        var params = new URLSearchParams();
                        var token = localStorage.getItem('auth');
                        if(self.user_id == ""){
                            self.$message({
                                type: 'error',
                                message: '请输入姓名'
                            });
                            setTimeout(function(){
                                self.disabledBtn = false;
                                self.loadingBtn = false;
                            },2000)
                        }else{
                            params.append('user_id',self.user_id);
                            this.$confirm('挂失后，卡号将立即失效。如果需要重新启用，请在发卡页面中重新发卡激活。是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                self.$axios({
                                    method: 'post',
                                    url: '/user/guaShi',
                                    data: params,
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                                }).then(function(data){
                                    if(data.data.code==0){
                                        self.$message({
                                            type: 'success',
                                            message: "挂失成功"
                                        });
                                        setTimeout(function(){
                                            self.content1Hid = true;
                                            self.content2Hid = false;
                                            self.content3Hid = false;
                                            self.disabledBtn = false;
                                            self.loadingBtn = false;
                                        },1000)
                                    }else{
                                        self.$response(data,self);
                                        setTimeout(function(){
                                            self.disabledBtn = false;
                                            self.loadingBtn = false;
                                        },2000)
                                    }
                                });
                            }).catch(() => {
                                self.$message({
                                    type: 'info',
                                    message: '已取消挂失'
                                });
                                self.disabledBtn = false;
                                self.loadingBtn = false;        
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                        setTimeout(function(){
                            self.disabledBtn = false;
                            self.loadingBtn = false;
                        },2000)
                    }
                });
            },
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
        width:80%;
        height: 554px;
        /* background-color: #ECECEC; */
        border-radius: 18px;
        /* border: 2px solid #ff0000; */
        margin: 0 auto;
        align-self: center;
        /* display: flex; */
    }
    .btncenter{
        margin: 0 auto;
        /* align-self: center; */
        display: flex;
        justify-content: flex-start;
    }
    /* .btnLeft,.btnRight{
        width: 50%;

    }   */

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
        width: 380px;
        height:76px;
        line-height: 76px;
        border-radius: 40px;
        text-align: center;
        margin: 0 auto;
        margin-top: 2px;
        align-self: center;
        font-size: 42px;
        font-weight: 400;
        cursor: pointer;
    }
    .balance1{
        width: 380px;
        height:76px;
        line-height: 76px;
        border-radius: 40px;
        text-align: center;
        margin: 0 auto;
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