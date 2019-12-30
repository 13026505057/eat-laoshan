<template>
    <div  class="login-wrap1">
        <div class="head-img">
            <!-- <img src="../../../static/img/head1.png" alt="">
            <img src="../../../static/img/head2.png" alt=""> -->
            <div class="head-img1">
                <img src="../../../static/img/showlogo.png" alt="">
            </div>
            <div class="head-title">
                青岛市崂山区人民检察院
            </div>
        </div>
        <div>
            <div class="eatBox">
                <div class="quantity">
                    <div class="quantity-1">
                        <div class="quantity-title">
                            <div class="eattime">餐厅管理系统当天未打卡情况统计</div>
                            <div class="eatDate">日期：{{today}}</div>
                        </div>
                        
                        <div class="repast">
                            <div class="breakfast">
                                <div class="check-item-eat">
                                    <div class="check-item-img">
                                        <img src="../../../static/img/daka1.png" alt="">
                                    </div>
                                    <div class="check-item-text">
                                        <div>
                                            <div class="text-num">{{breakfast_card_0}}</div>
                                            <div class="text-title">早餐未打卡总人数</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="breakfast_box">
                                    <div class="breakfast-num">{{breakfast_card_0}}</div>
                                    <div class="breakfast-title">早餐未打卡总人数</div>
                                </div> -->
                            </div>
                            <div class="line">
                                <div></div>
                            </div>
                            <div class="lunch">
                                <div class="check-item-eat">
                                    <div class="check-item-img">
                                        <img src="../../../static/img/daka1.png" alt="">
                                    </div>
                                    <div class="check-item-text">
                                        <div>
                                            <div class="text-num">{{lunch_card_0}}</div>
                                            <div class="text-title">午餐未打卡总人数</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="breakfast_box">
                                    <div class=" lunch-num">{{lunch_card_0}}</div>
                                    <div class="breakfast-title">午餐未打卡总人数</div>
                                </div> -->
                            </div>
                        </div>
                        <div class="sum">
                            <div class="personType">
                                <div class="check-item-eat">
                                    <div class="check-item-img">
                                        <img src="../../../static/img/daka2.png" alt="">
                                    </div>
                                    <div class="check-item-text">
                                        <div>
                                            <div class="text-num">{{ganjingTotal}}</div>
                                            <div class="text-title">干警未打卡人数</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="noneNum">
                                    {{}}
                                </div>
                                <div class="noneCard">
                                    干警未打卡人数
                                </div>
                                 -->
                                <!-- <img class="dakaIcon" src="../../../static/img/daka.png" alt=""> -->
                            </div>
                            <div class="line">
                                <div></div>
                            </div>
                            <div class="personType">
                                <div class="check-item-eat">
                                    <div class="check-item-img">
                                        <img src="../../../static/img/daka2.png" alt="">
                                    </div>
                                    <div class="check-item-text">
                                        <div>
                                            <div class="text-num">{{qitanTotal}}</div>
                                            <div class="text-title">驻场人员未打卡人数</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="noneCard">
                                    驻场人员未打卡人数
                                </div>
                                <div class="noneNum">
                                    {{qitanTotal}}
                                </div>
                                <img class="dakaIcon" src="../../../static/img/daka.png" alt=""> -->
                            </div>
                            
                            <!-- <div class="personType">
                                <div class="noneCard">
                                    陌生人未打卡人数
                                </div>
                                <div class="noneNum">
                                    {{moshengrenTotal}}
                                </div>
                                <img class="dakaIcon" src="../../../static/img/daka.png" alt="">
                            </div> -->
                        </div>
                        <div class="sum">
                            <div class="personType">
                                <div class="check-item-eat">
                                    <div class="check-item-img">
                                        <img src="../../../static/img/daka2.png" alt="">
                                    </div>
                                    <div class="check-item-text">
                                        <div>
                                            <div class="text-num">{{moshengrenTotal}}</div>
                                            <div class="text-title">陌生人未打卡人数</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back-white">
                    <div class="userBox1">
                        <div class="conent-box-1">
                            <el-carousel :interval="interval" height="800px" >
                                <el-carousel-item>
                                    <!-- <h3>{{ item }}</h3> -->
                                    <div class="tab_title">
                                        干警
                                    </div>
                                    <div class="tableList2" id="tableList1">
                                        <el-table
                                            :header-cell-style="headStyle"
                                            :data="tableData1"
                                            style="width: 92%;margin:0 auto;"
                                            :row-style="rowStyle">
                                            <el-table-column
                                                type="index"
                                                align="center"
                                                width="60">
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
                                                label="记录时间"
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
                                            <el-table-column
                                                label="人员"
                                                align="center"
                                                prop="user_true_name"
                                                >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-carousel-item>
                                
                                <el-carousel-item >
                                    <!-- <h3>{{ item }}</h3> -->
                                    <div class="tab_title">
                                        驻场人员
                                    </div>
                                    <div class="tableList1" id="tableList1">
                                        <el-table
                                            :header-cell-style="headStyle"
                                            :data="tableData3"
                                            style="width: 92%;margin:0 auto;"
                                            :row-style="rowStyle">
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
                                                label="记录时间"
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
                                            <el-table-column
                                                label="人员"
                                                align="center"
                                                prop="user_true_name"
                                                >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-carousel-item>
                                <el-carousel-item >
                                    <!-- <h3>{{ item }}</h3> -->
                                    <div class="tab_title">
                                        陌生人
                                    </div>
                                    <div class="tableList1" id="tableList1">
                                        <el-table
                                            :header-cell-style="headStyle"
                                            :data="tableData2"
                                            style="width: 92%;margin:0 auto;"
                                            :row-style="rowStyle">
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
                                                label="记录时间"
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
                                            <el-table-column
                                                label="人员"
                                                align="center"
                                                prop="user_true_name"
                                                >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                        </div> 
                    </div>
                </div>
            </div>
            <!-- 考勤 -->
            <!-- /leave/get请假休假因公外出 -->
            <!-- attendance/get 每个人的打卡情况 -->
            <!-- /log/get  每次打卡记录 -->
            <div class="">
                <div>
                    <div class="quantity">
                        <div class="quantity-1">
                            <div class="quantity-title">
                                <div class="eattime">考勤管理系统打卡情况统计</div>
                                <div class="eatDate">日期：{{todayKaoqin}}</div>
                            </div>
                            <div class="check">
                                <ul>
                                    <li class="check-li">
                                        <div class="check-item">
                                            <div class="check-item-img">
                                                <img src="../../../static/img/kaoqin1.png" alt="">
                                            </div>
                                            <div class="check-item-text">
                                                <div>
                                                    <div class="text-num">{{kaoqin}}</div>
                                                    <div class="text-title">考勤人数</div>
                                                </div>
                                            </div>
                                            <!-- <img src="../../../static/img/kaoqinbg.png" alt="">
                                            <div class="check-text">
                                                <div class="text-title">考勤人数</div>
                                                <div class="text-num">{{kaoqin}}</div>
                                            </div> -->
                                        </div>
                                    </li>
                                    <li>
                                        <div class="line">
                                            <div></div>
                                        </div>
                                    </li>
                                    <li class="check-li">
                                        <div class="check-item">
                                            <div class="check-item-img">
                                                <img src="../../../static/img/kaoqin2.png" alt="">
                                            </div>
                                            <div class="check-item-text">
                                                <div>
                                                    <div class="text-num">{{shidao}}</div>
                                                    <div class="text-title">实到人数</div>
                                                </div>
                                            </div>
                                            <!-- <img src="../../../static/img/shidaobg.png" alt="">
                                            <div class="check-text">
                                                <div class="text-title">实到人数</div>
                                                <div class="text-num">{{shidao}}</div>
                                            </div> -->
                                        </div>
                                    </li>
                                    <li>
                                        <div class="line">
                                            <div></div>
                                        </div>
                                    </li>
                                    <li class="check-li">
                                        <div class="check-item">
                                            <div class="check-item-img">
                                                <img src="../../../static/img/kaoqin3.png" alt="">
                                            </div>
                                            <div class="check-item-text">
                                                <div>
                                                    <div class="text-num">{{chidao}}</div>
                                                    <div class="text-title">迟到人数</div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="check-item">
                                            <img src="../../../static/img/chidaobg.png" alt="">
                                            <div class="check-text">
                                                <div class="text-title">迟到人数</div>
                                                <div class="text-num">{{chidao}}</div>
                                            </div>
                                        </div> -->
                                    </li>
                                    <li>
                                        <div class="line">
                                            <div></div>
                                        </div>
                                    </li>
                                    <li class="check-li">
                                        <div class="check-item">
                                            <div class="check-item-img">
                                                <img src="../../../static/img/kaoqin4.png" alt="">
                                            </div>
                                            <div class="check-item-text">
                                                <div>
                                                    <div class="text-num">{{zaotui}}</div>
                                                    <div class="text-title">早退人数</div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="check-item">
                                            <img src="../../../static/img/zaotuibg.png" alt="">
                                            <div class="check-text">
                                                <div class="text-title">早退人数</div>
                                                <div class="text-num">{{zaotui}}</div>
                                            </div>
                                        </div> -->
                                    </li>
                                    <li class="check-li">
                                        <div class="check-item">
                                            <div class="check-item-img">
                                                <img src="../../../static/img/kaoqin5.png" alt="">
                                            </div>
                                            <div class="check-item-text">
                                                <div>
                                                    <div class="text-num">{{qingjia}}</div>
                                                    <div class="text-title">请假人数</div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="check-item">
                                            <img src="../../../static/img/qingjiabg.png" alt="">
                                            <div class="check-text">
                                                <div class="text-title">请假人数</div>
                                                <div class="text-num">{{qingjia}}</div>
                                            </div>
                                        </div> -->
                                    </li>
                                    <li>
                                        <div class="line">
                                            <div></div>
                                        </div>
                                    </li>
                                    <li class="check-li">
                                        <div class="check-item">
                                            <div class="check-item-img">
                                                <img src="../../../static/img/kaoqin6.png" alt="">
                                            </div>
                                            <div class="check-item-text">
                                                <div>
                                                    <div class="text-num">{{xiujia}}</div>
                                                    <div class="text-title">休假人数</div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="check-item">
                                            <img src="../../../static/img/xiujiabg.png" alt="">
                                            <div class="check-text">
                                                <div class="text-title">休假人数</div>
                                                <div class="text-num">{{xiujia}}</div>
                                            </div>
                                        </div> -->
                                    </li>
                                    <li>
                                        <div class="line">
                                            <div></div>
                                        </div>
                                    </li>
                                    <li class="check-li">
                                        <div class="check-item">
                                            <div class="check-item-img">
                                                <img src="../../../static/img/kaoqin7.png" alt="">
                                            </div>
                                            <div class="check-item-text">
                                                <div>
                                                    <div class="text-num">{{waichu}}</div>
                                                    <div class="text-title">因公外出人数</div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="check-item">
                                            <img src="../../../static/img/waichubg.png" alt="">
                                            <div class="check-text">
                                                <div class="text-title">因公外出人数</div>
                                                <div class="text-num">{{waichu}}</div>
                                            </div>
                                        </div> -->
                                    </li>
                                    <li>
                                        <div class="line">
                                            <div></div>
                                        </div>
                                    </li>
                                    <li class="check-li">
                                        <div class="check-item">
                                            <div class="check-item-img">
                                                <img src="../../../static/img/kaoqin8.png" alt="">
                                            </div>
                                            <div class="check-item-text">
                                                <div>
                                                    <div class="text-num">{{queqin}}</div>
                                                    <div class="text-title">缺勤人数</div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="check-item">
                                            <img src="../../../static/img/queqin.png" alt="">
                                            <div class="check-text">
                                                <div class="text-title">缺勤人数</div>
                                                <div class="text-num">{{queqin}}</div>
                                            </div>
                                        </div> -->
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="back-white">
                    <div class="userBox1">
                        <div class="conent-box-1">
                            <el-carousel :interval="interval1" height="800px" >
                                <el-carousel-item>
                                    <!-- <h3>{{ item }}</h3> -->
                                    <div class="tab_title">
                                        外出统计
                                    </div>
                                    <div class="tableList2" id="tableList1">
                                        <el-table
                                            :header-cell-style="headStyle"
                                            :data="tableDataKaoqin1"
                                            style="width: 92%;margin:0 auto;"
                                            :row-style="rowStyle">
                                            <el-table-column
                                                type="index"
                                                align="center"
                                                width="60">
                                            </el-table-column>
                                            <el-table-column
                                                label="姓名"
                                                align="center"
                                                prop="user_true_name"
                                                >
                                            </el-table-column>
                                            <el-table-column
                                                label="申请日期"
                                                align="center"
                                                prop="oa_sqrq"
                                                >
                                            </el-table-column>
                                            <el-table-column
                                                label="离开开始日期"
                                                align="center"
                                                prop="oa_kssj"
                                                >
                                            </el-table-column>
                                            <el-table-column
                                                label="离开结束日期"
                                                align="center"
                                                prop="oa_jssj"
                                                >
                                            </el-table-column>
                                            <el-table-column
                                                label="离开开始时间"
                                                align="center"
                                                prop="leave_begin_time">
                                                
                                            </el-table-column>
                                            <el-table-column
                                                label="离开结束时间"
                                                align="center"
                                                prop="leave_end_time">
                                                
                                            </el-table-column>
                                            
                                            <el-table-column
                                                label="外出状态"
                                                align="center"
                                                prop="">
                                                <template slot-scope="props">
                                                    <span>{{props.row.leave_status=="4"?"请假":""}}</span>
                                                    <span>{{props.row.leave_status=="5"?"休假":""}}</span>
                                                    <span>{{props.row.leave_status=="6"?"因公外出":""}}</span>
                                                </template>
                                            </el-table-column>
                                            
                                            <el-table-column
                                                label="离开天数"
                                                align="center"
                                                prop="oa_ts"
                                                >
                                            </el-table-column>
                                            
                                            <el-table-column
                                                label="小时数"
                                                align="center"
                                                prop="oa_xss"
                                                >
                                            </el-table-column>
                                            <el-table-column
                                                label="公出地点"
                                                align="center"
                                                prop="oa_gcdd"
                                                > 
                                            </el-table-column>
                                            <el-table-column
                                                label="原因"
                                                align="center"
                                                prop="oa_reason"
                                                >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-carousel-item>
                                
                                <el-carousel-item >
                                    <!-- <h3>{{ item }}</h3> -->
                                    <div class="tab_title">
                                        打卡统计
                                    </div>
                                    <div class="tableList1" id="tableList1">
                                        <el-table
                                            :header-cell-style="headStyle"
                                            :data="tableDataKaoqin2"
                                            style="width: 92%;margin:0 auto;"
                                            :row-style="rowStyle">
                                            <el-table-column
                                                type="index"
                                                align="center"
                                                width="50">
                                            </el-table-column>
                                            <el-table-column
                                                width="90"
                                                label="姓名"
                                                align="center"
                                                prop="user_true_name">
                                                
                                            </el-table-column>
                                            <el-table-column
                                                label="考勤状态"
                                                align="center"
                                                prop=""
                                                >
                                                <template slot-scope="props">
                                                    <span>{{props.row.attendance_status=="0"?"正常":""}}</span>
                                                    <span>{{props.row.attendance_status=="1"?"迟到":""}}</span>
                                                    <span>{{props.row.attendance_status=="2"?"早退":""}}</span>
                                                    <span>{{props.row.attendance_status=="3"?"迟到早退":""}}</span>
                                                    <span>{{props.row.attendance_status=="4"?"请假":""}}</span>
                                                    <span>{{props.row.attendance_status=="5"?"休假":""}}</span>
                                                    <span>{{props.row.attendance_status=="6"?"外出":""}}</span>
                                                    <span>{{props.row.attendance_status=="7"?"缺勤":""}}</span>
                                                </template>
                                            </el-table-column>
                                
                                            <el-table-column
                                                label="是否考勤"
                                                align="center"
                                                prop=""
                                                >
                                                <template slot-scope="props">
                                                    <span>{{props.row.kaoqin_status=="0"?"不考勤":""}}</span>
                                                    <span>{{props.row.kaoqin_status=="1"?"全考勤":""}}</span>
                                                    <span>{{props.row.kaoqin_status=="2"?"早勤":""}}</span>
                                                    <span>{{props.row.kaoqin_status=="3"?"晚勤":""}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                label="外出状态"
                                                align="center"
                                                prop=""
                                                >
                                                <template slot-scope="props">
                                                    <span>{{props.row.leave_status=="qingjia"?"请假":""}}</span>
                                                    <span>{{props.row.leave_status=="gongchu"?"因公外出":""}}</span>
                                                    <span>{{props.row.leave_status=="5"?"休假":""}}</span>
                                                </template>
                                            </el-table-column>
                                            
                                            <el-table-column
                                                label="部门"
                                                align="center"
                                                prop="dept_name">
                                            </el-table-column>
                                            <el-table-column
                                                label="打卡日期"
                                                align="center"
                                                prop="attendance_day"
                                                >
                                            </el-table-column>
                                            <el-table-column
                                                label="上班打卡"
                                                align="center"
                                                prop="attendance_begin_card"
                                                >
                                            </el-table-column>
                                            <el-table-column
                                                label="下班打卡"
                                                align="center"
                                                prop="attendance_end_card"
                                                >
                                            </el-table-column>
                                            <el-table-column
                                                label="上班刷脸"
                                                align="center"
                                                prop="attendance_begin_face"
                                                >
                                            </el-table-column>
                                            <el-table-column
                                                label="下班刷脸"
                                                align="center"
                                                prop="attendance_end_face"
                                                >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-carousel-item>
                                <el-carousel-item >
                                    <!-- <h3>{{ item }}</h3> -->
                                    <div class="tab_title">
                                        打卡记录
                                    </div>
                                    <div class="tableList1" id="tableList1">
                                        <el-table
                                            :header-cell-style="headStyle"
                                            :data="tableDataKaoqin3"
                                            style="width: 92%;margin:0 auto;"
                                            :row-style="rowStyle">
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
                                                label="考勤地点"
                                                align="center"
                                                prop="mac_name">
                                            </el-table-column>
                                            
                                            <el-table-column
                                                label="考勤方式"
                                                align="center"
                                                prop="">
                                                <template slot-scope="props">
                                                    <span>{{props.row.in_out=="in"?"刷脸":"打卡"}}</span>
                                                </template>

                                                
                                            </el-table-column>
                                            <el-table-column
                                                label="刷卡时间"
                                                align="center"
                                                prop="log_date_time"
                                                >
                                            </el-table-column>
                                            <!-- <el-table-column
                                                label="结束时间"
                                                align="center"
                                                prop="end_log_date_time"
                                                >
                                            </el-table-column> -->
                                            <el-table-column
                                                label="卡号"
                                                align="center"
                                                prop="user_num"
                                                >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import md5 from 'js-md5';
    import {bus} from '../../main.js';
    export default {
        data: function(){
            return {
                // {
                //     face_url:"../../../static/img/test.png"
                // }
                tableData1: [],
                tableData2: [],
                tableData3: [],
                pageNum1:1,
                pageNum2:1,
                pageNum3:1,
                pageSize:4,
                total:0,
                loadSign:false,
                today:"",
                todayKaoqin:"",
                breakfast_card_0:"0",
                lunch_card_0:"0",
                active:'',
                
                interval1:15000,
                interval:15000,
                ganjingTotal:'0',
                moshengrenTotal:'0',
                qitanTotal:'0',
                // 考勤
                kaoqin:"",
                shidao:"",
                chidao:"",
                zaotui:"",
                qingjia:"",
                xiujia:"",
                waichu:"",
                queqin:"",
                tableDataKaoqin1:[],
                finishTime:'',
                kaoqinTotal1:0,
                tableDataKaoqin2: [],
                kaoqinTotal2: 0,
                tableDataKaoqin3:[],
                kaoqinTotal3:'',
                pageNum4:4,
                pageNum5:4,
                pageNum6:4,

                // 160*
            }
        },
        methods: {
            // 考勤
             getDataListKaoqin(){
                const self = this;
                self.kaoqin = '';
                self.shidao = '';
                self.chidao = '';
                self.zaotui = '';
                self.qingjia = '';
                self.xiujia = '';
                self.waichu = '';
                self.queqin = '';
                var params = new URLSearchParams();
                // var token = localStorage.getItem('auth');
                var day3 = new Date();
                day3.setTime(day3.getTime()-24*60*60*1000);
                var finishTime = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate();
                // console.log(finishTime)
                self.todayKaoqin = finishTime;
                self.finishTime = finishTime;
                // if(self.date == ""){
                //     var date1 = finishTime
                // }else{
                //     var date1 = self.date
                // }
                params.append('holiday_day',self.finishTime);

                self.$axios({
                    method: 'post',
                    url:'http://192.168.100.226/attendance/holiday/get',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded',},
                }).then(function(data){
                    
                    if(data.data.code==0){
                        self.kaoqin = data.data.data[0].kaoqin;
                        self.shidao = data.data.data[0].shidao;
                        self.chidao = data.data.data[0].chidao;
                        self.zaotui = data.data.data[0].zaotui;
                        self.qingjia = data.data.data[0].qingjia;
                        self.xiujia = data.data.data[0].xiujia;
                        self.waichu = data.data.data[0].waichu;
                        self.queqin = data.data.data[0].queqin;
                        
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            // 外出考勤列表
            getDataListKaoqin1(){
                const self = this;
                var params = new URLSearchParams();
                // var token = localStorage.getItem('auth');
                var day3 = new Date();
                day3.setTime(day3.getTime()-24*60*60*1000);
                var finishTime = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate() ;
                console.log(finishTime)

                params.append('leave_day',finishTime);
                params.append('pageNum',self.pageNum4);
                params.append('pageSize',self.pageSize);
                self.$axios({
                    method: 'post',
                    url: 'http://192.168.100.226/attendance/leave/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                }).then(function(data){
                    if(data.data.code==0){
                        self.tableDataKaoqin1 = data.data.data.list;
                        // self.kaoqinTotal1 = data.data.data.total;
                        self.pageNum4 = self.pageNum4+1;

                        self.kaoqinTotal1 = data.data.data.total;  
                        if(self.tableDataKaoqin1.length < 4){
                            self.pageNum4 = 1
                        }
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            // 个人考勤列表
            getDataListKaoqin2(){
                const self = this;
                var params = new URLSearchParams();
                // var token = localStorage.getItem('auth');
                var day3 = new Date();
                day3.setTime(day3.getTime()-24*60*60*1000);
                var finishTime = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate() ;
                console.log(finishTime)
                params.append('pageNum',self.pageNum5);
                params.append('pageSize',self.pageSize);
                params.append('attendance_day',finishTime);
                self.$axios({
                    method: 'post',
                    url: 'http://192.168.100.226/attendance/attendance/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                }).then(function(data){
                    if(data.data.code==0){
                        self.tableDataKaoqin2 = data.data.data.list;
                        // self.kaoqinTotal2 = data.data.data.total;
                        self.pageNum5 = self.pageNum5+1;
                        self.kaoqinTotal2 = data.data.data.total;  
                        if(self.tableDataKaoqin2.length < 4){
                            self.pageNum5 = 1
                        }
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            // 
            getDataListKaoqin3(){
                const self = this;
                var params = new URLSearchParams();
                // var token = localStorage.getItem('auth');
                var day3 = new Date();
                day3.setTime(day3.getTime()-24*60*60*1000);
                var finishTime = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate() ;
                console.log(finishTime)

                params.append('log_date',finishTime);
                params.append('pageNum',self.pageNum6);
                params.append('pageSize',self.pageSize);
                self.$axios({
                    method: 'post',
                    url: 'http://192.168.100.226/attendance/log/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                }).then(function(data){
                    if(data.data.code==0){
                        self.tableDataKaoqin3 = data.data.data.logList;
                        // self.kaoqinTotal3 = data.data.data.total;
                        self.pageNum6 = self.pageNum6+1;
                        self.kaoqinTotal3 = data.data.data.total;  
                        if(self.tableDataKaoqin3.length < 4){
                            self.pageNum6 = 1
                        }
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            // 餐厅
            getDataList1(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var date2 = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                // var endTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds()
                // console.log(date2)
                var startTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + "00" + ':' + "00" + ':' + "00"
                // var finishTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + (date2.getDate()+24*60*60*1000) + ' ' + "00" + ':' + "00" + ':' + "00"
                
                // console.log(date2.getDate()+24*60*60*1000)
                var day3 = new Date();
                day3.setTime(day3.getTime()+24*60*60*1000);
                var finishTime = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate() + ' ' + "00" + ':' + "00" + ':' + "00";

                var begin_time = startTime;
                var end_time = finishTime;
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                params.append('pageNum',self.pageNum1);
                params.append('pageSize',self.pageSize);
                params.append("user_type","yuangong");
                // card=0代表未打卡
                // bd_card=0代表未补打
                params.append('card','0');
                params.append('bd_card','0');

                self.$axios({
                    method: 'post',
                    url: '/log/eat-log/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    
                    if(data.data.code==0){
                        self.tableData1 = data.data.data.list;
                        self.pageNum1 = self.pageNum1+1;
                        self.total = data.data.data.total;  
                        self.ganjingTotal = data.data.data.total;  
                        if(self.tableData1.length < 9){
                            self.pageNum1 = 1
                        }
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            getDataList2(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var date2 = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                // var endTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds()
                // console.log(date2)
                var startTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + "00" + ':' + "00" + ':' + "00"
                // var finishTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + (date2.getDate()+24*60*60*1000) + ' ' + "00" + ':' + "00" + ':' + "00"
                
                // console.log(date2.getDate()+24*60*60*1000)
                var day3 = new Date();
                day3.setTime(day3.getTime()+24*60*60*1000);
                var finishTime = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate() + ' ' + "00" + ':' + "00" + ':' + "00";

                var begin_time = startTime;
                var end_time = finishTime;
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                params.append('pageNum',self.pageNum2);
                params.append('pageSize',self.pageSize);
                params.append("user_type","moshengren");
                // card=0代表未打卡
                // bd_card=0代表未补打
                params.append('card','0');
                params.append('bd_card','0');

                self.$axios({
                    method: 'post',
                    url: '/log/eat-log/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    
                    if(data.data.code==0){
                        self.tableData2 = data.data.data.list;
                        self.pageNum2 = self.pageNum2+1;
                        self.total = data.data.data.total;
                        self.moshengrenTotal = data.data.data.total;
                        
                        if(self.tableData2.length < 9){
                            self.pageNum2 = 1
                        }
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            getDataList3(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var date2 = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                // var endTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds()
                // console.log(date2)
                var startTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + "00" + ':' + "00" + ':' + "00"
                // var finishTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + (date2.getDate()+24*60*60*1000) + ' ' + "00" + ':' + "00" + ':' + "00"
                
                // console.log(date2.getDate()+24*60*60*1000)
                var day3 = new Date();
                day3.setTime(day3.getTime()+24*60*60*1000);
                var finishTime = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate() + ' ' + "00" + ':' + "00" + ':' + "00";

                var begin_time = startTime;
                var end_time = finishTime;
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                params.append('pageNum',self.pageNum3);
                params.append('pageSize',self.pageSize);
                params.append("user_type","qita");
                // card=0代表未打卡
                // bd_card=0代表未补打
                params.append('card','0');
                params.append('bd_card','0');

                self.$axios({
                    method: 'post',
                    url: '/log/eat-log/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    
                    if(data.data.code==0){
                        self.tableData3 = data.data.data.list;
                        self.pageNum3 = self.pageNum3+1;
                        self.total = data.data.data.total;
                        self.qitanTotal = data.data.data.total;
                        if(self.tableData3.length < 9){
                            self.pageNum3 = 1
                        }
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            // 早餐未打卡总人数
            getBreakfast(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                
                self.$axios({
                    method: 'post',
                    url: '/log/eat-log/getTodayUserQuantity',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    
                    if(data.data.code==0){
                        self.today = data.data.data.today;
                        self.breakfast_card_0 = data.data.data.breakfast_card_0;
                        self.lunch_card_0 = data.data.data.lunch_card_0;
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            rowStyle({ row, rowIndex}){
                console.log(row)
                console.log(rowIndex)
                if(rowIndex%2 ==0){
                    return 'background:#eee;color:#000;height:90px;line-height:90px'
                }else{
                    return 'background:#e5e7e8;color:#000;line-height:90px'
                }
            },   
            headStyle({row, column, rowIndex, columnIndex}){ 
                return 'background-color: #F0F0F0;color:#000;height:100px;font-size:26px;'
            },
           
   
           

        },
        mounted(){
            var self = this;
            // 餐厅
            self.getDataList1();
            self.getDataList2();
            self.getDataList3();
            self.getBreakfast();
            // 考勤
            self.getDataListKaoqin();//头部
            self.getDataListKaoqin1();
            self.getDataListKaoqin2();
            self.getDataListKaoqin3();
            setInterval(function(){
                self.getDataList1();
                self.getDataList2();
                self.getDataList3();

                self.getDataListKaoqin();//头部
                self.getDataListKaoqin1();
                self.getDataListKaoqin2();
                self.getDataListKaoqin3();
            },4000);
            
        },
        created(){
            document.oncontextmenu = function(){
                event.returnValue = false;
            }
            var self = this;

            // bus.$on('isCard',function(val, code){
            //     self.showCard(val,code);
            // })
        }
    }
    
</script>


<style scoped>
    .clear{
        clear: both;
    }
    
    /* .eattime1{
        color: #002770;
        font-size: 22px;
        text-align: right;
        margin-right: 20px;
        margin-top: 20px;
    } */
    .login-wrap1{
        position: relative;
        width:100%;
        height:100%;
        /* height: 1600px; */
        /* background-image: url(../../../static/img/banner2.png); */
        /* background-size: 100% 100%; */
        background-color: #F0F3F8;
        /* overflow: hidden; */
        overflow-y: auto;
    }
    .head-img{
        /* margin-top: 2px; */
        width: 100%;
        height: 160px;
        background-color: #357EFF;
        display: flex;
        justify-content: center;
        /* background-image: url(../../../static/img/head1.jpg); */
        /* background-size: 100% 100%; */
    }
    .head-img1{
        height: 160px;
        line-height: 160px;
    }
    .head-img1 img{
        width: 104px;
        height: 108px;
        vertical-align: middle;
    }

    .head-title{
        font-size: 60px;
        height: 160px;
        line-height: 160px;
        color: #fff;
        margin-left: 40px;
    }
    .quantity{
        width: 96%;
        /* height: 18%; */
        margin: 50px auto 20px;
        background-color: #ffffff;
        border-radius: 20px;
    }
    .quantity-1{
        width: 94%;
        /* height: 100%; */
        margin: 0 auto;
    }
    .quantity-title{
        display: flex;
        justify-content: space-between;
    }
    .eatDate{
        color: #000;
        font-size: 36px;
        padding-top: 30px;

    }
    .eattime{
        color: #000;
        font-size: 38px;
        text-align: center;
        padding-top: 30px;
    }
    .repast{
        /* height: 410px; */
        height: 200px;
        display: flex;
        justify-content: space-between;
    }
    .breakfast{
        /* background-image: url(../../../static/img/zc.bg.png); */
    }
    .lunch{

        /* background-image: url(../../../static/img/wc.bg.png); */

    }
    .breakfast,.lunch{

        /* width: 432px; */
        /* height: 143px; */
        width: 648px;
        height: 214px;     
        /* height: 209px; */
        /* margin-top: 40px; */
        /* background-image: linear-gradient(to right, #B4E0FF ,#84CAFB, #32A4F4); */
        
        background-size: 100% 100%;
    }
    .breakfast_box{
        width: 60%;
        float: right;
    }
    .breakfast-title,.breakfast-num{
        /* margin-right: 40px; */
        color: #fff;
        /* text-align: left; */
        
    }
    .breakfast-title{
        font-size: 36px;
        /* margin-top: 20px; */
        margin-top: 16px;
        color: #000000;
    }
    .breakfast-num,.lunch-num{
        font-size: 40px;
        /* margin-right: 70px; */
        margin-top: 40px;
        
    }
    .breakfast-num{
        color: #22B2F6;
    }
    .lunch-num{
        color: #FD6621;
    }
    .sum{
        display: flex;
        justify-content: space-between;
        /* margin-top: 30px;
        padding-bottom: 30px; */
        height: 170px;
    }
    .personType{
        width: 648px;
        height: 170px;
        /* background-color: #00BAFF; */
        /* background-image: url(../../../static/img/xiaobg.png); */
        background-size: 100% 100%;
        /* border-radius: 10px; */
        position: relative;
        /* margin-top: 40px;  */
    }
    .noneCard,.noneNum{
        color: #ffffff;
        margin-left: 30px;
    }
    .noneCard{
        font-size: 45px;
        margin-top: 20px;
    }
    .noneNum{
        font-size: 60px;
        margin-top: 20px;
        margin-left: 60px;
    }
    .dakaIcon{
        width: 158px;
        height: 158px;
        position: absolute;
        top:33px;
        right: 10px;
    }
    .back-white{
        /* position: relative;
        width:100%;
        height:100%;
        background-image: url(../../../static/img/radius.png);
        background-size: 100% 100%;
        overflow: hidden; */
        width: 96%;
        height: 70%;
        margin: 0px auto 20px;
        background-color: #ffffff;
        border-radius: 12px;
        
    }
    .outruleBoxTitle{
        width: 100%;
        height: 50px;
        background-color: #2B5CA9;
    }
    .outruleBoxHeadline{
        width: 100%;
        height: 50px;
        background-color: #012770;
        color:#ffffff;
        text-align: center;
        line-height: 50px;
        font-size: 24px;
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
        border:2px solid #012770;
    }
    .userBox1{
        height: 100%;
    }
    .conent-box-1{
        height: 87%;
    }
    .tableList1{
        /* margin-top: 20px; */
        height: 87%;
        overflow-y: auto;
    }
    .tableList2{

    }
    .headImg1{
        width: 96px;
        height: 110px;
    }
    .tab_title{
        width:92%;
        margin: 0 auto;
        background: #BDD5FF;
        margin-top: 40px;
        /* border: 2px solid #A9A9A9; */
        height: 90px;
         /* border-radius: 10px; */
        line-height: 90px;
        font-size: 36px;
        text-align: center;
        color: #000;
    }
    /* .tab_title ul{
        display: flex;
        justify-content: space-around;
    }
    .tab_title li{
        width: 30%;
        text-align: center;
        list-style:none;    
        height: 110px;
        line-height: 110px;
        font-size: 44px;
        color: #000;
       
    } */
    /* .tab_title .active{
        border-bottom: 2px solid #0000CD;
    } */
    .eatBox{
        /* border: 1px solid #000; */
    }
    /* 考勤 */
    .check ul{
        display: flex;
        /* justify-content: space-around; */
        flex-wrap:wrap;
    }
    .check li{
        list-style: none; 
    }
    .check .check-li{
        
        width: 24%;
        margin-top: 20px;
    }
    .check-item{
        width: 300px;
        /* height: 113px; */
        height: 200px;
        margin: 0 auto;
        /* position: relative; */
        /* border: 1px solid #ff00ff; */
        display: flex;
        justify-content: space-around;
    }
    .check-item-eat{
        width: 400px;
        /* height: 113px; */
        height: 200px;
        margin: 0 auto;
        /* position: relative; */
        /* border: 1px solid #ff00ff; */
        display: flex;
        justify-content: space-around;
    }
    .check-item-img{
        display: flex;
        align-items: center;
    }
    .check-item-img img{
        /* width: 50px;
        height: 50px; */
    }
    .line{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .line div{
        width: 2px;
        margin: 0px 1px; 
        height: 80px;
        background-color: #959595;
    }
    .check-item-text{
        /* margin-top: 30px; */
        display: flex;
        align-items: center;
    }
    /* .check-text{
        width: 276px;
        height: 113px;
        position: absolute;
        top: 0;
        margin-left: 40px; 
        color: #fff;
        text-align: left;
    } */
    .text-title{
        font-size: 28px;
        margin-top: 14px;
        text-align: center;
        color: #959595;
    }
    .text-num{
        font-size: 42px;
        text-align: center;
    }
    
</style>
<style>
    #tableList1 .el-table .cell{
        line-height: 60px;
        /* font-size:36px; */
        /* height:90px; */
    }
    #tableList1 .el-table__empty-text{
        font-size: 26px;
    }
</style>