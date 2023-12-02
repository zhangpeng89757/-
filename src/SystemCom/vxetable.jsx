import { ref, getCurrentInstance } from 'vue';
import VXETable from 'vxe-table'

export const InitVxeTvaleRender = () => {
    let { proxy } = getCurrentInstance();
    //表格图片气泡
    VXETable.renderer.add('TableImg', {
        // 默认显示模板
        renderDefault (renderOpts, params, c) {
            let { row, column, columnIndex } = params
            if(row[column.field] == undefined) {
                return "";
            }
            let refName = `tabPopover${columnIndex}`
            let url = serverFilePath + row[column.field];
            const click = () => {
                popover.component.exposed.hide()
            }
            const slot = {
                default: () => {
                    return <el-image src={url} style={{ cursor: 'pointer' }} fit="scale-down"/> 
                },
                reference: () => (
                    <el-image onclick={click} src={url} style={{ cursor: 'pointer', width: '40px', height: '40px'}} fit="scale-down"  preview-src-list={[url]} initial-index="1"/>
                ),
                
            }
            let popover = <el-popover
                        ref={refName}
                        placement='left-start'
                        width="auto"
                        popperClass='tablePopover'
                        trigger='hover'
                        v-slots={slot}/>
            return popover;
        }
    });
    //表格显示是或否
    VXETable.renderer.add('TableRN', {
        renderDefault (renderOpts, params) {
            let { row, column } = params
            if(row[column.field] == undefined) {
                return "";
            }
            if(row[column.field]) {
                return <el-icon color="#67C23A" size="20"><SuccessFilled /></el-icon>
            }
            return <el-icon color="#F56C6C" size="20"><CircleCloseFilled /></el-icon>
        }
    });
    //表格显示是或否反转
    VXETable.renderer.add('TableRNRever', {
        renderDefault (renderOpts, params) {
            let { row, column } = params
            if(row[column.field] == undefined) {
                return "";
            }
            if(row[column.field]) {
                return <el-icon color="#F56C6C" size="20"><CircleCloseFilled /></el-icon>
            }
            return <el-icon color="#67C23A" size="20"><SuccessFilled /></el-icon>
        }
    })
};