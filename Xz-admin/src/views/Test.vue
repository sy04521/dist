<template>
    <div class="container">
        <div class="handlebox">
            <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="haddleAdd">新增</el-button>
        </div>
        <el-table :height="Height" :data="testdata" stripe ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="_id" label="id" align="center">
            </el-table-column>
            <el-table-column prop="updated_at" label="日期" sortable align="center">
            </el-table-column>
            <el-table-column prop="content" label="内容" align="center">
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" @click="handleDestroy(scope.$index, scope.row)" class="red">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination :hide-on-single-page="hideSP" :page-size=15 background layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>

        <!-- 新增出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.updated_at" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="id">
                    <el-input v-model="form._id"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.updated_at" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="id">
                    <el-input v-model="form._id"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getData, create, edit, destroy, deletemany } from "@/api/user";
export default {
    name: "basetable",
    data() {
        return {
            testdata: [],
            addVisible: false,
            editVisible: false,
            Height: 0,
            form: {
                _id: "",
                updated_at: "",
                content: ""
            },
            total: 0,
            hideSP: false,
            multipleSelection: []
        };
    },
    created() {
        this.getTestData();
    },
    mounted() {
        this.Height = window.innerHeight - 280;
    },
    computed: {},
    methods: {
        // 获取列表
        getTestData() {
            getData().then(res => {
                console.log(res);
                this.testdata = res;
                this.total = res.length;
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 调出修改弹窗
        handleEdit(index, row) {
            this.idx = index;
            const item = this.testdata[index];
            this.form = {
                _id: item._id,
                updated_at: item.updated_at,
                content: item.content
            };
            this.editVisible = true;
        },
        // 修改保存
        saveEdit() {
            let content = this.form.content;
            let _id = this.form._id;
            let that = this;
            edit({ _id: _id, content: content }).then(res => {
                that.editVisible = false;
                this.$message({
                    message: "恭喜你，修改成功！",
                    center: true,
                    type: "success"
                });
                getData().then(res => {
                    that.testdata = res;
                });
            });
        },
        // 删除操作
        handleDestroy(index, row) {
            this.$confirm("确定要删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    destroy({ _id: row._id }).then(res => {
                        console.log(res);
                        getData().then(res => {
                            this.testdata = res;
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
        // 调出新增弹窗
        haddleAdd() {
            this.form.updated_at = "";
            this.form.content = "";
            this.addVisible = true;
        },
        // 新增保存
        saveAdd() {
            let content = this.form.content;
            let _id = this.form._id;
            create({ content: content }).then(res => {
                this.addVisible = false;
                this.$message({
                    message: "恭喜你，添加成功！",
                    center: true,
                    type: "success"
                });
                getData().then(res => {
                    this.testdata = res;
                });
            });
        },
        // 删除所有
        delAll() {
            const length = this.multipleSelection.length;
            let str = "";
            // this.testdata = this.testdata.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].content + " ";
            }
            this.$message({
                message: "删除了" + str,
                center: true,
                type: "success"
            });
            deletemany(this.multipleSelection).then(res => {
                console.log(res);
            });
        }
    }
};
</script>

<style lang="less" scoped>
.handlebox {
    text-align: right;
    margin-bottom: 10px;
}
.pagination {
    margin: 20px 0;
    text-align: right;
}
.red {
    color: red;
}
</style>
