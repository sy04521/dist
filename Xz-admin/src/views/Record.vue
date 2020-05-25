<template>
    <div class="record">
        <div class="record_head">
            <el-row type="flex" justify="space-between">
                <el-col :span="12">
                    <el-input class="search" size="small" v-model="searchVal" placeholder="输入标题查询"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="haddleSearch">搜索</el-button>
                </el-col>
                <el-col :span="12" class="head_right">
                    <el-button type="primary" size="small" icon="el-icon-delete" :disabled="disabled" @click="recordsDelete">批量删除</el-button>
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="haddleAddRecord">新增</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table :height="Height" v-loading="loading" @select-all="handleSelectAll" @selection-change="handleSelectionChange" :data="recordList.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe ref="multipleTable">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="_id" label="序号" align="center">
                <!-- <span>{{recordList}} </span> -->
            </el-table-column>
            <el-table-column prop="name" label="类别" align="center">
            </el-table-column>
            <el-table-column prop="title" label="标题" align="center">
            </el-table-column>
            <el-table-column prop="image" label="图片" align="center">
                <template slot-scope="scope">
                    <el-image :src="scope.row.image" style="width: 100px; height: 70px; border-radius: 4px" :fit="fits[2]"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="content" label="内容" align="center">
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="haddleEditRecord(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" @click="haddleDeleteRecord(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[7, 15, 40]" background layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 新增出框 -->
        <el-dialog :title="title" width='600px' :visible.sync="addVisible" :before-close="beforeclose">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item style="display: none" label="_id">
                    <el-input v-model="form._id" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="类别">
                    <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.title" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="form.content" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <label class="upimage">
                        <img v-if="src" :src="src" class="avatar">
                        <i v-else class="el-icon-plus uploaderIcon"></i>
                        <input class="fileInput" type="file" accept=".jpg, .jpeg, .png" @change="uploadAvatar">
                    </label>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSave">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
// 接口调用
import {
    getRecordList,
    uploadAvatar,
    recordAdd,
    recordEdit,
    recordDelete,
    search,
    recordsDelete,
    getRecordPageList
} from "@/api/zoom";

