<template>
  <!--  知识产权项目资助-->
  <div class="projectSubsidize">
    <knowledgeTitle title="知识产权项目资助"></knowledgeTitle>
    <div class="button">
      <button  class="btn" v-for="(item,index) in btn" :key="index" @click="handleClick(index,$e)" :id="'active'?index===btnIndex:false">{{item}}</button>
    </div>
    <div style="width: 100%;height: 100%" >
      <el-table
          :data="scrollList"
          style="width: 100%"
          class="top"
          :header-cell-style="{textAlign: 'center',backgroundColor: '#051e46',border:0,color:'#ffffff'}"
          :cell-style="{border:0}"
      >
        <el-table-column v-for="(item, index) in title"  :label="item" align="center"  :key="index" />
      </el-table>
        <Vue3SeamlessScroll  :list="scrollList" class="seamless-warp scroll" :hover="true" :step="0.3">
          <el-table id="box" :height="tableHeight" :data="scrollList" :cell-style="{ textAlign: 'center',color:'#ffffff',border:0}" :header-cell-style="{textAlign: 'center',backgroundColor: '#051e46',border:0}" :show-header="false" stripe>
            <el-table-column prop="year" show-overflow-tooltip/>
            <el-table-column prop="projectName" show-overflow-tooltip/>
            <el-table-column prop="projectUnit" show-overflow-tooltip/>
            <el-table-column prop="money" show-overflow-tooltip/>
            <el-table-column prop="type" show-overflow-tooltip/>
            <el-table-column prop="conclusion" show-overflow-tooltip/>
          </el-table>
        </Vue3SeamlessScroll>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.projectSubsidize{
  height: 50%;
  position: relative;
}
.button{
  position: absolute;
  top: 0;
  right: 0;
}
.btn{
  background: linear-gradient(to top, #1c3b72, #051d42);
  color: #ffffff;
  padding: 2px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin: 5px;
  font-size: 8px;
  width:40px;
  border-radius: 2px;
}
.th{
  width: 100%;
}
.th th{
  width: 16%;
  font-size: 10px;
  background-color: #051e46;
  border: none;
  height: 30px;
}
::v-deep .seamless-warp {
  height: 70%;
  overflow: hidden;
}
::v-deep .top .el-table__body-wrapper {
  display: none;
}
::v-deep .bottom .el-table__header-wrapper {
  display: none;
  width: 100%;
}
#true{
  background: linear-gradient(to top, #bcffed, #03112a);
}
</style>
<script setup>
const { proxy } = getCurrentInstance();
import KnowledgeTitle from "./knowledgeTitle.vue";
import {getCurrentInstance,ref} from 'vue'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { onMounted } from 'vue';
onMounted(() => {
  scrollList.value = List.value.totalList;
  const Height= document.getElementById('box');
  console.log(Height.clientHeight)
  tableHeight.value = Height.clientHeight
});
const title = ref(["年度","项目名称","项目单位","项目金额","知识产权类型","验收结果"])
// 子传父
const rowClick = (row, column, event) => {
  console.log(row,column,event)
  proxy.$emit("rowClick",row, column, event)
}
const tableHeight = ref(null)
const scrollList = ref([])
const btnIndex = ref(0)
const btn = ref(["全部","申请中","实施中","已完成"])
const List=ref({
  "totalList": [
    {
      "level": "省级",
      "year": "2019",
      "projectName": "1",
      "projectUnit": "德阳瑞能电力科技有限公司",
      "money": 20,
      "type": "其它",
      "conclusion": "通过验收",
      "content": "项目获得资金20万元，自筹金额20万元，需要完成“1.公司知识产权拥有量达到45项，开发出有自主产权的产品6项以上；2.公司知识产权转化运用能力提高；3.增强依法保护知识产权意识；4.贯彻《企业知识产权管理规范》，实现公司知识产权管理的标准化和制度化；5.利用公司产业链上企业进行知识产权整合；6.加强知识产权的综合运用；7.大力提高公司知识产权的经济效益和社会效益。对照目标，实际完成情况是1.公司知识产权数量达到并超过了目标要求；2.从2019年至2020年公司有超过4项专利实现了产品化；3.公司配置专人从事专利等相关工作，重视每一个新研发产品或方案的专利申请。4.公司贯彻《企业知识产权管理规范》，配置专职管理人员，设立知识产权专项经费，不断完善知识产权管理制度，将知识产品工作纳入研发、生产等各个环节；5.公司实施完成了产业链上企业的知识产权整合工作，确定了系列产品的产权布局。6.2019年12月建立了知识产权检索、风险管理等数据库。7.2020年2月完成了对前期知识产权维权产品的统计，通过优化知识产权组成结构，提高产品市场推广范围。总体来说目前项目已通过验收，全部完成了合同要求的计定目标。"
    },
    {
      "level": "省级",
      "year": "2019",
      "projectName": "2",
      "projectUnit": "德阳瑞能电力科技有限公司",
      "money": 20,
      "type": "其它",
      "conclusion": "通过验收",
      "content": "项目获得资金20万元，自筹金额20万元，需要完成“1.公司知识产权拥有量达到45项，开发出有自主产权的产品6项以上；2.公司知识产权转化运用能力提高；3.增强依法保护知识产权意识；4.贯彻《企业知识产权管理规范》，实现公司知识产权管理的标准化和制度化；5.利用公司产业链上企业进行知识产权整合；6.加强知识产权的综合运用；7.大力提高公司知识产权的经济效益和社会效益。对照目标，实际完成情况是1.公司知识产权数量达到并超过了目标要求；2.从2019年至2020年公司有超过4项专利实现了产品化；3.公司配置专人从事专利等相关工作，重视每一个新研发产品或方案的专利申请。4.公司贯彻《企业知识产权管理规范》，配置专职管理人员，设立知识产权专项经费，不断完善知识产权管理制度，将知识产品工作纳入研发、生产等各个环节；5.公司实施完成了产业链上企业的知识产权整合工作，确定了系列产品的产权布局。6.2019年12月建立了知识产权检索、风险管理等数据库。7.2020年2月完成了对前期知识产权维权产品的统计，通过优化知识产权组成结构，提高产品市场推广范围。总体来说目前项目已通过验收，全部完成了合同要求的计定目标。"
    },
    {
      "level": "省级",
      "year": "2019",
      "projectName": "3",
      "projectUnit": "德阳瑞能电力科技有限公司",
      "money": 20,
      "type": "其它",
      "conclusion": "通过验收",
      "content": "项目获得资金20万元，自筹金额20万元，需要完成“1.公司知识产权拥有量达到45项，开发出有自主产权的产品6项以上；2.公司知识产权转化运用能力提高；3.增强依法保护知识产权意识；4.贯彻《企业知识产权管理规范》，实现公司知识产权管理的标准化和制度化；5.利用公司产业链上企业进行知识产权整合；6.加强知识产权的综合运用；7.大力提高公司知识产权的经济效益和社会效益。对照目标，实际完成情况是1.公司知识产权数量达到并超过了目标要求；2.从2019年至2020年公司有超过4项专利实现了产品化；3.公司配置专人从事专利等相关工作，重视每一个新研发产品或方案的专利申请。4.公司贯彻《企业知识产权管理规范》，配置专职管理人员，设立知识产权专项经费，不断完善知识产权管理制度，将知识产品工作纳入研发、生产等各个环节；5.公司实施完成了产业链上企业的知识产权整合工作，确定了系列产品的产权布局。6.2019年12月建立了知识产权检索、风险管理等数据库。7.2020年2月完成了对前期知识产权维权产品的统计，通过优化知识产权组成结构，提高产品市场推广范围。总体来说目前项目已通过验收，全部完成了合同要求的计定目标。"
    },
    {
      "level": "省级",
      "year": "2019",
      "projectName": "4",
      "projectUnit": "德阳瑞能电力科技有限公司",
      "money": 20,
      "type": "其它",
      "conclusion": "通过验收",
      "content": "项目获得资金20万元，自筹金额20万元，需要完成“1.公司知识产权拥有量达到45项，开发出有自主产权的产品6项以上；2.公司知识产权转化运用能力提高；3.增强依法保护知识产权意识；4.贯彻《企业知识产权管理规范》，实现公司知识产权管理的标准化和制度化；5.利用公司产业链上企业进行知识产权整合；6.加强知识产权的综合运用；7.大力提高公司知识产权的经济效益和社会效益。对照目标，实际完成情况是1.公司知识产权数量达到并超过了目标要求；2.从2019年至2020年公司有超过4项专利实现了产品化；3.公司配置专人从事专利等相关工作，重视每一个新研发产品或方案的专利申请。4.公司贯彻《企业知识产权管理规范》，配置专职管理人员，设立知识产权专项经费，不断完善知识产权管理制度，将知识产品工作纳入研发、生产等各个环节；5.公司实施完成了产业链上企业的知识产权整合工作，确定了系列产品的产权布局。6.2019年12月建立了知识产权检索、风险管理等数据库。7.2020年2月完成了对前期知识产权维权产品的统计，通过优化知识产权组成结构，提高产品市场推广范围。总体来说目前项目已通过验收，全部完成了合同要求的计定目标。"
    },
    {
      "level": "省级",
      "year": "2019",
      "projectName": "5",
      "projectUnit": "德阳瑞能电力科技有限公司",
      "money": 20,
      "type": "其它",
      "conclusion": "通过验收",
      "content": "项目获得资金20万元，自筹金额20万元，需要完成“1.公司知识产权拥有量达到45项，开发出有自主产权的产品6项以上；2.公司知识产权转化运用能力提高；3.增强依法保护知识产权意识；4.贯彻《企业知识产权管理规范》，实现公司知识产权管理的标准化和制度化；5.利用公司产业链上企业进行知识产权整合；6.加强知识产权的综合运用；7.大力提高公司知识产权的经济效益和社会效益。对照目标，实际完成情况是1.公司知识产权数量达到并超过了目标要求；2.从2019年至2020年公司有超过4项专利实现了产品化；3.公司配置专人从事专利等相关工作，重视每一个新研发产品或方案的专利申请。4.公司贯彻《企业知识产权管理规范》，配置专职管理人员，设立知识产权专项经费，不断完善知识产权管理制度，将知识产品工作纳入研发、生产等各个环节；5.公司实施完成了产业链上企业的知识产权整合工作，确定了系列产品的产权布局。6.2019年12月建立了知识产权检索、风险管理等数据库。7.2020年2月完成了对前期知识产权维权产品的统计，通过优化知识产权组成结构，提高产品市场推广范围。总体来说目前项目已通过验收，全部完成了合同要求的计定目标。"
    },
    {
      "level": "省级",
      "year": "2019",
      "projectName": "6",
      "projectUnit": "德阳瑞能电力科技有限公司",
      "money": 20,
      "type": "其它",
      "conclusion": "通过验收",
      "content": "项目获得资金20万元，自筹金额20万元，需要完成“1.公司知识产权拥有量达到45项，开发出有自主产权的产品6项以上；2.公司知识产权转化运用能力提高；3.增强依法保护知识产权意识；4.贯彻《企业知识产权管理规范》，实现公司知识产权管理的标准化和制度化；5.利用公司产业链上企业进行知识产权整合；6.加强知识产权的综合运用；7.大力提高公司知识产权的经济效益和社会效益。对照目标，实际完成情况是1.公司知识产权数量达到并超过了目标要求；2.从2019年至2020年公司有超过4项专利实现了产品化；3.公司配置专人从事专利等相关工作，重视每一个新研发产品或方案的专利申请。4.公司贯彻《企业知识产权管理规范》，配置专职管理人员，设立知识产权专项经费，不断完善知识产权管理制度，将知识产品工作纳入研发、生产等各个环节；5.公司实施完成了产业链上企业的知识产权整合工作，确定了系列产品的产权布局。6.2019年12月建立了知识产权检索、风险管理等数据库。7.2020年2月完成了对前期知识产权维权产品的统计，通过优化知识产权组成结构，提高产品市场推广范围。总体来说目前项目已通过验收，全部完成了合同要求的计定目标。"
    },
    {
      "level": "省级",
      "year": "2019",
      "projectName": "7",
      "projectUnit": "德阳瑞能电力科技有限公司",
      "money": 20,
      "type": "其它",
      "conclusion": "通过验收",
      "content": "项目获得资金20万元，自筹金额20万元，需要完成“1.公司知识产权拥有量达到45项，开发出有自主产权的产品6项以上；2.公司知识产权转化运用能力提高；3.增强依法保护知识产权意识；4.贯彻《企业知识产权管理规范》，实现公司知识产权管理的标准化和制度化；5.利用公司产业链上企业进行知识产权整合；6.加强知识产权的综合运用；7.大力提高公司知识产权的经济效益和社会效益。对照目标，实际完成情况是1.公司知识产权数量达到并超过了目标要求；2.从2019年至2020年公司有超过4项专利实现了产品化；3.公司配置专人从事专利等相关工作，重视每一个新研发产品或方案的专利申请。4.公司贯彻《企业知识产权管理规范》，配置专职管理人员，设立知识产权专项经费，不断完善知识产权管理制度，将知识产品工作纳入研发、生产等各个环节；5.公司实施完成了产业链上企业的知识产权整合工作，确定了系列产品的产权布局。6.2019年12月建立了知识产权检索、风险管理等数据库。7.2020年2月完成了对前期知识产权维权产品的统计，通过优化知识产权组成结构，提高产品市场推广范围。总体来说目前项目已通过验收，全部完成了合同要求的计定目标。"
    },
    {
      "level": "省级",
      "year": "2019",
      "projectName": "8",
      "projectUnit": "德阳瑞能电力科技有限公司",
      "money": 20,
      "type": "其它",
      "conclusion": "通过验收",
      "content": "项目获得资金20万元，自筹金额20万元，需要完成“1.公司知识产权拥有量达到45项，开发出有自主产权的产品6项以上；2.公司知识产权转化运用能力提高；3.增强依法保护知识产权意识；4.贯彻《企业知识产权管理规范》，实现公司知识产权管理的标准化和制度化；5.利用公司产业链上企业进行知识产权整合；6.加强知识产权的综合运用；7.大力提高公司知识产权的经济效益和社会效益。对照目标，实际完成情况是1.公司知识产权数量达到并超过了目标要求；2.从2019年至2020年公司有超过4项专利实现了产品化；3.公司配置专人从事专利等相关工作，重视每一个新研发产品或方案的专利申请。4.公司贯彻《企业知识产权管理规范》，配置专职管理人员，设立知识产权专项经费，不断完善知识产权管理制度，将知识产品工作纳入研发、生产等各个环节；5.公司实施完成了产业链上企业的知识产权整合工作，确定了系列产品的产权布局。6.2019年12月建立了知识产权检索、风险管理等数据库。7.2020年2月完成了对前期知识产权维权产品的统计，通过优化知识产权组成结构，提高产品市场推广范围。总体来说目前项目已通过验收，全部完成了合同要求的计定目标。"
    }
  ],
  "totalNum": 4,
  "applyList": [
    {
      "level": "省级",
      "year": "2023",
      "projectName": "云上天府“云计算中心”高价值专利培育项目",
      "projectUnit": "四川云上天府科技有限公司",
      "money": null,
      "type": "专利",
      "conclusion": "申请中",
      "content": "“云上天府云计算中心”项目于2021年8月开工建设，目前主体结构已封顶，正在进行机电安装相关工作，预计2023年3月投产。项目按照数据中心国标Ａ级、国际III+以及美国绿色建筑委员会LEED v4金级标准设计和实施，年均PUE值低于1.20，年平均WUE值低于0.70，是四川目前规模最大、标准最高的单体绿色数据中心之一。\n项目拟通过市场宣传推广扩大公司的市场影响力和社会知晓度，逐步打造出闻名全国云计算中心。通过如互联网的入驻、宣传、展示等方式提升公司产品的知名度，提高目标客户对公司产品的认知度，力争促成交易签单3000万。"
    }],
  "applyNum": 4,
  "implementList": [
    {
      "level": "省级",
      "year": "2023",
      "projectName": "一种径向防潮电缆专利（202120552297.8）实施项目",
      "projectUnit": "特变电工（德阳）电缆股份有限公司",
      "money": 20,
      "type": "专利",
      "conclusion": "实施中",
      "content": "主要内容包括：（一）孵化优质科技成果，创新创业扎实推进；（二）保护知识产权，申报专利、植物新品种权、商标权；（三）深化职务科技成果权属改革，创新科技成果转化转移机制；（四）培育壮大成果转化队伍，畅通转化渠道。"
    }],
  "implementNum": 4,
  "completedList": [
    {
      "level": "省级",
      "year": "2019",
      "projectName": "国家知识产权优势企业培育项目",
      "projectUnit": "德阳瑞能电力科技有限公司",
      "money": 20,
      "type": "其它",
      "conclusion": "通过验收",
      "content": "项目获得资金20万元，自筹金额20万元，需要完成“1.公司知识产权拥有量达到45项，开发出有自主产权的产品6项以上；2.公司知识产权转化运用能力提高；3.增强依法保护知识产权意识；4.贯彻《企业知识产权管理规范》，实现公司知识产权管理的标准化和制度化；5.利用公司产业链上企业进行知识产权整合；6.加强知识产权的综合运用；7.大力提高公司知识产权的经济效益和社会效益。对照目标，实际完成情况是1.公司知识产权数量达到并超过了目标要求；2.从2019年至2020年公司有超过4项专利实现了产品化；3.公司配置专人从事专利等相关工作，重视每一个新研发产品或方案的专利申请。4.公司贯彻《企业知识产权管理规范》，配置专职管理人员，设立知识产权专项经费，不断完善知识产权管理制度，将知识产品工作纳入研发、生产等各个环节；5.公司实施完成了产业链上企业的知识产权整合工作，确定了系列产品的产权布局。6.2019年12月建立了知识产权检索、风险管理等数据库。7.2020年2月完成了对前期知识产权维权产品的统计，通过优化知识产权组成结构，提高产品市场推广范围。总体来说目前项目已通过验收，全部完成了合同要求的计定目标。"
    }],
  "completedListNum": 4
})
function handleClick(index,e) {
  console.log(index,btnIndex.value)
  btnIndex.value = index
  console.log(index,btnIndex.value)
  if(index === 0){
    scrollList.value = List.value.totalList
  }else if (index === 1) {
    scrollList.value = List.value.applyList
  }else if (index === 2) {
    scrollList.value = List.value.implementList
  }else if (index === 3) {
    scrollList.value = List.value.completedList
  }
}
</script>