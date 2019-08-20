<template>
    <div class="login-wrap">
        <div class="userBox">
            <div class="normal">
                <div class="normalTitle">
                    正常餐卡
                </div>
                <div class="normalTitle2">
                    今日应刷：60
                </div>
                <div class="normalTitle2">
                    今日实刷：50
                </div>
            </div>
             <div class="normal">
                <div class="normalTitle">
                    临时餐卡
                </div>
                <div class="normalTitle2">
                    今日应刷：60
                </div>
                <div class="normalTitle2">
                    今日实刷：50
                </div>
            </div>
             <div class="normal">
                <div class="normalTitle">
                    特殊餐卡
                </div>
                <div class="normalTitle2">
                    今日应刷：60
                </div>
                <div class="normalTitle2">
                    今日实刷：50
                </div>
            </div>
            <!-- <div class="userBoxItem">
                <div class="userFace">
                    <img style="width: 100%;height: 100%;" src="../../../static/img/test.png">
                </div>
                <div class="userType">
                    陌生人
                </div>
            </div> -->
        
        </div>
        <div class="userBox" style="height: 90%;margin-top: 4%;">
            <div class="outruleBox">
                <div class="outruleBoxTitle">
                    <div class="outruleBoxTitleItem">
                        时间
                    </div>
                    <div class="outruleBoxTitleItem">
                        姓名
                    </div>
                    <div class="outruleBoxTitleItem" style="border-right: none;">
                        违规类型
                    </div>
                </div>
                <div class="outruleBoxTitle">
                    <div class="outruleBoxTitleItem">
                        2019-08-01 23：23：23
                    </div>
                    <div class="outruleBoxTitleItem">
                        朱元皓
                    </div>
                    <div class="outruleBoxTitleItem" style="border-right: none;">
                        未刷卡
                    </div>
                </div>
            </div>
        
        </div>
        <div class="userBox">
            <div class="normal" style="height: 92%;">
                <div class="normalTitle">
                    陌生人
                </div>
                <div class="userBoxItem">
                    <div class="userFace">
                        <img style="width: 100%;height: 100%;" src="../../../static/img/test.png">
                    </div>
                </div>
                <div class="userBoxItem">
                    <div class="userFace">
                        <img style="width: 100%;height: 100%;" src="../../../static/img/test.png">
                    </div>
                </div>
                <div class="userBoxItem">
                    <div class="userFace">
                        <img style="width: 100%;height: 100%;" src="../../../static/img/test.png">
                    </div>
                </div>
                <div class="userBoxItem">
                    <div class="userFace">
                        <img style="width: 100%;height: 100%;" src="../../../static/img/test.png">
                    </div>
                </div>
            </div>
             
            <!-- <div class="userBoxItem">
                <div class="userFace">
                    <img style="width: 100%;height: 100%;" src="../../../static/img/test.png">
                </div>
                <div class="userType">
                    陌生人
                </div>
            </div> -->
        
        </div>
    </div>
</template>

<script>
   import md5 from 'js-md5';
    export default {
        data: function(){
            return {
                tableData: [{
                      date: '2016-05-02',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                      date: '2016-05-04',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                      date: '2016-05-01',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                      date: '2016-05-03',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1516 弄'
                    }]
            }
        },
        methods: {
            getCardOut(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                
                params.append('begin_time','');
                params.append('end_time','');
                params.append('card',0);
                params.append('pageNum',1);
                params.append('pageSize',200);
                params.append('user_id','');
                params.append('eat_type',self.eat_type);
                params.append('user_tel',self.user_tel);
                params.append('user_type',self.user_type);
                //这里需要查的是当前就餐
                self.$axios({
                    method: 'post',
                    url: '/log/eat-log/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.caseList = data.data.data.list;
                        self.total = data.data.data.total;
                    }else{
                      self.$response(data,self);
                    }
                 });
            },
        },
        mounted(){
            // this.onload();
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../../static/img/banner.png);
        background-size: 100% 100%;
        overflow: hidden;
    }
    .outruleBoxTitle{
        width: 100%;
        height: 50px;
        /*background-color: red;*/
    }
    .outruleBoxTitleItem{
        width: 33.1%;
        height: 50px;
        float: left;
        text-align: center;
        line-height: 50px;
        color: #fff;
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
        /*background-color: red;*/
    }
    .outruleBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
        border:2px solid #0AE0D7;
    }
    .normalTitle{
        width: 98%;
        height: 32px;
        margin: 0 auto;
        line-height: 30px;
        font-size: 24px;
        text-align: center;
        color: #fff;
        margin-top: 9px;
        letter-spacing: 10px;
        border-bottom: 1px solid #fff;
        background-color: #0AE0D7;
    }
    .normalTitle2{
        width: 100%;
        height: 50px;
        line-height: 30px;
        font-size: 24px;
        text-align: center;
        color: #fff;
        margin-top: 50px;
        letter-spacing: 20px;
    }
    .normal{
        width: 100%;
        height: 30%;
        margin-top: 1%;
        /*background-color: blue;*/
        background-image: url(../../../static/img/banner1.png);
        background-size: 100% 100%; 
        overflow: hidden;
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
    .userBox{
        width: 31.5%;
        height: 100%;
        margin:0 auto;
        margin-top: 3.2%;
        margin-left: 1.2%;
        float: left;
        /*background-color: red;*/
    }
    .userBoxItem{
        width: 160px;
        height: 180px;
        margin-left: 30px;
        margin-top: 20px;
        float: left;
        /*background-color: blue;*/

    }
    .userFace{
        width: 100%;
        height: 170px;
        /*background-color: black;*/
    }
    .userType{
        width: 100%;
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        color: red;
    }
    
</style>