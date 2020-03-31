<template>
  <div>
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :option="option" 
      @row-update="update" 
      @row-save="create" 
      @row-del="remove"></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource: string
  data = {};
  option = {};
  created() {
    this.fetch();
    this.fetchOption()
  }
  async fetch() {
    const res = await this.$http.get(`${this.resource}`);
    this.data = res.data;
  }

  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
    console.log(res.data)
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
