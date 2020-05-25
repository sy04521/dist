<template>
    <div>
        <template v-for="item in list">
            <template v-if="item.subs">
                <el-submenu :index="item.index" :key="item.index">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span :class="coll?'a':''" slot="title">{{item.title}}</span>
                    </template>
                    <side-menu :list="item.subs"></side-menu>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.index" :key="item.index">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </template>
        </template>
    </div>
</template>
<script>
// import ReSubmenu from "./re-submenu.vue";
export default {
    // components: {
    //     ReSubmenu
    // },
    name: "SideMenu",
    props: {
        // 通过组件递归导航折叠的时候会多出一个div 通过隐藏title处理
        coll: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array,
            default: () => []
        }
    }
};
</script>
<style lang="less">
.a {
    display: none;
}
</style>


