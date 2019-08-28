<template>
    <div class="sidebar">
        <div class="slidebarTitle"><i class="el-icon-warning" style="margin-right:10px;color:yellow;"></i>系统导航</div>
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"   unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <!-- <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item> -->
                        <template v-for="(subItem,i) in item.subs">
                            <template v-if="subItem.subs">
                                <el-submenu :index="subItem.index" >
                                    <template slot="title"><!-- <i :class="subItem.icon" style=""></i> --><span style="margin-left:20px;">{{ subItem.title }}</span></template>
                                    <el-menu-item style="padding-left:80px;" v-for="(subItem2,i) in subItem.subs" :key="i" :index="subItem2.index"  >{{ subItem2.title }}
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="subItem.index" >
                                    <i :class="subItem.icon" ></i>{{ subItem.title }}
                                </el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
            <!-- <el-button @click="open3()" type="primary" style="width:100%;margin-top:50px;">修改密码</el-button> -->
        </el-menu>

    </div>
</template>

<script>
import md5 from 'js-md5';
    export default {
        data() {
            return {
                items: [
                    
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'outRule',
                        title: '违规记录查询'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'inStoreHistory',
                        title: '就餐记录查询'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'moneyByMonth',
                        title: '就餐费用查询'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'invest',
                        title: '充值记录查询'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'addInvest',
                        title: '为用户充值'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'userAdmin',
                        title: '就餐人员设置'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'cardAdmin',
                        title: '就餐卡管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'timeSetting',
                        title: '就餐时间管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'bumenAdmin',
                        title: '部门设置'
                    },
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: '5',
                    //     title: '通用设置',
                    //     subs:[
                    //         {   
                    //             index: 'bumenAdmin',
                    //             title: '> 部门设置'
                    //         },
                    //         {   
                    //             index: 'zhiweiAdmin',
                    //             title: '> 职位设置'
                    //         },
                    //         {   
                    //             index: 'userAdmin',
                    //             title: '> 人员设置'
                    //         },
                    //         {   
                    //             index: 'camera',
                    //             title: '> 摄像头设置'
                    //         },
                    //         // {   
                    //         //     index: 'storeLocation',
                    //         //     title: '> 存储位置设置'
                    //         // }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: '10',
                    //     title: '案管部门',
                    //     subs:[
                    //         {   
                    //             index: 'waitForInStore1',
                    //             title: '> 应入库案件确认'
                    //         },
                    //         {   
                    //             index: 'returnBacking1',
                    //             title: '> 待回执案件档案梳理'
                    //         },
                    //         {   
                    //             index: 'returnBacked1',
                    //             title: '> 已回执案件档案梳理'
                    //         },
                    //         {   
                    //             index: 'instore1',
                    //             title: '> 在库案件档案梳理表'
                    //         },
                    //         {   
                    //             index: 'anjianchaxun1',
                    //             title: '> 整体案件档案梳理表'
                    //         },
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: '9',
                    //     title: '档案部门',
                    //     subs:[
                    //         {
                    //             icon: 'el-icon-setting',
                    //             index: '0',
                    //             title: '案件档案梳理',
                    //             subs:[
                    //                 {   
                    //                     index: 'returnBacking',
                    //                     title: '> 待回执案件档案梳理'
                    //                 },
                    //                 {   
                    //                     index: 'returnBacked',
                    //                     title: '> 已回执案件档案梳理'
                    //                 },
                    //                 {   
                    //                     index: 'instore',
                    //                     title: '> 在库案件档案梳理表'
                    //                 },
                    //                 {   
                    //                     index: 'anjianchaxun',
                    //                     title: '> 整体案件档案梳理表'
                    //                 },
                    //             ]
                    //         },
                    //         {
                    //             icon: 'el-icon-setting',
                    //             index: '1',
                    //             title: '应入库档案管理',
                    //             subs:[
                    //                 {   
                    //                     index: 'waitForInStore',
                    //                     title: '> 应入库案件档案'
                    //                 },
                    //                 {   
                    //                     index: 'inStored',
                    //                     title: '> 已入库案件档案'
                    //                 },
                    //                 {   
                    //                     index: 'inStoreHistory',
                    //                     title: '> 案件档案归档操作记录'
                    //                 },
                    //             ]
                    //         },
                    //         {
                    //             icon: 'el-icon-setting',
                    //             index: '2',
                    //             title: '待出库档案管理',
                    //             subs:[
                    //                 {   
                    //                     index: 'waitForOutStore',
                    //                     title: '> 待出库案件档案'
                    //                 },
                    //                 {   
                    //                     index: 'outStored',
                    //                     title: '> 已出库案件档案'
                    //                 },
                    //                 {   
                    //                     index: 'outStoreHistory',
                    //                     title: '> 案件档案出库操作记录'
                    //                 },
                    //             ]
                    //         },
                    //         {
                    //             icon: 'el-icon-setting',
                    //             index: '3',
                    //             title: '待归还档案管理',
                    //             subs:[
                    //                 {   
                    //                     index: 'returnStore',
                    //                     title: '> 待归还案件档案'
                    //                 },
                    //                 {   
                    //                     index: 'returnStored',
                    //                     title: '> 已归还案件档案'
                    //                 },
                    //                 {   
                    //                     index: 'returnHistory',
                    //                     title: '> 案件档案归还历史'
                    //                 },
                    //             ]
                    //         },
                    //         {
                    //             icon: 'el-icon-setting',
                    //             index: '7',
                    //             title: '档案盘点管理',
                    //             subs:[
                    //                 {   
                    //                     index: 'checkByMounth',
                    //                     title: '> 月盘点管理'
                    //                 },
                    //                 {   
                    //                     index: 'checkByYear',
                    //                     title: '> 年盘点管理'
                    //                 },
                    //                 {   
                    //                     index: 'waitForCheck',
                    //                     title: '> 自定义盘点'
                    //                 },
                    //             ]
                    //         },
                    //     ]
                    // },
                    
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: '8',
                    //     title: '统计分析',
                    //     subs:[
                    //         {   
                    //             index: 'chengbanrenBymonth',
                    //             title: '> 承办人月归档梳理'
                    //         },
                    //         {   
                    //             index: 'chengbanrenByYear',
                    //             title: '> 承办人年归档梳理'
                    //         },
                    //         {   
                    //             index: 'chengbanren',
                    //             title: '> 承办人整体归档梳理'
                    //         },
                    //         {   
                    //             index: 'bumenBymonth',
                    //             title: '> 部门月归档梳理'
                    //         },
                    //         {   
                    //             index: 'bumenByYear',
                    //             title: '> 部门年归档梳理'
                    //         },
                    //         {   
                    //             index: 'inStoreByBumen',
                    //             title: '> 部门整体归档梳理'
                    //         },
                           
                    //         {   
                    //             index: 'bumenBymonthOut',
                    //             title: '> 部门月借阅梳理'
                    //         },
                    //         {   
                    //             index: 'bumenByYearOut',
                    //             title: '> 部门年借阅梳理'
                    //         },
                    //         {   
                    //             index: 'historyByBumen',
                    //             title: '> 部门整体借阅梳理'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: '6',
                    //     title: '档案分析',
                    //     subs:[
                    //         {   
                    //             index: 'jieyuezongjie',
                    //             title: '> 借阅总结'
                    //         },
                    //         {   
                    //             index: 'nianzhongzongjie',
                    //             title: '> 年度总结'
                    //         },
                    //         {   
                    //             index: 'lishiyange',
                    //             title: '> 历史沿革'
                    //         },
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: 'videoHistory',
                    //     title: '现场还原'
                    // },
                    
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: 'history',
                    //     title: '历史案卷'
                    // },
                    
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: '17',
                    //     title: '人员报到',
                    //     subs:[
                    //         {   
                    //             icon: 'el-icon-setting',
                    //             index: '18',
                    //             title: '> 本地籍',
                    //             subs:[
                    //                 {
                    //                     index: 'shejiebaodao',
                    //                     title: '> 社戒报到'
                    //                 },
                    //                 {
                    //                     index: 'shekangbaodao',
                    //                     title: '> 社康报到'
                    //                 },
                    //                 {
                    //                     index: 'shehuimianbaodao',
                    //                     title: '> 社会面报道'
                    //                 }
                    //             ]
                    //         },
                    //         {   
                    //             icon: 'el-icon-setting',
                    //             index: '19',
                    //             title: '> 外地籍',
                    //             subs:[
                    //                 {
                    //                     index: 'shejiebaodao1',
                    //                     title: '> 社戒报到'
                    //                 },
                    //                 {
                    //                     index: 'shekangbaodao1',
                    //                     title: '> 社康报到'
                    //                 },
                    //                 {
                    //                     index: 'shehuimianbaodao1',
                    //                     title: '> 社会面报道'
                    //                 }
                    //             ]
                    //         }
                    //     ]
                    // },
                    
                    

                    
                    
                    

                   
                   
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        mounted(){
            var level = localStorage.getItem('user_type');
            // if(level=='1'){
            //     var obj = {
            //                     icon: 'el-icon-setting',
            //                     index: '5',
            //                     title: '通用设置',
            //                     subs:[
            //                         {   
            //                             index: 'bumenAdmin',
            //                             title: '> 部门设置'
            //                         },
            //                         {   
            //                             index: 'zhiweiAdmin',
            //                             title: '> 职位设置'
            //                         },
            //                         {   
            //                             index: 'userAdmin',
            //                             title: '> 人员设置'
            //                         },
            //                         {   
            //                             index: 'camera',
            //                             title: '> 摄像头设置'
            //                         },
            //                         {   
            //                             index: 'storeLocation',
            //                             title: '> 存储位置设置'
            //                         }
            //                     ]
            //                 }
            //     this.items.push(obj)
            // }else{

            // }
        },
        methods:{
           
            open3() {
                var self = this;
                self.$prompt('请输入新密码', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                }).then(({ value }) => {

                        
                        var passwordmd5 = md5.hex(value);
                        var params = new URLSearchParams();
                        var token = localStorage.getItem('auth');
                        params.append('password',passwordmd5);         
                        self.$axios({
                            method: 'post',
                            url: '/user/updatePass',
                            data: params,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                         }).then(function(data){
                            if(data.data.code==0){
                                self.$message({
                                  type: 'success',
                                  message: '修改成功'
                                });  
                            }else{
                              self.$response(data,self);
                            }
                         });      
                  
                }).catch(() => {
                  self.$message({
                    type: 'info',
                    message: '取消输入'
                  });       
                });
             }

        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 80px;
        bottom:0;
        background: #fff;
       /* overflow-y: scroll;*/
    }
    .slidebarTitle{
        text-align: center;
        color: #fff;
        height: 30px;
        line-height: 30px;
        font-family:'KaiTi';
        font-size: 18px;
        color: #fff;
        background-color: #489ccb;
    }
    .sidebar > ul {
        height:100%;
           overflow-y: scroll;
    }

    .sidebar > ul::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
    }
    .sidebar > ul::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
    }
    .sidebar > ul::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
    }
    .el-menu-item{
        background: -webkit-linear-gradient(#b3f2ff, #96e9f9); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#b3f2ff, #96e9f9); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#b3f2ff, #96e9f9); /* Firefox 3.6 - 15 */
        background: linear-gradient(#b3f2ff, #96e9f9); /* 标准的语法（必须放在最后） */
        border-bottom:1px solid #b9cad3;
        height: 40px;
        line-height: 40px;
    }
    .el-submenu__title{
        background: -webkit-linear-gradient(#b3f2ff, #96e9f9); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#b3f2ff, #96e9f9); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#b3f2ff, #96e9f9); /* Firefox 3.6 - 15 */
        background: linear-gradient(#b3f2ff, #96e9f9); /* 标准的语法（必须放在最后） */
        height: 40px;
        line-height: 40px;
    }
    .el-menu-item.is-active{
        color: #fff!important;
        background: #3fafe1!important;
    }
    .el-submenu .el-menu-item{
        background: #fff;
        border-bottom:none;
    }
    .el-menu-vertical-demo el-menu{
        background-color: #ccc;
    }

</style>
