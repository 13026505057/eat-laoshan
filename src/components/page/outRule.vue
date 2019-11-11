<template>
    <div>
        
        <div >
            <!-- <div class="titleBg">案件档案归档操作记录</div> -->
            <div class="block">
                
                <el-input style="width:250px;" v-model="user_tel" placeholder="手机号查询"></el-input>
                <!-- 关键词联想组建 -->
                <el-select
                    v-model="user_true_name"
                    style="width: 200px;margin-left: 30px;"
                    filterable
                    remote
                    clearable
                    reserve-keyword
                    placeholder="请输入姓名"
                    @focus="focusName"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                        v-for="item in options4"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                    </el-option>
                </el-select>

                <el-select v-model="eat_type" placeholder="请选择就餐类型" style="width: 180px;margin-left: 30px;">
                    <el-option
                        v-for="item in eatOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="user_type" placeholder="请选择违规类型" style="width: 180px;margin-left: 30px;">
                    <el-option
                        v-for="item in usertOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>

                <el-date-picker
                    style="margin-left: 20px;width:420px;"
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
                <el-button type="warning" style="margin-left: 0px;" @click="TedaysearchClick">查询今天</el-button>
            </div>

          
        </div>
        <!-- <div class="tree">
          <el-tree :data="data"    @node-click="handleNodeClick"></el-tree>
        </div> -->
        <el-dialog title="违规图片" :visible.sync="case_detail_dialog">
            <img :src="lookPicSrc" class="lookPicClass">  
        </el-dialog>
        <div id="container" style="width: 100%;height: 110%;  float: right;">
            
          
            <div class="tableList">
                <el-table
                :data="caseList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                >
                <el-table-column
                    type="index"
                    align="center"
                    width="50">
                </el-table-column>
                 <el-table-column
                    label="照片"
                    align="center"
                    prop="">
                    <template  slot-scope="props">
                        <img  @click="lookPic(props.row)" class="headImg1" :src="props.row.face_url" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                    label="违规时间"
                    align="center"
                    prop="eat_time">
                    
                </el-table-column>
                <el-table-column
                    label="就餐类型"
                    align="center"
                    >
                    <template slot-scope="props">
                    <span>{{props.row.eat_type=='breakfast'?'早餐':''}}</span>
                    <span>{{props.row.eat_type=='lunch'?'午餐':''}}</span>
                    <span>{{props.row.eat_type=='dinner'?'晚餐':''}}</span>
                    </template>
                </el-table-column>
                <!--  <el-table-column
                    label="刷卡手机"
                    align="center"
                    prop="user_tel"
                    >
                </el-table-column> -->
                <el-table-column
                    label="违规人"
                    align="center"
                    prop="user_true_name"
                    >
                </el-table-column>
                
                <!-- <el-table-column
                    label="匹配得分"
                    align="center"
                    prop="face_score"
                    >
                </el-table-column>
                <el-table-column
                    label="实际刷卡人"
                    align="center"
                    prop="borrow_user_name"
                    >
                </el-table-column> -->
                
                <el-table-column
                    label="操作"
                    width="300px"
                    align="center"
                    >
                    <template slot-scope="props">
                        <!-- <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="lookPic(props.row)">查看违规照片</el-button> -->
                        
                        <el-button  type="warning" size="mini" style="margin-left: 10px;" @click="bindingPolice(props.row)">绑定已知干警</el-button>
                        <el-button  type="warning" size="mini" style="margin-left: 10px;" @click="deleStranger(props.row)">删除</el-button>
                    </template>
                </el-table-column>
                </el-table> 
                    
            </div>

            <el-dialog
                title="绑定已知干警"
                :visible.sync="bindingDialogVisible"
                width="60%">
                <div class="block">
                    <el-select
                        v-model="officersname"
                        style="width: 200px;margin-left: 30px;"
                        filterable
                        remote
                        clearable
                        reserve-keyword
                        placeholder="请输入姓名"
                        :remote-method="remoteMethod1"
                        @focus="focus"
                        :loading="loading">
                        <el-option
                            v-for="item in officersList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                    <el-button type="warning" style="margin-left: 30px;" @click="officerssearchClick">查询</el-button>
                </div>
                <div class="tableList1">
                    <el-table
                        :data="policeList"
                        :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                        :row-style="rowStyle"
                        class="tableClass"
                        >
                        <el-table-column
                            type="index"
                            align="center"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            label="照片"
                            align="center"
                            prop="">
                            <template slot-scope="props">
                                <img :src="props.row.face_url" alt="" class="headImg">
                            </template>
                            
                        </el-table-column>
                        <el-table-column
                            label="姓名"
                            align="center"
                            prop="user_true_name">
                            
                        </el-table-column>
                        <el-table-column
                            label="是否免检"
                            align="center"
                            >
                            <template slot-scope="props">
                            <span>{{props.row.exempt=='0'?'不免检':''}}</span>
                            <span>{{props.row.exempt=='1'?'免检':''}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="用户类型"
                            align="center"
                            >
                            <template slot-scope="props">
                           <span>{{props.row.user_type=='fangke'?'访客人员':''}}</span>
                            <span>{{props.row.user_type=='yuangong'?'单位干警':''}}</span>
                            <span>{{props.row.user_type=='wuye'?'物业人员':''}}</span>
                            <span>{{props.row.user_type=='zhuchang'?'驻场人员':''}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="部门"
                            align="center"
                            prop="dept_name"
                            >
                            <template slot-scope="props">
                            <span v-for="item in props.row.userDepts">{{item.dept_name}},</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="手机号"
                            align="center"
                            prop="user_tel"
                            >
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="300px"
                            align="center"
                            >
                            <template slot-scope="props">
                                <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="bindingClick(props.row)">绑定干警</el-button>
                            </template>
                        </el-table-column>
                    </el-table> 
                    
                </div>
                <el-pagination
                    small
                    background
                    style="text-align: center;margin-top: 20px;"
                    @current-change="pageChange1"
                    :current-page.sync="pageNum1"
                    :page-size="pageSize1"
                    layout="prev, pager, next, jumper"
                    :total="total1">
                </el-pagination>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="bindingDialogVisible = false">取 消</el-button> -->
                    <el-button type="primary" @click="bindingDialogVisible = false">关 闭</el-button>
                </span>
            </el-dialog>
            <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="pageChange"
                :current-page.sync="pageNum"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        

    </div>
</template>

<script>
    import  TMap from '../../TMap';
    import md5 from 'js-md5';
    export default {
        data: function(){
            return {
                case_detail_dialog:false,
                bindingDialogVisible:false,
                policeList:[],
                case_number:'',
                options4: [],
                case_name: [],
                user_true_name:'',
                list: [],
                loading: false,
                states: [],
                date:[],
                caseList: [
                    
                ],
                exhibits:[],
                total:0,
                pageNum:1,
                pageSize:10,
                pageNum1:1,
                pageSize1:10,
                total1:0,
                lookPicSrc:'',
                eat_type:'',
                user_type:'',
                user_tel:'',
                eat_log_id:'',
                eatOptions:[
                    {
                    value: '',
                    label: '全部'
                    },
                    {
                    value: 'breakfast',
                    label: '早餐'
                    },
                    {
                    value: 'lunch',
                    label: '午餐'
                    },
                    {
                    value: 'dinner',
                    label: '晚餐'
                    },
                ],
                usertOptions:[
                    {
                    value: '',
                    label: '全部'
                    },
                    {
                    value: 'normal',
                    label: '未刷卡'
                    },
                    {
                    value: 'moshengren',
                    label: '陌生人'
                    },
                ],
                officersList:[],
                officersname:'',
                }
                
        },
        mounted() {
            this.getDataList();
            this.getNameList('');
            this.getNameList1('');
            
        },
        methods: {
            lookPic(e){
                this.lookPicSrc = '';
                this.lookPicSrc = e.face_url;
                this.case_detail_dialog = true;
            },
            // 删除陌生人
            deleStranger(row){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                
                params.append('eat_log_id',row.eat_log_id);
                
                self.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    self.$axios({
                        method: 'post',
                        url: '/log/eat-log/del',
                        data: params,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                    }).then(function(data){
                        if(data.data.code==0){
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            self.getDataList();
                        }else{
                            self.$response(data,self);
                        }
                    });
                    
                }).catch(() => {
                    self.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            // 绑定干警弹窗
            bindingPolice(res){
                var self = this;
                self.bindingDialogVisible = true;
                self.eat_log_id = res.eat_log_id;
                self.getpoliceList();
            },
            // 查询警员列表
            getpoliceList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.pageNum1); 
                params.append('pageSize',self.pageSize1); 
                
                params.append('user_true_name',self.officersname); 
                // params.append('user_tel',self.user_tel);
                params.append('user_type',"normal");

                self.$axios({
                    method: 'post',
                    url: '/user/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.policeList = data.data.data.list;
                      self.total1 = data.data.data.total;
                      
                    }else{
                      self.$response(data,self);
                    }
                 });
            },
            // 警员列表分页器
            pageChange1(){
                this.getpoliceList();
            },
            // 绑定到警员
            bindingClick(res){
                
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('eat_log_id',self.eat_log_id); 
                params.append('user_id',res.user_id); 
                self.$confirm('此操作将绑定该干警, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        self.$axios({
                            method: 'post',
                            url: '/log/eat-log/changeToYuanGong',
                            data: params,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                        }).then(function(data){
                            if(data.data.code==0){
                                self.$message({
                                    message: '绑定成功',
                                    type: 'success'
                                });
                                self.bindingDialogVisible = false;
                                self.user_true_name="";
                                self.getDataList();
                            }else{
                                self.$response(data,self);
                            }
                        });
                    }).catch(() => {
                        self.$message({
                            type: 'info',
                            message: '已取消绑定'
                        });          
                });
            },
            getConfigResult(e){
                console.log(e)
                // if(e.data==101){
                //   router.push('/readme')
                // }else if(e.data==102){
                //   router.push('/jiedurenliebiao')
                // }else if(e.data==103){
                //   router.push('/jiedurendangan')
                // }else{
                //   router.push('/jingyuanliebiao')
                // }
            },
            //案卷详情点击事件
            caseDetailClick(res){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');

                
                params.append('stock_log_id',res.stock_log_id);
                
                const loading = self.$loading({
                    lock: true,
                    text: '打印中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.6)'
                });
                self.$axios({
                    method: 'post',
                    url: '/stock/stock-log/printWord',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    
                    if(data.data.code==0){
                    loading.close();
                    self.$message({
                        type: 'success',
                        message: '已发送打印请求'
                    });
                    }else{
                    self.$response(data,self);
                    }
                });
            },
            //查询事件
            searchClick(){
                this.pageNum = 1;
                this.getDataList();
            },
            // 查询今天
            TedaysearchClick(){
                this.getToday();
            },
            getToday(){
                const self = this;
            
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var date2 = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                var endTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds()
                
                var startTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + "00" + ':' + "00" + ':' + "00"
                var finishTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + "23" + ':' + "59" + ':' + "59"
                console.log(startTime)
                console.log(finishTime)
                // if(self.date==null||self.date.length==0){
                //   var begin_time = '';
                //   var end_time = '';
                // }else{
                  var begin_time = startTime;
                  var end_time = finishTime;
                    params.append('begin_time',begin_time);
                    params.append('end_time',end_time);
                    params.append('card',0);
                    params.append('pageNum',self.pageNum);
                    params.append('pageSize',self.pageSize);
                    // params.append('user_id',self.user_true_name);
                    params.append('user_true_name',self.user_true_name);
                    params.append('eat_type',self.eat_type);
                    params.append('user_tel',self.user_tel);
                    params.append('user_type',self.user_type);

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
            officerssearchClick(){
                this.pageNum1 = 1;
                this.getpoliceList();
            },
            //补打条码
            printAgain(res){
                    var self = this;
                    var params = new URLSearchParams();
                    var token = localStorage.getItem('auth');

                    
                    params.append('exhibit_id',res.exhibit_id);
                    
                    const loading = self.$loading({
                    lock: true,
                    text: '打印中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.6)'
                    });
                    self.$axios({
                        method: 'post',
                        url: '/exhibit/exhibit/printAgain',
                        data: params,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                    }).then(function(data){
                        
                        if(data.data.code==0){
                        loading.close();
                        self.$message({
                            type: 'success',
                            message: '已发送打印请求'
                        });
                        }else{
                        self.$response(data,self);
                        }
                    });
            },
            //条码打印事件
            printClick(res){
                var self = this;
                var numCount = res.exhibits.length+1;
                this.$confirm('即将打印该案件的第'+numCount+'份案卷条码, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {

                    const loading = self.$loading({
                    lock: true,
                    text: '打印中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.6)'
                    });
                    var params = new URLSearchParams();
                    var token = localStorage.getItem('auth');

                    params.append('case_id',res.case_id);
                    params.append('exhibit_name','');
                    

                    self.$axios({
                        method: 'post',
                        url: '/exhibit/exhibit/add',
                        data: params,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                    }).then(function(data){
                        
                        if(data.data.code==0){
                        loading.close();
                        self.$message({
                            type: 'success',
                            message: '已发送打印请求'
                        });
                        self.getDataList();
                        }else{

                        self.$response(data,self);
                        loading.close();
                        }
                    });
                
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消打印'
                });          
                });
            },
            //分页器点击事件
            pageChange(){
                this.getDataList();
            },
            //分页器点击事件
            pageChange2(){

            },
            //关键字模糊查询提示
            remoteMethod(query) {
                
                if (query !== '') {
                    this.loading = true;
                    this.user_true_name = query;
                    // console.log(this.user_true_name)
                    this.getNameList(query);
                    setTimeout(() => {
                        this.loading = false;
                        this.options4 = this.list.filter(item => {
                            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                        });
                    }, 500);
                } else {
                    this.options4 = [];
                }
            },
            focusName(){
                this.getNameList('');
            },
            //关键字模糊查询提示
            getNameList(query){
                    const self = this;
                    self.user_true_name = query;
                    var params = new URLSearchParams();
                    var token = localStorage.getItem('auth');
                    // console.log(this.user_true_name)
                    params.append('user_true_name',self.user_true_name);
                    params.append('pageNum',0);
                    params.append('pageSize',100);
                    self.$axios({
                        method: 'post',
                        url: '/user/getByPage',
                        data: params,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                    }).then(function(data){
                        
                        if(data.data.code==0){
                            self.states = data.data.data.list;
                            self.list = self.states.map(item => {
                                return { value: item.user_id, label: item.user_true_name};
                            });
                            // self.options4 = self.list;
                            // console.log(self.options4)
                        }else{
                            self.$response(data,self);
                        }
                    });
            },
            //关键字模糊查询提示
            remoteMethod1(query) {
                
                if (query !== '') {
                    this.loading = true;
                    this.user_true_name = query;
                    this.getNameList1(query);
                setTimeout(() => {
                    this.loading = false;
                    this.officersList = this.list.filter(item => {
                        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    });
                }, 500);
                } else {
                    this.officersList = [];
                    console.log(this.officersList)
                }
            },
            
            //关键字模糊查询提示
            getNameList1(query){
                const self = this;
                self.officersname = query;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('user_true_name',self.officersname);
                params.append('pageNum',0);
                params.append('pageSize',100);
                params.append('user_type',"yuangong");
                self.$axios({
                    method: 'post',
                    url: '/user/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    
                    if(data.data.code==0){
                        self.states = data.data.data.list;
                        self.list = self.states.map(item => {
                            return { value: item.user_id, label: item.user_true_name};
                        });
                        self.officersList = self.list;
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            focus(){
                // console.log(this.officersname)
                
                this.getNameList1()
            },
            //获取默认列表数据
            getDataList(){
                const self = this;
            
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                if(self.date==null||self.date.length==0){
                    var begin_time = '';
                    var end_time = '';
                }else{
                    var begin_time = self.date[0];
                    var end_time = self.date[1];
                }
                    params.append('begin_time',begin_time);
                    params.append('end_time',end_time);
                    params.append('card',0);
                    params.append('pageNum',self.pageNum);
                    params.append('pageSize',self.pageSize);
                    // params.append('user_id',self.user_true_name);
                    params.append('user_true_name',self.user_true_name);
                    params.append('eat_type',self.eat_type);
                    params.append('user_tel',self.user_tel);
                    params.append('user_type',self.user_type);

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
            
            //修改单元行颜色
            rowStyle({ row, rowIndex}){
                if(rowIndex%2 ==0){
                return 'background:#eee;color:#000;'
                }else{
                return 'background:#e5e7e8;color:#000;'
                }
            },      
            
            
            
            
        }
     
    }
    window.addEventListener('message', function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          console.log('location', loc);
          localStorage.setItem('locationDes',loc.poiaddress);
          localStorage.setItem('localLat',loc.latlng.lat);
          localStorage.setItem('localLng',loc.latlng.lng);
          localStorage.setItem('isLocalChoosed',1);
        }
    }, false);
</script>

<style scoped>
    .tree{
      float: left;
      width: 20%;
      height: 600px;
      
    }
    .headImg{
        width: 120px;
        height: 140px;
    }
    .el-tree{
      background: rgba(255,215,0,0.3);
      color: #fff;
    }

    .tableClass{
      width: 100%;
      height: auto;
      background-color: #231a75;
    }
    .tableList{
      width: 99%;
      height: 560px!important;
      overflow-y: scroll;
      border:1px solid #231a75;
     /* border-radius: 20px;*/
      margin-top: 20px;
      background-color: #231a75;
    }
    .tableList::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
    }
    .tableList::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
    }
    .tableList::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
    }
    .tableList1{
        border: 1px solid #ccc!important;
        color: #000!important;
        padding-top: 50px;
        background-image: url(../../../static/img/data.jpg)!important;
        background-repeat: no-repeat!important;
        background-color: #fff!important;
        width: 99%;
        height: 560px!important;
        overflow-y: scroll;
        border:1px solid #231a75;
        /* border-radius: 20px;*/
        margin-top: 20px;
        background-color: #231a75;
    }
    .tableList1::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
    }
    .tableList1::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
    }
    .tableList1::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
    }
    .tableTitle{
      width: 200px;
      height: 60px;
      float: left;
      margin-left: 30px;
    }
    .lookPicClass{
      width: 500px;
      /* height: 500px; */
      margin: 0 auto;
      margin-left: 200px;
    }
    .headImg1{
        width: 120px;
        /* height: 130px; */
    }
    .numData{
      width: 99%;
      height: 60px;
      line-height: 60px;
      color: #fefefe;
      background-color: #231a75;
      background-image: url(../../../static/img/tableBanner.png);
    }

    /*#container {
        min-width:900px;
        min-height:607px;
        
        overflow-y: hidden;
    }*/
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
    .demonstration{
        width: 300px;
    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
    .colorRed{
      color: red;
    }
</style>