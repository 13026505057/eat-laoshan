import Vue from 'vue';
import md5 from 'js-md5';
import App from './App';
import router from './router';
import axios from 'axios';
import XLSX from 'xlsx'
import Moment from 'moment';
import echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
//WebSocket封装方法
import * as socketApi from './vender/socket'
import Print from './vender/print'
Vue.use(Print) // 注册
Vue.prototype.socketApi = socketApi
export var bus = new Vue()


Vue.use(ElementUI);

// axios.defaults.baseURL = "http://106.12.68.167:8080/canting";
axios.defaults.baseURL = "http://192.168.100.222/canting";
//  axios.defaults.baseURL = "http://192.168.2.99:8080/canting";
Vue.prototype.$axios = axios;
Vue.prototype.$moment = Moment;
Vue.prototype.$echarts = echarts;
Vue.prototype.$socketApi = socketApi;
Vue.prototype.$response = function(data, self) {
    var statu = data.data.code.substr(0, 1);
    if (statu == 2) {
        self.$message({
            type: 'error',
            message: data.data.msg
        });
    } else if (statu == 4) {
        self.$message({
            type: 'error',
            message: '登录过期，重新登录'
        });
        self.$router.push('/login');
    } else if (statu == 5) {
        self.$message({
            type: 'error',
            message: '系统错误，稍后重试'
        });
    } else if (statu == 1) {
        self.$message({
            type: 'error',
            message: '参数错误'
        });
    } else if (statu == 3) {
        self.$message({
            type: 'error',
            message: '账号密码错误'
        });
    }else if(statu == 6){
        self.$message({
            type: 'error',
            message: '权限不足'
        });
    }
}
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
var heartTime = null;
var routeList = [];
var websock= null;
var reconnetWebsocketTimer = null;
var routeList = [];
router.beforeEach((to, from, next) => {
    // console.log(1988778)
    // console.log(to)
    var index = -1;

    for (var i = 0; i < routeList.length; i++) {

        if (routeList[i].name == to.name) {

            index = i;

            break;

        }

    }

    if (index !== -1) {

        //如果存在路由列表，则把之后的路由都删掉

        routeList.splice(index + 1, routeList.length - index - 1);

    } else if (to.name != '登录') {

        routeList.push({ "name": to.name, "path": to.fullPath });

    }

    to.meta.routeList = routeList;
    // console.log(routeList)
    next();


});

function getSysConnet(){
    // var self = this;
    var params = new URLSearchParams();
    // var token = localStorage.getItem('auth');
    // params.append('meetingName',self.meetingName);
    //将此处的地址改为正确的服务器地址
    axios({
        method: 'post',
        url: '/imac/sys/getSysStatus',
        data: params,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(function(data){
      
        if(data.data.code==0){
            if(websock==null){
                websoketInit('client');
            }
            // Vue.prototype.$myIp = data.data.data;
        }else{
            self.$response(data,self);
        }
    });
}
function websoketInit(val){

    //将此处的地址改为正确的地址
    // var wsuri = "ws://192.168.2.99:8080/canting/websocket/"+val;
    var wsuri = "ws://192.168.100.222/canting/websocket/"+val;
    websock = new WebSocket(wsuri);
    websock.onmessage = function(e){
       // console.log(e)
       delWebSocketMsg(e.data)
    } 
    websock.onclose = function(e){
        clearInterval(heartTime);
        heartTime = null;
        reconnetWebsocket();
    }
    websock.onopen = function () {
        clearInterval(reconnetWebsocketTimer);
        reconnetWebsocketTimer = null;
        sendHeart();
    }
    websock.onerror = function () {
        console.log("WebSocket连接发生错误");
        clearInterval(heartTime);
        heartTime = null;
        reconnetWebsocket();
    } 
}

function delWebSocketMsg(val){
    var valObj = JSON.parse(val);
    console.log(valObj)
    
        switch(valObj.code) {
            case 'init':
                console.log('连接成功')
                break;
            case 'card':
                console.log('取消轮播');
                bus.$emit('isCard',valObj.data.msg, valObj.data.code);
                break;
            
             default:
                
        } 
    
    // 
}

function reconnetWebsocket(){
    if(reconnetWebsocketTimer==null){
        reconnetWebsocketTimer = setInterval(function(){
            websock = null;
            getSysConnet();
        },2000)
    }else{

    }
    
   
}

function sendHeart(){
    if(heartTime==null){
        var agentData =  {"code":"heart_beat"};
        websock.send(JSON.stringify(agentData));
        heartTime = setInterval(function(){
            var agentData =  {"code":"heart_beat"};
            websock.send(JSON.stringify(agentData));
        },60000)
    }else{
        
    }
    
}
getSysConnet();
// socketApi.sendSock('text',getConfigResult);