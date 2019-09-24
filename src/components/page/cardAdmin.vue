<template>
    <div>
        
        <div >

            <div class="block">
               
              <!-- <el-select 
                clearable 
                v-model="user_true_name" 
                style="height:40px;" 
                remote 
                reserve-keyword 
                :remote-method="remoteMethod" 
                :loading="loading" 
                filterable 
                placeholder="姓名查询">
                  <el-option
                    style="height:40px;"
                    v-for="item,index in userNameList"
                    :key="index"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select> -->
                
                <el-input
                    clearable
                    placeholder="就餐卡号查询"
                    style="width: 200px;margin-left: 10px;"
                    v-model="user_tel"
                    clearable>
                </el-input>

                <el-select v-model="user_type" placeholder="就餐卡类型" style="width: 180px;margin-left: 30px;">
                  <el-option
                    clearable
                    v-for="item in userTypeList"
                    :key="item.type_value"
                    :label="item.type_name"
                    :value="item.type_value">
                  </el-option>
                </el-select>
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
                <!-- <el-button type="primary" style="margin-left: 80px;" @click="importUsers = true">批量导入</el-button> -->
                <!-- <el-button type="primary" style="margin-left: 60px;" @click="downLoadFile">导入模板下载</el-button> -->
                <el-button type="primary" style="margin-left: 60px;" @click="addUserNew">新增</el-button>
                
            </div>

          
        </div>
        <div id="container" style="width: 100%;height: 110%; margin-top: 20px;">
          <el-dialog
            title="人员批量导入"
            :visible.sync="importUsers"
            width="40%"
            style="text-align:center;"
            >
            <el-upload
              class="upload-demo"
              drag
              :action="addManyUserUploadUrl"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button @click="importUsers = false">取 消</el-button>
              <el-button type="primary" @click="importUsers = false">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="新增就餐卡"
            :visible.sync="addUser"
            >
                  <el-form ref="form" :model="form" label-width="120px" label-position="left" style="margin-left:20px;">
                     
                      <el-form-item label="手机卡号" style="display: inline-block;">
                        <el-input v-model="form.card_num" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      
                      <el-form-item label="就餐卡类型" style="display: inline-block;margin-left:72px;">
                        <el-select  filterable v-model="form.card_type" placeholder="请选择" style="width:208px;float: left;">
                          <el-option
                            v-for="item in userTypeList"
                            :key="item.type_value"
                            :label="item.type_name"
                            :value="item.type_value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      
                    </el-form>            
            <span slot="footer" class="dialog-footer">
              <el-button @click="addUser = false">取 消</el-button>
              <el-button type="primary" @click="addUserClick">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog  title="修改用户资料" :visible.sync="dialogFormVisible">
                <el-form ref="form" :model="form" label-width="120px" label-position="left" style="margin-left:20px;">
                      
                      <el-form-item label="手机卡号" style="display: inline-block;">
                        <el-input v-model="form.card_num" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      
                      <el-form-item label="就餐卡类型" style="display: inline-block;margin-left:72px;" >
                        <el-select  filterable v-model="form.card_type" placeholder="请选择" style="width:208px;float: left;">
                          <el-option
                            v-for="item in userTypeList"
                            :key="item.type_value"
                            :label="item.type_name"
                            :value="item.type_value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      
                    </el-form>         

              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureToChange">确定修改</el-button>
              </div>
          </el-dialog>
          <div class="tableList">
            <el-table
              :data="tableData5"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              row-key="user_card_id"
              class="tableClass"
              style="">
              <el-table-column
                type="index"
                align="center"
                >
              </el-table-column>
              
              
              
              <el-table-column
                label="手机卡号"
                align="center"
                prop="card_num">
              </el-table-column>
              <el-table-column
                label="就餐卡类型"
                align="center"
                >
                <template slot-scope="props">
                  <span>{{props.row.card_type=='normal'?'普通':''}}</span>
                  <span>{{props.row.card_type=='once'?'临时':''}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center">
                <template slot-scope="props">
                  <el-button
                  size="mini"
                  @click="updataClick(props.row)">修改</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleEdit(props.row)">删除</el-button>
                </template>
              </el-table-column>
              
             
            </el-table> 
                
          </div>
          <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="9"
                layout="prev, pager, next, jumper"
                :total="total">
          </el-pagination>
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
              user_type:'',
              face_url: '',
              user_tel:'',
              loading:false,
              user_true_name:'',
              addManyUserUploadUrl:'',
              dept_id:'',
              bumenList:[],
              importUsers:false,
              addUser:false,
              show_btn:true,
              dialogFormVisible:false,
              currentPage:1,
              total:4,
              pageSize:10,
              name:'',
              number:'',
              userNameList:[],
              powerList:[],
              restaurants: [],
              value1:'',
              value2:'',
              selectedOptions: [],
              options: [],
              options1:[],
              exemptList:[
                {
                  exempt_value:'0',
                  exempt_name:'不免检'
                },
                {
                  exempt_value:'1',
                  exempt_name:'免检'
                }
              ],
              value:'',
              tableData5: [],
              expands: [],
              org_idList:[],
              zhiyeList:[],
              changeform:{
                dept_id:[],
                group_id:[],
                position_id:[],
                username:'',
                user_true_name:'',
                password:'',
                user_id:'',
                user_status:''
              },
              form:{
                user_true_name:'',
                user_tel:'',
                dept_ids:[],
                face_url:'',
                card_num:'',
                user_type:'',
                card_type:''
              },
              zhiweiList:[],
              bumenList: [],
              uploadUserFaceUrl:'',
              uploadHeader:'',
              userTypeList:[
                {
                  type_value:'',
                  type_name:'全部'
                },
                {
                  type_value:'normal',
                  type_name:'普通卡'
                },
                {
                  type_value:'once',
                  type_name:'临时卡'
                }
              ]
            }
              
      },
      mounted() {
         
          var addManyUserUploadUrl = this.$axios.defaults.baseURL+'/user/addByExcel';
          var uploadUserFaceUrl = this.$axios.defaults.baseURL+'/user/face/upload';
          this.uploadUserFaceUrl = uploadUserFaceUrl;
          var token = localStorage.getItem('auth')
          this.uploadHeader = {
            'kf-token':token
          }
          this.addManyUserUploadUrl = addManyUserUploadUrl;
          this.getDeptList();
          // this.getPowerList();
          this.getDataList();
          // this.getZhiweiList();
          this.getNameSearchList('')
      },
      methods: {
          addUserNew(){
            this.form = {};
            this.addUser = true;
          },
          handleAvatarSuccess(res, file) {
            if(res.code==0){
              this.form.face_url = res.data;
            }else{
              this.$message({
                type: 'error',
                message: '上传失败'
              });
            }
          },
          beforeAvatarUpload(file) {
            // const isJPG = file.type === 'image/jpeg';
            // const isPNG = file.type === 'image/png';
            // const isLt2M = file.size / 1024 / 1024 < 10;

            // if (!isJPG&&!isPNG) {
            //   this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
            // }
            // if (!isLt2M) {
            //   this.$message.error('上传头像图片大小不能超过 10MB!');
            // }
            // return isJPG && isLt2M;
          },
          //人员删除
          handleEdit(res){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                
                
                params.append('card_num',res.card_num);
                self.$axios({
                    method: 'post',
                    url: '/card/del',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '删除成功'
                        }); 
                        self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //下载文件
          downLoadFile(){
            var url = this.$axios.defaults.baseURL+'/ejk/file/物料批量导入模板.xls';
            try{ 
                var elemIF = document.createElement("iframe");   
                elemIF.src = url;   
                elemIF.style.display = "none";   
                document.body.appendChild(elemIF);   
            }catch(e){ 
     
            } 
          },
          handleChange1(value) {
              // console.log(value)
          },
          
          //跳转档案页面
          danganClick(data){
            localStorage.setItem('user_true_name',data.user_true_name);
            this.$router.push('/jiedurendangan');
          },
          //打开修改弹窗
          updataClick(data){
            // localStorage.setItem('xiugai_card_id',data.user_card_id);
            // this.$router.push('/justXiugai');
            
            this.form = data;
            this.dialogFormVisible = true;
            // alert(11)
            // console.log(this.changeform)
          },
          //新增单个用户
          addUserClick(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                
                // params.append('user_true_name',self.form.user_true_name);
                // params.append('user_tel',self.form.user_tel);
                // params.append('dept_ids',self.form.dept_ids.join(","));
                // params.append('face_url',self.form.face_url);
                // params.append('exempt',self.form.exempt);
                params.append('card_num',self.form.card_num);
                params.append('card_type',self.form.card_type);
                const loading = self.$loading({
                  lock: true,
                  text: '加载中...',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.6)'
                });
                
                self.$axios({
                    method: 'post',
                    url: '/card/add',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        loading.close();
                        self.$message({
                          type: 'success',
                          message: '添加成功'
                        }); 
                        self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //确定修改资料
          sureToChange(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                
                console.log(self.form)
                if(self.form.dept_ids){
                  var dept_ids = self.form.dept_ids.join(",")
                }else{
                  var dept_ids = '';
                }
                
                params.append('card_num',self.form.card_num);
                params.append('card_type',self.form.card_type);
                
                const loading = self.$loading({
                  lock: true,
                  text: '加载中...',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.6)'
                });
                
                self.$axios({
                    method: 'post',
                    url: '/card/update',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        loading.close();
                        self.$message({
                          type: 'success',
                          message: '修改成功'
                        }); 
                        self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //点击展开表格展示处置
          rowClick(row, event, column) {
                Array.prototype.remove = function (val) {
                    let index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };
 
                if (this.expands.indexOf(row.user_card_id) < 0) {
                    this.expands = []
                    this.expands.push(row.user_card_id);
                } else {
                    this.expands.remove(row.user_card_id);
                }
                // console.log(this.expands)
 
          },
          //单元格双击跳转档案页
          rowDbclick(row, event){
            console.log(row)
          },
          handleCurrentChange(){
            //页码发生变化请求新数据
            this.getDataList();
          },
          //修改单元行颜色
          rowStyle({ row, rowIndex}){
            if(rowIndex%2 ==0){
              return 'background:#eee;color:#000;'
            }else{
             return 'background:#e5e7e8;color:#000;'
            }
          },      
          handleChange(value) {
              var newArr = [];
              newArr.push(value[value.length-1]) 
              this.org_idList = newArr;
          },
          querySearch(queryString, cb) {
              this.getNameList();
              var restaurants = this.restaurants;
              var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
              // 调用 callback 返回建议列表的数据
              cb(results);
          },
          createFilter(queryString) {
              return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
              };
          },
          handleSelect(item) {
            this.getDataList();
          },
            //搜索点击事件
            searchClick(){
                this.currentPage = 1;
                this.getDataList();
            },
          //默认获取用户列表页面
          getDataList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.currentPage); 
                params.append('pageSize',self.pageSize); 
                params.append('card_type',self.user_type); 
                params.append('card_num',self.user_tel);
                // params.append('user_type',self.user_type);
                self.$axios({
                    method: 'post',
                    url: '/card/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.tableData5 = data.data.data.list;
                      self.total = data.data.data.total;
                      
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          
         
          //获取职业信息
          getZhiweiList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth'); 
                params.append('pageNum',1); 
                params.append('pageSize',100);        
                self.$axios({
                    method: 'post',
                    url: '/position/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.zhiweiList = data.data.data.list;
                       
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          // //姓名模糊查询提示
          
          remoteMethod(query){
              if (query !== '') {
                this.loading = true;
                this.getNameSearchList(query);
                      setTimeout(() => {
                        this.loading = false;
                        this.userNameList = this.list.filter(item => {
                          return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                        });
                      }, 200);
              } else {
                this.userNameList = [];
              }
          },
          getNameSearchList(query){
                const self = this;
                self.user_true_name = query;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('user_true_name',query); 
                params.append('pageNum',1);
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
                        return { value: item.user_id, label: item.user_true_name };
                      });
                      self.userNameList = self.list;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          
          //获取部门信息
          getDeptList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',1); 
                params.append('pageSize',100);          
                self.$axios({
                    method: 'post',
                    url: '/dept/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.bumenList = data.data.data.list;

                    }else{
                      self.$response(data,self);
                    }
                 });
          },
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
          }
      }
     
  }
</script>

<style scoped>
    .tableClass{
      width: 100%;
      height: auto;
      /*background-color: #231a75;*/
    }
    .tableList{
      width: 99%;
      height: 550px!important;
      overflow-y: scroll;
      border:1px solid #231a75;
     /* border-radius: 20px;*/
      margin-top: 20px;
      /*background-color: #231a75;*/
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
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 180px;
      height: 178px;
      display: block;
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
      /*background-color: #231a75;*/
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

   
    .row-expand-cover td:last-child .el-icon-arrow-right{
      visibility: hidden;
    }
    .demo-table-expand{
      
      padding: 20px;
    }
</style>