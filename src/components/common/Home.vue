<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="crumbs">
            <v-breadcrumb></v-breadcrumb>
        </div>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vBreadcrumb from './breadcrumb.vue';
    export default {
        components:{
            vHead, vSidebar,vBreadcrumb
        },
        data: function(){
          return {

          }     
        },
        mounted(){
          
            // this.getSystemMsg();
        },
        methods: {
            getSystemMsg(){
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
                        self.$notify.info({
                          title: '消息',
                          message: '这是一条消息的提示消息',
                          duration: 0,
                          onClose:function(){
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
                                   
                                }else{
                                  
                                }
                            });
                          }
                        });
                    }else{
                      self.$response(data,self);
                    }
                });
            }
        },
    }
</script>
