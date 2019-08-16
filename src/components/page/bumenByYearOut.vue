<template>
    <div>
        
        <div >
            <div class="titleBg">部门年借阅梳理</div>
            <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  clearable
                  v-model="user_true_name"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="选择部门"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

                <!-- <el-date-picker
                  style="margin-left: 20px;width:420px;"
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker> -->
                
                <el-button type="warning" style="margin-left: 50px;" @click="searchClick">查询</el-button>
                <!-- <el-button type="warning" style="margin-left: 30px;" @click="addHistoryClick">历史案卷导入</el-button> -->
            </div>

          
        </div>
        <!-- <div class="tree">
          <el-tree :data="data"    @node-click="handleNodeClick"></el-tree>
        </div> -->
        <el-dialog title="案件详情" :visible.sync="addHisDialog">
            <el-table
              :data="caseList1"
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
                label="案件编号"
                align="center"
                prop="case_bh">
              </el-table-column>
              <el-table-column
                label="案件名称"
                align="center"
                prop="case_name">
              </el-table-column>
              <el-table-column
                label="案件描述"
                align="center"
                show-overflow-tooltip
                prop="case_desc">
              </el-table-column>
              <el-table-column
                label="承办人"
                align="center"
                prop="case_take_user_name">
              </el-table-column>
              <el-table-column
                label="案件状态"
                align="center"
                prop="case_type"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                width="300px"
                align="center"
                >
                <template slot-scope="props">
                  <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="caseDetailClick(props.row)">案卷信息</el-button>
                </template>
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
        <el-dialog title="案卷详情" :visible.sync="case_detail_dialog">
          <el-table
              :data="exhibits"
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
                label="案卷编号"
                align="center"
                prop="exhibit_id">
                <!-- <template slot-scope="props">
                  <span>签到考勤</span>
                </template> -->
              </el-table-column>
              <el-table-column
                label="案卷状态"
                align="center"
                >
                <template slot-scope="props">
                  <span v-bind:class="[props.row.stock_status=='in'?'':'colorRed']">{{props.row.stock_status=='in'?'已入库':'待入库'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="存放位置"
                align="center"
                prop="cell_name"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                width="200px"
                align="center"
                >
                <template slot-scope="props">
                  <el-button  type="warning" size="mini" style="margin-left: 20px;" @click="printAgain(props.row)">补打条码</el-button>
                </template>
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
              v-loading="tableLoading"
              @cell-click="cellClick"
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
                label="部门"
                align="center"
                prop="dept_name">
                <!-- <template slot-scope="props">
                  <span>签到考勤</span>
                </template> -->
              </el-table-column>
              <el-table-column
                label="时间"
                align="center"
                prop="year">
                <!-- <template slot-scope="props">
                  <span>签到考勤</span>
                </template> -->
              </el-table-column>
              <el-table-column
                label="借阅数量"
                align="center"
                prop="out_cases_quantity"
                
                >
              </el-table-column>
              <el-table-column
                label="待归还数量"
                align="center"
                prop="out_cases_quantity"
                >
              </el-table-column>
              <el-table-column
                label="已归还数量"
                align="center"
                style="color:red;"
                prop="back_cases_quantity"
                >
              </el-table-column>
              
              
              <!-- <el-table-column
                label="操作"
                width="300px"
                align="center"
                >
                <template slot-scope="props">
                  <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="caseDetailClick(props.row)">案卷信息</el-button>
                  <el-button  type="warning" size="mini" style="margin-left: 20px;" @click="printClick(props.row)">新增条码</el-button>
                </template>
              </el-table-column> -->
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
              tableLoading:false,
              case_detail_dialog:false,
              years:'2019',
              months:'2019-04',
              case_number:'',
              options4: [],
              user_true_name: [],
              list: [],
              loading: false,
              states: [],
              bumenList:[{
                case_name:1
              }],
              caseList: [
                {
                  case_name:2
                }
              ],
              caseList1:[],
              exhibits:[{

              }],
              total:0,
              pageNum:1,
              pageSize:10,
              total2:0,
              pageNum2:1,
              pageSize2:10,
              countYear:'',
              countPproperty:'',
              counyUserId:'',
              countDeptId:'',
              addHisDialog:false,
              uploadUrl:'',
              myHeaders:'',
              countYear:'',
              countPproperty:'',
              counyUserId:'',
              countDeptId:'',
            }
              
      },
      mounted() {
          this.getDataList();
          this.getNameList('');
          var myHeaders = localStorage.getItem('auth');
          var uploadUrl = this.$axios.defaults.baseURL+'/cases/cases/addByExcel';
          this.uploadUrl = uploadUrl;
          var token = {"kf-token":myHeaders};
          this.myHeaders = token;
      },
      methods: {
          cellClick(row, column, cell, event){
            const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.pageNum2);
                params.append('pageSize',self.pageSize2);
                self.countYear = row.year;
                self.countPproperty = column.property;
                params.append('year_time',self.countYear);
                params.append('query_type',self.countPproperty);

                if(row.user_id!=null){
                  self.counyUserId = row.user_id;
                  params.append('user_id',self.counyUserId);
                }else if(row.dept_id!=null){
                  self.countDeptId = row.dept_id;
                  params.append('dept_id',self.countDeptId);
                }
                self.$axios({
                    method: 'post',
                    url: '/stock/stock-log/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                      self.caseList1 = data.data.data.list;
                      self.total2 = data.data.data.total;
                      self.addHisDialog = true;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          cellClick2(){
            const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.pageNum2);
                params.append('pageSize',self.pageSize2);
                
                params.append('year_time',self.countYear);
                params.append('query_type',self.countPproperty);
                params.append('dept_id',self.countDeptId);
                
                self.$axios({
                    method: 'post',
                    url: '/stock/stock-log/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                      self.caseList1 = data.data.data.list;
                      self.total2 = data.data.data.total;
                      self.addHisDialog = true;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          uploadSuccess(){
            this.$message({
              type: 'success',
              message: '上传成功'
            });
            this.addHisDialog = false;
            this.getDataList();
          },
          addHistoryClick(){
            this.addHisDialog = true;
          },
          // getConfigResult(e){
          //   console.log(e)
          //   // if(e.data==101){
          //   //   router.push('/readme')
          //   // }else if(e.data==102){
          //   //   router.push('/jiedurenliebiao')
          //   // }else if(e.data==103){
          //   //   router.push('/jiedurendangan')
          //   // }else{
          //   //   router.push('/jingyuanliebiao')
          //   // }
          // },
          //案卷详情点击事件
          caseDetailClick(res){
            // this.$socketApi.sendSock('text',this.getConfigResult);
            this.exhibits = res.exhibits;
            this.case_detail_dialog = true;
          },
          //查询事件
          searchClick(){
            console.log(this.months)
            console.log(this.years)
            console.log(this.user_true_name)
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
                params.append('exhibit_name',res.case_name);
                

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
            this.cellClick2();
          },
          //关键字模糊查询提示
          remoteMethod(query) {
            if (query !== '') {
              this.loading = true;
              this.getNameList(query);
              setTimeout(() => {
                this.loading = false;
                this.options4 = this.list.filter(item => {
                  return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
              }, 200);
            } else {
              this.options4 = [];
            }
          },
          
          //关键字模糊查询提示
          getNameList(query){
                const self = this;
                self.user_true_name = query;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',1);
                params.append('pageSize',10);
                params.append('dept_name',query);
                self.$axios({
                    method: 'post',
                    url: '/dept/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.states = data.data.data.list;
                        self.list = self.states.map(item => {
                          return { value: item.dept_id, label: item.dept_name};
                        });
                        self.options4 = self.list;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //获取默认列表数据
          getDataList(){
                const self = this;
                self.tableLoading = true;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.pageNum);
                params.append('pageSize',self.pageSize);
                params.append('dept_id',self.user_true_name);
                
                
                self.$axios({
                    method: 'post',
                    url: '/chart/getOutCaseDeptPerYear',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.caseList = data.data.data.list;
                        self.total = data.data.data.total;
                        self.tableLoading = false;
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
      height: 460px!important;
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