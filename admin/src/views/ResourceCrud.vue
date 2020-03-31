<template>
  <div>
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :option="option"
      :page.sync="page"
      @row-update="update" 
      @row-save="create" 
      @row-del="remove"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="changeSearch"></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource: string
  data: any = {};
  option: any = {};
  page: any = {
    total: 0,
    pageSize: 5,
    pageSizes: [5, 10, 15, 20]
  }
  query: any = {
    limit: 5
  }

  created() {
    this.fetch();
    this.fetchOption()
  }

  // 分页
  changePage({currentPage, pageSize}) {
    this.query.limit = pageSize
    this.query.page = currentPage
    this.fetch();
  }

  // 排序
  changeSort({prop, order}) {
    if(!order) {
      this.query.sort = null
    } else {
      this.query.sort = {
        [prop]:order === 'ascending ? 1 : -1'
      }
    }
    this.fetch();
  }

  // 搜索
  changeSearch(params,done) {
    for (let k in params) {
      const feild = this.option.column .find(v => v.prop === k)
      if(feild.regex) {
        params[k] = { $regex: params[k] }
      }
    }
    this.query.where = params
    this.fetch();
    done()
  }

  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    });
    this.data = res.data;
    this.page.total = res.data.total
  }

  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
  }


  async update(row,index,done) {
    let data = JSON.parse(JSON.stringify(row))
    delete data.$index
    await this.$http.put(`${this.resource}/${row._id}`, data)
    this.$message.success('更新成功')
    this.fetch()
    done()
  }

  async create(row,done) {
    await this.$http.post(`${this.resource}`, row)
    this.$message.success('创建成功')
    this.fetch()
    done()
  }

  async remove(row) {
    try {
      await this.$confirm("是否确定删除数据");
    } catch (err) {
      return;
    }
    await this.$http.delete(`${this.resource}/${row._id}`);
    this.$message.success("删除成功");
    this.fetch();
  }
}
</script>

<style>
</style>
