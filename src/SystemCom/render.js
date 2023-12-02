import { h, renderSlot } from 'vue';
import VXETable from 'vxe-table'
import { ElImage, ElPopper , ElAvatar }  from 'element-plus' 
// 创建一个简单的展开内容渲染
let _this = this;
VXETable.renderer.mixin({
"rateVal_1": {
    renderDefault(h2, params) {
        let { row, column } = params;
        let url = serverFilePath + row[column.field];
        
        return h(ElPopper, null,
            [
                h(ElImage, { src: url}, "reference"),
                h(ElImage, { src: url}, "default")
            ]
        )
    }
}
})
