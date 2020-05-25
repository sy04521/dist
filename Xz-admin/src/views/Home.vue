<template>
    <div class="wrapper">
        <div class="header">
            <div :class="collapse?'header_coll_width':'header_left'">
                <i class="el-icon-s-platform"></i>
                <span class="header_logo">{{collapse?'':'后台管理'}}</span>
            </div>
            <div class="header_right" :class="collapse?'header_coll_right':'header_r'">
                <div class="btn_menu" @click="collapseChage">
                    <i class="el-icon-menu"></i>
                </div>
                <div class="user_con">
                    <!-- 全屏显示 -->
                    <div class="btn_fullscreen" @click="handleFullScreen">
                        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                            <i class="el-icon-rank"></i>
                        </el-tooltip>
                    </div>
                    <!-- 消息中心 -->
                    <div class="btn_bell">
                        <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                            <router-link to="/tabs">
                                <i class="el-icon-bell"></i>
                            </router-link>
                        </el-tooltip>
                        <span class="btn_bell_badge" v-if="message"></span>
                    </div>
                    <!-- 用户头像 -->
                    <div class="user_head" @click="getDatae"><img src="../assets/1.jpg"></div>
                    <!-- 用户名下拉菜单 -->
                    <el-dropdown class="user_name" trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{username}} <i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <!-- <a href="http://www.baidu.com" target="_blank"> -->
                            <el-dropdown-item>Xzoom</el-dropdown-item>
                            <!-- </a> -->
                            <a href="http://www.baidu.com" target="_blank">
                                <el-dropdown-item>项目</el-dropdown-item>
                            </a>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <div class="sidebar">
            <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
                <!-- <template v-for="item in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index" :key="item.index">
                            <template slot="title">
                                <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                            </template>
                            <template v-for="subItem in item.subs">
                                <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                    <template slot="title"><i :class="subItem.icon"></i>{{ subItem.title }}</template>
                                    <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                        <i :class="threeItem.icon"></i>{{ threeItem.title }}
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                    <i :class="item.icon"></i>{{ subItem.title }}
                                </el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index" :key="item.index">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </el-menu-item>
                    </template>
                </template> -->
                <side-menu :list='items' :coll='collapse'>
                </side-menu>
            </el-menu>
        </div>
        <div class="content_box" :class="{'content_collapse':collapse}">
            <v-tags></v-tags>
            <div class="content" :style="{height: Height+'px'}">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.wrapper {
    position: relative;
    background-color: #e7edf8;
    .header {
        height: 60px;
        line-height: 60px;
        width: 100%;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        background-color: #e7edf8;
        &_logo {
            transition: all 0.8s rotate(7deg);
        }
        &_left {
            float: left;
            width: 215px;
            background-color: #242f42;
            padding-left: 25px;
            color: #fff;
            font-size: 20px;
            font-weight: 800;
            overflow: hidden;
            // transform: translate(0, 0);
            transition: all 0.3s ease-in-out;
        }
        &_coll_width {
            float: left;
            width: 64px;
            height: 60px;
            background-color: #242f42;
            color: #fff;
            font-size: 20px;
            font-weight: 800;
            // transform: translate(0px, 0);
            transition: all 0.3s ease-in-out;
            overflow: hidden;
            text-align: center;
        }
        &_coll_right {
            width: calc(~"100% - 64px");
            float: left;
            height: 60px;
            transition: all 0.3s ease-in-out;
            overflow: hidden;
        }
        &_r {
            width: calc(~"100% - 240px");
            float: left;
            transition: all 0.3s ease-in-out;
            height: 60px;
            overflow: hidden;
        }
        &_right {
            // float: left;
            // height: 60px;
            // overflow: hidden;
            .btn_menu {
                width: 60px;
                font-size: 24px;
                display: inline-block;
                text-align: center;
                color: #000;
            }
            .user_con {
                display: inline-block;
                line-height: 60px;
                text-align: right;
                padding-right: 20px;
                width: calc(~"100% - 85px");
                color: #000;
                .btn_fullscreen {
                    display: inline-block;
                    transform: rotate(45deg);
                    margin-right: 5px;
                    font-size: 24px;
                    cursor: pointer;
                }
                .btn_bell {
                    display: inline-block;
                    position: relative;
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    cursor: pointer;
                    font-size: 24px;
                    .el-icon-bell {
                        color: #000;
                    }
                    &_badge {
                        position: absolute;
                        right: 0;
                        top: 13px;
                        width: 8px;
                        height: 8px;
                        border-radius: 4px;
                        background: #f56c6c;
                    }
                }
                .user_head {
                    display: inline-block;
                    margin-left: 20px;
                    line-height: 60px;
                    vertical-align: middle;
                    img {
                        display: block;
                        margin-top: -10px;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                    }
                }
                .user_name {
                    margin-left: 10px;
                    color: #000;
                    cursor: pointer;
                }
            }
        }
    }
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 60px;
        bottom: 0;
        overflow-y: scroll;
        color: #fff;
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 240px;
    }
    .sidebar > ul {
        height: 100%;
    }
    // 内容切换区域
    .content_box {
        position: absolute;
        left: 240px;
        height: 100%;
        right: 0;
        top: 60px;
        bottom: 0;
        overflow: auto;
        // margin: 10px;
        -webkit-transition: left 0.3s ease-in-out;
        transition: left 0.3s ease-in-out;
        // background-color: #ddd;
        // box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        // border-radius: 8px;
        .content {
            width: auto;
            // height: clac (~ "100% - 100px");
            height: 100%;
            margin: 10px;
            padding: 20px;
            overflow: auto;
            box-sizing: border-box;
            background-color: #fff;
            border-radius: 8px;
        }
        .content1 {
            width: auto;
            height: calc(~"100% - 30px");
            padding: 10px;
            overflow: auto;
            box-sizing: border-box;
            background-color: #fff;
        }
    }
    .content_collapse {
        left: 64px;
    }
}
</style>
<script>
import bus from "@/lib/bus";
import vTags from "./Tags.vue";
import SideMenu from "@/components/side-menu";
import { getData } from "@/api/user";

