<template>
    <div>
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane v-if="false" name="location1">
          <span slot="label"><i class="el-icon-date"></i>区域设置</span>
            <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
            </div>

            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="考勤人员"
                  align="center"
                  prop="ad_user_true_name">
                  <!-- <template slot-scope="props">
                    <span>签到考勤</span>
                  </template> -->
                </el-table-column>
                
               
                <el-table-column
                  label="考勤结果"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span :class="[props.row.ad_user_sign_status==1?'':'colorRed']">{{props.row.ad_user_sign_status==0?'未签到':''}}{{props.row.ad_user_sign_status==1?'签到':''}}{{props.row.ad_user_sign_status==2?'迟到':''}}{{props.row.ad_user_sign_status==3?'早退':''}}</span>
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
                  :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="false" name="location2">
          <span slot="label"><i class="el-icon-date"></i>楼宇设置</span>
          <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
            </div>

            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="考勤人员"
                  align="center"
                  prop="ad_user_true_name">
                  <!-- <template slot-scope="props">
                    <span>签到考勤</span>
                  </template> -->
                </el-table-column>
                
                
                <el-table-column
                  label="考勤结果"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span :class="[props.row.ad_user_sign_status==1?'':'colorRed']">{{props.row.ad_user_sign_status==0?'未签到':''}}{{props.row.ad_user_sign_status==1?'签到':''}}{{props.row.ad_user_sign_status==2?'迟到':''}}{{props.row.ad_user_sign_status==3?'早退':''}}</span>
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
                  :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="false" name="location3">
          <span slot="label"><i class="el-icon-date"></i>楼层设置</span>
          <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
            </div>

            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="考勤人员"
                  align="center"
                  prop="ad_user_true_name">
                  <!-- <template slot-scope="props">
                    <span>签到考勤</span>
                  </template> -->
                </el-table-column>
               
               
                <el-table-column
                  label="考勤结果"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span :class="[props.row.ad_user_sign_status==1?'':'colorRed']">{{props.row.ad_user_sign_status==0?'未签到':''}}{{props.row.ad_user_sign_status==1?'签到':''}}{{props.row.ad_user_sign_status==2?'迟到':''}}{{props.row.ad_user_sign_status==3?'早退':''}}</span>
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
                  :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="false" name="location4">
          <span slot="label"><i class="el-icon-date"></i>房间设置</span>
          <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
            </div>

            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="考勤人员"
                  align="center"
                  prop="ad_user_true_name">
                  <!-- <template slot-scope="props">
                    <span>签到考勤</span>
                  </template> -->
                </el-table-column>

                <el-table-column
                  label="考勤结果"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span :class="[props.row.ad_user_sign_status==1?'':'colorRed']">{{props.row.ad_user_sign_status==0?'未签到':''}}{{props.row.ad_user_sign_status==1?'签到':''}}{{props.row.ad_user_sign_status==2?'迟到':''}}{{props.row.ad_user_sign_status==3?'早退':''}}</span>
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
                  :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="false"  name="location5">
          <span slot="label"><i class="el-icon-date"></i>房内布局设置</span>
          <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
            </div>

            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="考勤人员"
                  align="center"
                  prop="ad_user_true_name">
                  <!-- <template slot-scope="props">
                    <span>签到考勤</span>
                  </template> -->
                </el-table-column>

                <el-table-column
                  label="考勤结果"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span :class="[props.row.ad_user_sign_status==1?'':'colorRed']">{{props.row.ad_user_sign_status==0?'未签到':''}}{{props.row.ad_user_sign_status==1?'签到':''}}{{props.row.ad_user_sign_status==2?'迟到':''}}{{props.row.ad_user_sign_status==3?'早退':''}}</span>
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
                  :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane name="location6">
          <span slot="label"><i class="el-icon-date"></i>存储设备设置</span>
          <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
                <el-button type="warning" style="margin-left: 30px;" @click="addNewClick">新增设备</el-button>
                
            </div>
            <el-dialog title="新增设备" :visible.sync="addNewShebei">
              <el-form :model="form" :inline="true" >
                <el-form-item label="设备名称" label-width="120px">
                  <el-input style="width:200px;" v-model="form.shale_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备行数" >
                  <el-input style="width:200px;" v-model="form.hang" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备列数" >
                  <el-input style="width:200px;" v-model="form.lie" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addNewShebei = false">取 消</el-button>
                <el-button type="primary" @click="sureToAddNewForShebei">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog title="条码打印" :visible.sync="printAgain">
              <el-form :model="againForm"  >
                <el-form-item label="打印类型" >
                    <el-radio v-model="radio" label="1">全部打印</el-radio>
                    <el-radio v-model="radio" label="2">单项打印</el-radio>
                </el-form-item>
                <el-form-item v-if="radio==1?false:true" label="设备行数" >
                  <el-input style="width:200px;" v-model="againForm.hang" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="radio==1?false:true" label="设备列数" >
                  <el-input style="width:200px;" v-model="againForm.lie" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="printAgain = false">取 消</el-button>
                <el-button type="primary" @click="sureToPrint">确 定</el-button>
              </div>
            </el-dialog>
            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="设备名称"
                  align="center"
                  prop="shale_name">
                </el-table-column>
                <el-table-column
                  label="设备状态"
                  align="center"
                  >
                  <template slot-scope="props">
                    <span>使用中</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="创建时间"
                  align="center"
                  prop="shale_name">
                </el-table-column>
                <el-table-column
                  label="操作"
                  align="center"

                  >
                  <template slot-scope="props">
                    <el-button size="mini" type="warning" style="margin-left: 30px;" @click="printAgainClick(props.row)">条码打印</el-button>
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
          </div>
        </el-tab-pane>
        <el-tab-pane name="location7" v-if="false">
          <span slot="label"><i class="el-icon-date"></i>设备位置设置</span>
          <div class="block">
                <!-- 关键词联想组建 -->
                <el-select
                  v-model="value9"
                  style="width: 250px;margin-left: 30px;"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
            </div>

            <div id="container" style="width: 100%;height: 110%;  float: right;">
            <div class="tableList">
              <el-table
                :data="areaList"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="考勤人员"
                  align="center"
                  prop="ad_user_true_name">
                  <!-- <template slot-scope="props">
                    <span>签到考勤</span>
                  </template> -->
                </el-table-column>

                <el-table-column
                  label="考勤结果"
                  align="center"
                  >
                  
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
                  :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import  TMap from '../../TMap';
  import md5 from 'js-md5';
  export default {
      data: function(){
          return {
              shale_id_count:'',
              radio:'1',
              value9:[],  
              activeName:'location6',
              areaList:[],
              addNewShebei:false,
              againForm:{},
              form:{
                shale_name:''
              },
              
              printAgain:false,
              options4: [],
              loading:false,
              pageNum1:1,
              pageSize1:10,
              total1:0,

            }
              
      },
      mounted() {
          
         this.getDataList();
      },
      methods: {
          sureToPrint(res){
                const self = this;
                if(this.radio==1){
                  var type = 'shale';
                  var hang = '';
                  var lie = '';
                }else{
                  var type = 'cell'
                  var hang = self.againForm.hang;
                  var lie = self.againForm.lie;
                }
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('print_type',type);
                params.append('shale_id',self.shale_id_count);
                params.append('hang',hang);
                params.append('lie',lie);
                

                self.$axios({
                    method: 'post',
                    url: '/shale/shale/printShaleCode',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                      self.$message({
                          type: 'success',
                          message: '打印成功'
                      });
                      self.printAgain = false;
                      self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          printAgainClick(res){
            this.printAgain = true;
            console.log(res)
            this.shale_id_count = res.shale_id;
          },
          sureToAddNewForShebei(){
                const self = this;
                
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('shale_name',self.form.shale_name);
                params.append('location_id',1);
                params.append('floor_id',1);
                params.append('room_id',1);
                params.append('hang',self.form.hang);
                params.append('lie',self.form.lie);

                self.$axios({
                    method: 'post',
                    url: '/shale/shale/add',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                      self.$message({
                          type: 'success',
                          message: '新增成功'
                      });
                      self.addNewShebei = false;
                      self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //
          searchClick(){

          },
          addNewClick(){
            this.addNewShebei = true;
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
          getDataList(){
                const self = this;
                
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.pageNum1);
                params.append('pageSize',self.pageSize1);
                self.$axios({
                    method: 'post',
                    url: '/shale/shale/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.areaList = data.data.data.list;
                        self.total1 = data.data.data.total;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //翻页事件
          pageChange1(){

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
      height: 510px!important;
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