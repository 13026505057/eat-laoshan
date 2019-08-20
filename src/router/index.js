import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [{
                    name: '管控人分布',
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    name: '待入库',
                    path: '/waitForInStore',
                    component: resolve => require(['../components/page/waitForInStore.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '入库历史',
                    path: '/inStoreHistory',
                    component: resolve => require(['../components/page/inStoreHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '临时卡管理',
                    path: '/cardAdmin',
                    component: resolve => require(['../components/page/cardAdmin.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '就餐费用查询',
                    path: '/moneyByMonth',
                    component: resolve => require(['../components/page/moneyByMonth.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '充值',
                    path: '/addInvest',
                    component: resolve => require(['../components/page/addInvest.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '就餐时间设置',
                    path: '/timeSetting',
                    component: resolve => require(['../components/page/timeSetting.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '充值记录查询设置',
                    path: '/invest',
                    component: resolve => require(['../components/page/invest.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '违规纪律查询',
                    path: '/outRule',
                    component: resolve => require(['../components/page/outRule.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '待出库',
                    path: '/waitForOutStore',
                    component: resolve => require(['../components/page/waitForOutStore.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '出库历史',
                    path: '/outStoreHistory',
                    component: resolve => require(['../components/page/outStoreHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '待归还',
                    path: '/returnStore',
                    component: resolve => require(['../components/page/returnStore.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '归还历史',
                    path: '/returnHistory',
                    component: resolve => require(['../components/page/returnHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '待盘点',
                    path: '/waitForCheck',
                    component: resolve => require(['../components/page/waitForCheck.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '月盘点',
                    path: '/checkByMounth',
                    component: resolve => require(['../components/page/checkByMounth.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '年盘点',
                    path: '/checkByYear',
                    component: resolve => require(['../components/page/checkByYear.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '盘点历史',
                    path: '/checkHistory',
                    component: resolve => require(['../components/page/checkHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '历史案卷',
                    path: '/history',
                    component: resolve => require(['../components/page/history.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '存储设备设置',
                    path: '/storeLocation',
                    component: resolve => require(['../components/page/storeLocation.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '部门设置',
                    path: '/bumenAdmin',
                    component: resolve => require(['../components/page/bumenAdmin.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '职位设置',
                    path: '/zhiweiAdmin',
                    component: resolve => require(['../components/page/zhiweiAdmin.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '人员设置',
                    path: '/userAdmin',
                    component: resolve => require(['../components/page/userAdmin.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '摄像头设置',
                    path: '/camera',
                    component: resolve => require(['../components/page/camera.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '操作记录',
                    path: '/actionHistory',
                    component: resolve => require(['../components/page/actionHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '档案分析',
                    path: '/danganfenxi',
                    component: resolve => require(['../components/page/danganfenxi.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '案卷操作记录',
                    path: '/actionHistory',
                    component: resolve => require(['../components/page/actionHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '现场还原',
                    path: '/videoHistory',
                    component: resolve => require(['../components/page/videoHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '借阅总结',
                    path: '/jieyuezongjie',
                    component: resolve => require(['../components/page/jieyuezongjie.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '年度总结',
                    path: '/nianzhongzongjie',
                    component: resolve => require(['../components/page/nianzhongzongjie.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '历史沿革',
                    path: '/lishiyange',
                    component: resolve => require(['../components/page/lishiyange.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '整体案件梳理',
                    path: '/anjianchaxun',
                    component: resolve => require(['../components/page/anjianchaxun.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '整体案件查询',
                    path: '/anjianchaxun1',
                    component: resolve => require(['../components/page/anjianchaxun1.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '已回执案件梳理',
                    path: '/returnBacked',
                    component: resolve => require(['../components/page/returnBacked.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '已回执案件查询',
                    path: '/returnBacked1',
                    component: resolve => require(['../components/page/returnBacked1.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '待回执案件梳理',
                    path: '/returnBacking',
                    component: resolve => require(['../components/page/returnBacking.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '待回执案件查询',
                    path: '/returnBacking1',
                    component: resolve => require(['../components/page/returnBacking1.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '在库案件档案梳理表',
                    path: '/instore',
                    component: resolve => require(['../components/page/instore.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '在库案件档案查询',
                    path: '/instore1',
                    component: resolve => require(['../components/page/instore1.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '部门归档梳理',
                    path: '/inStoreByBumen',
                    component: resolve => require(['../components/page/inStoreByBumen.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '部门借阅梳理',
                    path: '/historyByBumen',
                    component: resolve => require(['../components/page/historyByBumen.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '已入库案件档案',
                    path: '/inStored',
                    component: resolve => require(['../components/page/inStored.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '已出库案件档案',
                    path: '/outStored',
                    component: resolve => require(['../components/page/outStored.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '已归还案件档案',
                    path: '/returnStored',
                    component: resolve => require(['../components/page/returnStored.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '部门月归档统计',
                    path: '/bumenByMonth',
                    component: resolve => require(['../components/page/bumenByMonth.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '部门年归档统计',
                    path: '/bumenByYear',
                    component: resolve => require(['../components/page/bumenByYear.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '部门年借阅统计',
                    path: '/bumenByYearOut',
                    component: resolve => require(['../components/page/bumenByYearOut.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '部门月借阅统计',
                    path: '/bumenByMonthOut',
                    component: resolve => require(['../components/page/bumenByMonthOut.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '应入库案件确认',
                    path: '/waitForInstore1',
                    component: resolve => require(['../components/page/waitForInstore1.vue'], resolve) // Vue-Quill-Editor组件
                },
                {

                    name: '承办人月归档梳理',
                    path: '/chengbanrenByMonth',
                    component: resolve => require(['../components/page/chengbanrenByMonth.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '承办人年归档梳理',
                    path: '/chengbanrenByYear',
                    component: resolve => require(['../components/page/chengbanrenByYear.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '承办人整体归档梳理',
                    path: '/chengbanren',
                    component: resolve => require(['../components/page/chengbanren.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '打印测试',
                    path: '/printTest',
                    component: resolve => require(['../components/page/printTest.vue'], resolve) // Vue-Quill-Editor组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/tvShow',
            component: resolve => require(['../components/page/tvShow.vue'], resolve)
        },
    ]
})