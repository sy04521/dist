<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="江苏省" value="江苏省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                    <el-option key="3" label="湖北省" value="湖北省"></el-option>
                    <el-option key="4" label="上海市" value="上海市"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="date" label="日期" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" :formatter="formatter">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="100">
                </el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "basetable",
    data() {
        return {
            url: "./vuetable.json",
            tableData: [
                {
                    id: 1,
                    date: "1993-04-07",
                    name: "贾杰",
                    address: "海南省 海口市 美兰区"
                },
                {
                    id: 2,
                    date: "2010-08-02",
                    name: "侯强",
                    address: "新疆维吾尔自治区 和田地区 策勒县"
                },
                {
                    id: 3,
                    date: "1981-08-07",
                    name: "白磊",
                    address: "云南省 普洱市 宁洱哈尼族彝族自治县"
                },
                {
                    id: 4,
                    date: "1978-02-16",
                    name: "苏霞",
                    address: "台湾 基隆市 中山区"
                },
                {
                    id: 5,
                    date: "1999-02-10",
                    name: "汤秀兰",
                    address: "天津 天津市 东丽区"
                },
                {
                    id: 6,
                    date: "2003-01-03",
                    name: "马磊",
                    address: "江苏省 苏州市 吴江区"
                },
                {
                    id: 7,
                    date: "1989-07-19",
                    name: "唐军",
                    address: "重庆 重庆市 南岸区"
                },
                {
                    id: 8,
                    date: "1990-02-16",
                    name: "谢刚",
                    address: "江西省 景德镇市 珠山区"
                },
                {
                    id: 9,
                    date: "1989-09-10",
                    name: "孟娟",
                    address: "天津 天津市 津南区"
                },
                {
                    id: 10,
                    date: "1999-02-12",
                    name: "范磊",
                    address: "安徽省 安庆市 岳西县"
                }
            ],
            cur_page: 1,
            multipleSelection: [],
            select_cate: "",
            select_word: "",
            del_list: [],
            is_search: false,
            editVisible: false,
            delVisible: false,
            form: {
                name: "",
                date: "",
                address: ""
            },
            idx: -1
        };
    },
    created() {
        // this.getData();
    },
    computed: {
        data() {
            return this.tableData.filter(d => {
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.name === this.del_list[i].name) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    if (
                        d.address.indexOf(this.select_cate) > -1 &&
                        (d.name.indexOf(this.select_word) > -1 ||
                            d.address.indexOf(this.select_word) > -1)
                    ) {
                        return d;
                    }
                }
            });
        }
    },
    methods: {
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val;
            // this.getData();
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
            if (process.env.NODE_ENV === "development") {
                this.url = "/ms/table/list";
            }
            this.$axios
                .post(this.url, {
                    page: this.cur_page
                })
                .then(res => {
                    this.tableData = res.data.list;
                });
        },
        search() {
            this.is_search = true;
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleEdit(index, row) {
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
                name: item.name,
                date: item.date,
                address: item.address
            };
            this.editVisible = true;
        },
        handleDelete(index, row) {
            this.idx = index;
            this.delVisible = true;
        },
        delAll() {
            const length = this.multipleSelection.length;
            let str = "";
            this.del_list = this.del_list.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + " ";
            }
            this.$message.error("删除了" + str);
            this.multipleSelection = [];
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 保存编辑
        saveEdit() {
            this.$set(this.tableData, this.idx, this.form);
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        },
        // 确定删除
        deleteRow() {
            this.tableData.splice(this.idx, 1);
            this.$message.success("删除成功");
            this.delVisible = false;
        }
    }
};
</script>

<style scoped>
.table {
    height: 100%;
}
.crumbs {
    padding-bottom: 10px;
}
.pagination {
    margin: 20px 0;
    text-align: right;
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.del-dialog-cnt {
    font-size: 16px;
    text-align: center;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
</style>
