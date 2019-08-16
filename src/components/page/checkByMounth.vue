<template>
    <div>
        
        <div >
            <div class="titleBg">档案月盘点管理</div>
            

          
        </div>
        <!-- <div class="tree">
          <el-tree :data="data"    @node-click="handleNodeClick"></el-tree>
        </div> -->
        <div id="container" style="width: 100%;height: 110%;  float: right;">
          
            <el-dialog title="新增盘点任务" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="盘点类型:" label-width="120px">
                    <el-radio v-model="radio" label="1">全部盘点</el-radio>
                    <el-radio v-model="radio" label="2">自定义盘点</el-radio>
                </el-form-item>
                <el-form-item label="选择货架:" label-width="120px" v-if="radio==2?true:false">
                    <el-select v-model="shaleList" multiple placeholder="请选择" style="width:300px;">
                      <el-option
                        v-for="item in shaleDataList"
                        :key="item.shale_id"
                        :label="item.shale_name"
                        :value="item.shale_id">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNew">确 定</el-button>
              </div>
            </el-dialog>

            <el-dialog title="盘库详情" :visible.sync="resultDialog">
              <el-table
              :data="resultList"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              class="tableClass"
              style="">
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
                  label="案卷编号"
                  align="center"
                  prop="exhibit_id">
                </el-table-column>
                <el-table-column
                  label="盘点状态"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span :class="[props.row.check_status=='uncheck'?'colorRed':'']">{{props.row.check_status=='uncheck'?'未盘点':''}}{{props.row.check_status=='checked'?'已盘点':''}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="300"
                  align="center"
                  >
                  <template slot-scope="props" v-if="props.row.check_status=='checked'?false:true">
                    <el-button size="mini" type="warning" style="margin-left: 10px;" @click="dealClick(props.row,'in')">
                    手动入库</el-button>
                    <el-button size="mini" type="warning" style="margin-left: 10px;" @click="dealClick(props.row,'miss')">
                    丢失</el-button>
                    <el-button size="mini" type="warning" style="margin-left: 10px;" @click="dealClick(props.row,'destory')">
                    损坏</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="pageNumChange2"
                :current-page.sync="pageNum2"
                :page-size="pageSize2"
                layout="prev, pager, next, jumper"
                :total="total2">
          </el-pagination> 
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="resultDialog = false">关 闭</el-button>
              </div>
            </el-dialog>
            
          
          <div class="tableList">
            <el-table
              :data="tableData5"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              class="tableClass"
              style="">
              <el-table-column
                type="index"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                label="盘点名称"
                align="center"
                prop="check_name">
              </el-table-column>
              <el-table-column
                label="创建时间"
                align="center"
                prop="check_create_time">
              </el-table-column>
              <el-table-column
                label="盘点状态"
                align="center"
                >
                <template slot-scope="props">
                  <span :class="[props.row.check_status=='uncheck'?'colorRed':'']">{{props.row.check_status=='uncheck'?'未盘点':''}}{{props.row.check_status=='checked'?'已盘点':''}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="总案卷数量"
                align="center"
                >
                <template slot-scope="props">
                  <span :class="">{{props.row.check_quantity+props.row.uncheck_quantity+props.row.deal_quantity}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="已盘点案卷数量"
                align="center"
                prop="check_quantity">
              </el-table-column>
              <el-table-column
                label="未盘点案卷数量"
                align="center"
                prop="uncheck_quantity">
              </el-table-column>
              <el-table-column
                label="已处理异常案卷数量"
                align="center"
                prop="deal_quantity">
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                >
                <template slot-scope="props">
                  <el-button size="mini" type="warning" style="margin-left: 30px;" @click="resultClick(props.row)">查看结果</el-button>
                </template>
              </el-table-column>
              
             
            </el-table> 
                
          </div>
          <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="pageNumChange1"
                :current-page.sync="pageNum1"
                :page-size="pageSize1"
                layout="prev, pager, next, jumper"
                :total="total1">
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
              options4: [],
              value9: [],
              list: [],
              loading: false,
              states: [],
              dialogFormVisible:false,
              input:'',
              date:[],
              form:{},
              tableData5:[],
              pageSize1:10,
              pageNum1:1,
              total1:0,
              pageSize2:10,
              pageNum2:1,
              total2:0,
              shaleDataList: [],
              shaleList: [],
              radio:'1',
              resultDialog:false,
              resultList:[]
            }
              
      },
      mounted() {
          this.getShaleData();
          this.getDataList();
      },
      methods: {
          dealClick(res1,res2){
                const self = this;
                this.$confirm('即将处理该案卷, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  var params = new URLSearchParams();
                  var token = localStorage.getItem('auth');
                  params.append('check_line_id',res1.check_line_id);
                  params.append('deal_status',res2);
                 
                  self.$axios({
                      method: 'post',
                      url: '/stock/stock/updateCheckLine',
                      data: params,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                  }).then(function(data){
                      if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '处理成功!'
                        });
                      }else{
                        self.$response(data,self);
                      }
                  });      
                  
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消操作'
                  });          
                });
                
          },
          resultClick(res){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('check_head_id',res.check_head_id);
                params.append('pageNum',self.pageNum2);
                params.append('pageSize',self.pageSize2);
                self.$axios({
                    method: 'post',
                    url: '/stock/stock/getCheckLines',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.resultList = data.data.data.list;
                      self.total2 = data.data.data.total;
                      self.resultDialog = true;
                    }else{
                      self.$response(data,self);
                    }
                 });      
            
          },
          addPandian(){
            this.dialogFormVisible = true;
          },
          pageNumChange1(){

          },
          pageNumChange2(){

          },
          //修改单元行颜色
          rowStyle({ row, rowIndex}){
            if(rowIndex%2 ==0){
              return 'background:#eee;color:#000;'
            }else{
             return 'background:#e5e7e8;color:#000;'
            }
          },   
          remoteMethod(query) {
            if (query !== '') {
              this.loading = true;
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
          searchClick(){
            this.getDataList();
          },
          addNew(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                if(self.shaleList.length==0){
                  var arrCount = '';
                }else{
                  var arrCount = self.shaleList.join(',');
                }
               
                params.append('shale_id',arrCount);
                
                self.$axios({
                    method: 'post',
                    url: '/stock/stock/createCheck',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.$message({
                          type: 'success',
                          message: '盘点任务创建成功'
                      });
                      self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });      
          },
          //姓名模糊查询提示
          getNameList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('ad_user_true_name',self.name);
                self.$axios({
                    method: 'post',
                    url: '/stop/getAdUserNames',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.states = data.data.data;
                        self.list = self.states.map(item => {
                          return { value: item.value, label: item.value};
                        });
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //获取货架信息
          getShaleData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',1);
                params.append('pageSize',10000);
                     
                self.$axios({
                    method: 'post',
                    url: '/shale/shale/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.shaleDataList = data.data.data.list;
                       
                    }else{
                      self.$response(data,self);
                    }
                 });      
          },
          //默认获取
          getDataList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.pageNum1);
                params.append('pageSize',self.pageSize1); 
                params.append('check_head_id','');
                params.append('check_type','month');
                     
                self.$axios({
                    method: 'post',
                    url: '/stock/stock/getCheckLog',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.tableData5 = data.data.data.list;
                       self.total1 =  data.data.data.total;
                    }else{
                      self.$response(data,self);
                    }
                 });      
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
      height: 575px!important;
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