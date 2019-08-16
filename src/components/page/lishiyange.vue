<template>
    <div>
        
        <div >
            <div class="titleBg">历史沿革</div>
            <div class="block">
                
                <el-date-picker
                  v-model="years"
                  align="right"
                  style="width: 250px;margin-left: 30px;"
                  type="year"
                  value-format="yyyy"
                  placeholder="选择年">
                </el-date-picker>
                <el-date-picker
                  v-model="months"
                  type="month"
                  value-format="yyyy-MM"
                  style="width: 250px;margin-left: 30px;"
                  placeholder="选择月">
                </el-date-picker>
                <!-- 关键词联想组建 -->
                <!-- <el-select
                  v-model="case_name"
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
                </el-select> -->

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
                <el-button type="warning" style="margin-left: 30px;" @click="addHistoryClick">历史沿革</el-button>
            </div>

          
        </div>
        <!-- <div class="tree">
          <el-tree :data="data"    @node-click="handleNodeClick"></el-tree>
        </div> -->
        <el-dialog title="借阅总结" :visible.sync="addHisDialog">
            <el-upload
              style="text-align:center;"
              class="upload-demo"
              drag
              name="file"
              :on-success="uploadSuccess"
              :action="uploadUrl"
              :headers="myHeaders"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传word/pdf/excle文件，且不超过500kb</div>
            </el-upload>
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
              
              :data="bumenList"
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
                label="文章标题"
                align="center"
                prop="file_name">
                <!-- <template slot-scope="props">
                  <span>签到考勤</span>
                </template> -->
              </el-table-column>
              <el-table-column
                label="上传时间"
                align="center"
                prop="upload_time"
                
                >
              </el-table-column>
              <el-table-column
                label="上传人"
                align="center"
                prop="upload_user_name"
                >
              </el-table-column>
              
              <el-table-column
                label="操作"
                width="300px"
                align="center"
                >
                <template slot-scope="props">
                  <el-button  type="warning" size="mini" style="margin-left: 0px;" @click="downLoad(props.row)">下载</el-button>
                  <el-button  type="warning" size="mini" style="margin-left: 20px;" @click="delClick(props.row)">删除</el-button>
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
              years:'2019',
              months:'2019-04',
              case_number:'',
              options4: [],
              case_name: [],
              list: [],
              loading: false,
              states: [],
              bumenList:[],
              caseList: [
                {
                  case_name:2
                }
              ],
              
              exhibits:[{

              }],
              total:0,
              pageNum:1,
              pageSize:10,
              total2:0,
              pageNum2:1,
              pageSize2:10,
              addHisDialog:false,
              uploadUrl:'',
              myHeaders:''
            }
              
      },
      mounted() {
          this.getDataList();
          // this.getNameList();
          var myHeaders = localStorage.getItem('auth');
          var uploadUrl = this.$axios.defaults.baseURL+'/file/addHistory';
          this.uploadUrl = uploadUrl;
          var token = {"kf-token":myHeaders};
          this.myHeaders = token;
      },
      methods: {
          // cellClick(row, column, cell, event){
          //   this.addHisDialog = true;
          //   console.log(row)
          //   console.log(column.property)
          // },
          uploadSuccess(response){
            if(response.code==0){
              this.$message({
                type: 'success',
                message: '上传成功'
              });
              this.addHisDialog = false;
              this.getDataList();
            }else{
              this.$message({
                type: 'error',
                message: '上传失败'
              });
            }
            
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
          downLoad(res){
            window.open(res.file_url)
            // this.$socketApi.sendSock('text',this.getConfigResult);
            // this.exhibits = res.exhibits;
            // this.case_detail_dialog = true;
          },
          //查询事件
          searchClick(){
            console.log(this.months)
            console.log(this.years)
            // this.getDataList();
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
          delClick(res){
            var self = this;
            
            this.$confirm('即将删除该文章, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

                // const loading = self.$loading({
                //   lock: true,
                //   text: '打印中',
                //   spinner: 'el-icon-loading',
                //   background: 'rgba(0, 0, 0, 0.6)'
                // });
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');

                params.append('file_id',res.file_id);
                // params.append('exhibit_name',res.case_name);
                

                self.$axios({
                    method: 'post',
                    url: '/file/del',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                      // loading.close();
                      self.$message({
                        type: 'success',
                        message: '删除成功'
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
                message: '已取消删除'
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
                self.case_name = query;
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
          //获取默认列表数据
          getDataList(){
                const self = this;
               
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');

                params.append('pageNum',self.pageNum);
                params.append('pageSize',self.pageSize);
                params.append('file_type','history');
                

                self.$axios({
                    method: 'post',
                    url: '/file/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.bumenList = data.data.data.list;
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