export default {
    data() {
        return {
            // 搜索值框双向绑定
            searchVal: "",
            Height: 0,
            recordList: [],
            total: 0,
            currentPage: 1,
            pagesize: 7,
            // 表格加载loading...
            loading: false,
            // 新增弹窗显示和隐藏
            addVisible: false,
            form: {
                _id: "",
                title: "",
                name: "",
                image: "",
                content: ""
            },
            // 列表中的图片显示的模式
            fits: ["fill", "contain", "cover", "none", "scale-down"],
            dialogImageUrl: "",
            dialogVisible: false,
            src: "",
            fromImg: "",
            // 上传图片需要
            headers: { "content-type": "multipart/form-data" },
            // 判定新增和修改标题
            title: "",
            // 选中的集合
            multipleSelection: [],
            // 批量删除按钮状态
            disabled: false
        };
    },
    created() {
        this.getRecordList();
    },
    mounted() {
        this.Height = window.innerHeight - 280;
    },
    methods: {
        getRecordList() {
            getRecordList().then(res => {
                this.recordList = res.data;
                this.total = res.data.length;
            });
        },
        // 搜索
        haddleSearch() {
            let searchVal = this.searchVal;
            let data = {};
            data.title = searchVal;
            data.name = searchVal;
            if (searchVal == "") {
                getRecordList().then(res => {
                    this.recordList = res.data;
                    this.total = res.data.length;
                });
            } else {
                search(data).then(res => {
                    this.recordList = res.data;
                    this.total = res.data.length;
                    if (res.data.length >= 1) {
                        this.$message({
                            message: res.message,
                            center: true,
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: "没有对应的数据！",
                            type: "warning"
                        });
                    }
                });
            }
        },
        // 新增操作
        haddleAddRecord() {
            this.form.title = "";
            this.form.name = "";
            this.form.content = "";
            this.form.image = "";
            this.addVisible = true;
            this.title = "新增";
        },
        // 修改操作
        haddleEditRecord(index, row) {
            this.form._id = row._id;
            this.form.name = row.name;
            this.form.title = row.title;
            this.form.content = row.content;
            // this.form.image = row.image;
            this.addVisible = true;
            this.src = row.image;
            this.title = "修改";
        },

        // 模态框关闭前调用方法
        beforeclose(done) {
            done();
            this.src = "";
        },
        // 上传图片
        uploadAvatar(e) {
            this.src = URL.createObjectURL(e.target.files[0]);
            this.form.image = e.target.files[0];
        },
        // 新增 , 修改 保存
        onSave() {
            let fromdata = {};
            fromdata.name = this.form.name;
            fromdata.title = this.form.title;
            fromdata.content = this.form.content;
            let fromImg = this.form.image;
            fromdata.image = fromImg;
            if (fromImg == "") {
                this.$message({
                    message: "上传的图片为空！",
                    type: "warning"
                });
                return false;
            }
            uploadAvatar(fromImg).then(res => {
                fromdata.image = res.data.path;
                if (this.title == "新增") {
                    recordAdd(fromdata).then(res => {
                        getRecordList().then(res => {
                            this.recordList = res.data;
                            this.total = res.data.length;
                            this.addVisible = false;
                            this.$message({
                                message: "新增记录成功！",
                                center: true,
                                type: "success"
                            });
                        });
                    });
                }
                if (this.title == "修改") {
                    fromdata._id = this.form._id;
                    recordEdit(fromdata).then(res => {
                        getRecordList().then(res => {
                            this.recordList = res.data;
                            this.total = res.data.length;
                            this.addVisible = false;
                            this.$message({
                                message: "修改记录成功！",
                                center: true,
                                type: "success"
                            });
                        });
                    });
                }
            });
        },
        // 单条数据删除
        haddleDeleteRecord(index, row) {
            this.$confirm("确定要删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    recordDelete({ _id: row._id }).then(res => {
                        getRecordList().then(res => {
                            this.recordList = res.data;
                            this.total = res.data.length;
                            this.$message({
                                type: "success",
                                center: true,
                                message: "删除成功!"
                            });
                        });
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        center: true,
                        message: "已取消删除"
                    });
                });
        },
        // 保存勾选的列表
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },

        handleSelectAll(selection) {
            // console.log(selection);
            // if (this.multipleSelection.length == 0) {
            //     this.disabled = true;
            // } else {
            //     this.disabled = false;
            // }
        },
        // 批量删除
        recordsDelete() {
            let vals = this.multipleSelection;
            if (vals.length == 0) {
                this.$message({
                    message: "请选择对应的删除数据",
                    center: true,
                    type: "warning"
                });
                return false;
            }
            this.$confirm("确定要删除选中的记录吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    // 调用批量删除接口
                    recordsDelete(vals).then(res => {
                        getRecordList().then(res => {
                            this.recordList = res.data;
                            this.total = res.data.length;
                            this.$message({
                                type: "success",
                                center: true,
                                message: "删除成功!"
                            });
                        });
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        center: true,
                        message: "已取消删除"
                    });
                });
        },
        // 选择每页显示多少条数据
        handleSizeChange(size) {
            this.pagesize = size;
        },
        // 跳转指定页数
        handleCurrentChange(currentPage) {
            let that = this;
            this.loading = true;
            setTimeout(function() {
                that.loading = false;
            }, 500);
            this.currentPage = currentPage;

            // 实现分页加载（完成）
            // let data = {};
            // data.currentPage = currentPage;
            // data.pagesize = this.pagesize;

            // getRecordPageList(data).then(res => {
            //     this.recordList = res.data;
            //     this.$message({
            //         type: "success",
            //         center: true,
            //         message: res.msg
            //     });
            // });
        }
    }
};
</script>


<style lang="less" scoped>
.record {
    &_head {
        // display: flex;
        // flex-direction: row;
        // justify-content: flex-start;
        margin-bottom: 20px;
        .search {
            width: 200px;
            display: inline-block;
        }
        .head_right {
            text-align: right;
        }
    }
    .red {
        color: red;
    }
    .pagination {
        margin: 20px 0;
        text-align: right;
    }
}
.upimage {
    position: relative;
    overflow: hidden;
    .uploaderIcon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 6px;
    }
    .fileInput {
        width: 178px;
        display: none;
        position: absolute;
        top: 0;
        left: 0;
    }
}

// .avatar-uploader .el-upload {
//     border: 1px dashed #ddd;
//     border-radius: 6px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
// }
// .avatar-uploader .el-upload:hover {
//     border-color: #409eff;
// }
// .avatar-uploader-icon {
//     font-size: 28px;
//     color: #8c939d;
//     width: 178px;
//     height: 178px;
//     line-height: 178px;
//     text-align: center;
// }
.avatar {
    width: 178px;
    height: 178px;
    display: block;
    border-radius: 6px;
}
</style>

