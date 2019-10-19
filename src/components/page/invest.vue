<template>
    <div>
        
        <div >
            <!-- <div class="titleBg">案件档案归档操作记录</div> -->
            <div class="block">
                
                <el-select v-model="user_type" placeholder="请选择类型" style="width: 180px;margin-left: 30px;">
                  <el-option
                    v-for="item in eatOptions"
                    :key="item.type_value"
                    :label="item.type_name"
                    :value="item.type_value">
                  </el-option>
                </el-select>
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="user_true_name"
                  style="width: 250px;margin-left: 30px;"
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
                <el-date-picker
                  v-model="month"
                  style="margin-left: 20px;width:220px;"
                  type="month"
                  value-format="yyyy-MM"
                  placeholder="请选择月份">
                </el-date-picker>
                
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
                <el-button type="warning" style="margin-left: 100px;" @click="downClick">导出报表</el-button>
            </div>

          
        </div>
        <!-- <div class="tree">
          <el-tree :data="data"    @node-click="handleNodeClick"></el-tree>
        </div> -->
        <el-dialog title="就餐详情" :visible.sync="case_detail_dialog">
          <el-table
              :data="eatList"
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
                label="姓名"
                align="center"
                prop="user_true_name">
                
              </el-table-column>
              <el-table-column
                label="充值时间"
                align="center"
                width="200"
                prop="log_time"
                >
                <!-- <template slot-scope="props">
                  <span v-bind:class="[props.row.stock_status=='in'?'':'colorRed']">{{props.row.stock_status=='in'?'已入库':'待入库'}}</span>
                </template> -->
              </el-table-column>
              <el-table-column
                label="充值前余额"
                align="center"
                >
                <template slot-scope="props">
                  <span >{{props.row.before_amount/100}}元</span>
                </template>
              </el-table-column>
              <el-table-column
                label="充值金额"
                align="center"
                >
                <template slot-scope="props">
                  <span >{{props.row.quantity/100}}元</span>
                </template>
              </el-table-column>
              <el-table-column
                label="充值后余额"
                align="center"
                >
                <template slot-scope="props">
                  <span >{{props.row.after_amount/100}}元</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作员"
                align="center"
                prop="operator_user_name">
                
              </el-table-column>
            </el-table> 
            <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="pageChange2"
                :current-page.sync="pageNum2"
                :page-size="pageSize2"
                layout="prev, pager, next, jumper"
                :total="total2">
          </el-pagination>
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
                label="姓名"
                align="center"
                prop="user_true_name">
                
              </el-table-column>
              <el-table-column
                label="时间"
                align="center"
                prop="month"
                >
              </el-table-column>
              
              <el-table-column
                label="充值次数"
                align="center"
                prop="number"
                >
              </el-table-column>
              <el-table-column
                label="充值总金额"
                align="center"
                prop="number"
                >
                <template slot-scope="props">
                  <span>{{props.row.total/100}}元</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="300px"
                align="center"
                >
                <template slot-scope="props">
                  <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="caseDetailClick(props.row)">详细记录</el-button>
                </template>
              </el-table-column>
              
              
            </el-table> 
                
          </div>
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
              case_number:'',
              options4: [],
              case_name: [],
              list: [],
              month:'',
              loading: false,
              states: [],
              date:[],
              caseList: [
                
              ],
              exhibits:[],
              total:0,
              pageNum:1,
              pageSize:10,
              total2:0,
              pageNum2:1,
              pageSize2:5,
              user_true_name:'',
              eatList:[],
              user_id:'',
              user_tel:'',
              eatOptions:[
                    {
                        type_value:'yuangong',
                        type_name:'单位干警'
                    },
                    {
                        type_value:'zhuchang',
                        type_name:'驻场人员'
                    },
                    {
                        type_value:'wuye',
                        type_name:'物业人员'
                    },
                    {
                        type_value:'fangke',
                        type_name:'访客人员'
                    },{
                        type_value:'',
                        type_name:'全部'
                    },
              ],
              user_type:''
            }
              
      },
      mounted() {
          this.getDataList();
          
      },
      methods: {
          downClick(){
            var self = this;
            if(self.month==''||self.month==null){
              window.open(self.$axios.defaults.baseURL+'/exoprtBankLog?bank_type=add&&user_type='+self.user_type+'&user_true_name='+self.user_true_name);
            }else{
              window.open(self.$axios.defaults.baseURL+'/exoprtBankLogByMonth?bank_type=add&&user_type='+self.user_type+'&user_true_name='+self.user_true_name+'&month='+self.month);
            }
            
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
                self.user_id = res;
                if(self.date==null||self.date.length==0){
                  var begin_time = '';
                  var end_time = '';
                }else{
                  var begin_time = self.date[0];
                  var end_time = self.date[1];
                }
                
                // params.append('begin_time',begin_time);
                // params.append('end_time',end_time);
                params.append('month',res.month);
                params.append('pageNum',self.pageNum2);
                params.append('pageSize',self.pageSize2);
                params.append('user_id',res.user_id);
                params.append('bank_type','add');
                // params.append('eat_type',self.eat_type);
                // params.append('user_tel',self.user_tel);
                
                // const loading = self.$loading({
                //   lock: true,
                //   text: '加载中...',
                //   spinner: 'el-icon-loading',
                //   background: 'rgba(0, 0, 0, 0.6)'
                // });
                self.$axios({
                    method: 'post',
                    url: '/bank/bank-log/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                      self.eatList = data.data.data.list;
                      self.case_detail_dialog = true;
                      self.total2 = data.data.data.total;
                      // loading.close();
                      // self.$message({
                      //   type: 'success',
                      //   message: '已发送打印请求'
                      // });
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
            //查询事件
            searchClick(){
                var self = this;
                this.pageNum = 1;
                this.getDataList();
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
            var self = this;
            this.caseDetailClick(self.user_id)
          },
          //关键字模糊查询提示
          remoteMethod(query) {
            if (query !== '') {
              this.loading = true;
              this.user_true_name = query;
              this.getNameList(query);
              setTimeout(() => {
                this.loading = false;
                this.options4 = this.list.filter(item => {
                  return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
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
                self.case_name = query;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
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
                        self.options4 = self.list
                    }else{
                      self.$response(data,self);
                    }
                 });
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
                params.append('month',self.month);
                params.append('pageNum',self.pageNum);
                params.append('pageSize',self.pageSize);
                // params.append('user_id',self.user_true_name);
                params.append('user_true_name',self.user_true_name);
                params.append('user_tel',self.user_tel);
                params.append('bank_type','add');
                params.append('user_type',self.user_type);

                self.$axios({
                    method: 'post',
                    url: '/bank/bank-log/getByMonth',
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
    
    .tableTitle{
      width: 200px;
      height: 60px;
      float: left;
      margin-left: 30px;
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