export default {
    components: {
        SideMenu,
        vTags
    },
    data() {
        return {
            tagsList: [],
            Height: 0,
            fullscreen: false,
            collapse: false,
            message: 2,
            items: [
                {
                    icon: "el-icon-s-home",
                    index: "dashboard",
                    title: "系统首页"
                },
                {
                    icon: "el-icon-date",
                    index: "table",
                    title: "基础表格"
                },
                {
                    icon: "el-icon-bank-card",
                    index: "test",
                    title: "测试"
                },
                {
                    icon: "el-icon-bank-card",
                    index: "record",
                    title: "记录"
                },
                {
                    icon: "el-icon-bank-card",
                    index: "sys",
                    title: "系统管理",
                    subs: [
                        {
                            icon: "el-icon-date",
                            index: "user",
                            title: "用户管理"
                        },
                        // {
                        //     icon: "el-icon-date",
                        //     index: "3-2",
                        //     title: "三级菜单",
                        //     subs: [
                        //         {
                        //             icon: "el-icon-date",
                        //             index: "editor",
                        //             title: "富文本编辑器"
                        //         },
                        //         {
                        //             icon: "el-icon-date",
                        //             index: "markdown",
                        //             title: "markdown编辑器"
                        //         }
                        //     ]
                        // },
                        {
                            icon: "el-icon-date",
                            index: "power",
                            title: "权限管理"
                        }
                    ]
                }
                // {
                //     icon: "el-icon-date",
                //     index: "icon",
                //     title: "自定义图标"
                // },
                // {
                //     icon: "el-icon-date",
                //     index: "charts",
                //     title: "schart图表"
                // },
                // {
                //     icon: "el-icon-rank",
                //     index: "6",
                //     title: "拖拽组件",
                //     subs: [
                //         {
                //             icon: "el-icon-date",
                //             index: "drag",
                //             title: "拖拽列表"
                //         },
                //         {
                //             icon: "el-icon-date",
                //             index: "dialog",
                //             title: "拖拽弹框"
                //         }
                //     ]
                // },
                // {
                //     icon: "el-icon-date",
                //     index: "i18n",
                //     title: "国际化功能"
                // },
                // {
                //     icon: "el-icon-date",
                //     index: "7",
                //     title: "错误处理",
                //     subs: [
                //         {
                //             icon: "el-icon-date",
                //             index: "permission",
                //             title: "权限测试"
                //         },
                //         {
                //             icon: "el-icon-date",
                //             index: "404",
                //             title: "404页面"
                //         }
                //     ]
                // }
            ]
        };
    },
    created() {
        bus.$on("collapse", msg => {
            console.log(msg);
            this.collapse = msg;
        });
        bus.$on("tags", msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
        console.log(bus);
    },
    mounted() {
        this.Height = document.documentElement.clientHeight - 110;

        // if (document.body.clientWidth < 800) {
        //     this.collapseChage();
        // }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace("/", "");
        },
        username() {
            let username = localStorage.getItem("ms_username");
            return username ? username : this.name;
        }
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == "loginout") {
                localStorage.removeItem("ms_username");
                this.$router.push("/login");
            }
        },

        getDatae() {
            getData().then(res => {
                console.log(res.data);
            });
        },
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit("collapse", this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    }
};
</script>


