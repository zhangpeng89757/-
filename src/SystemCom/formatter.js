import { render } from "vue";
/**
* 用户状态格式化
* @returns 
*/
export const IsOrNot = ({cellValue, row, column }) => {
    if(cellValue) {
        return "<span class='success-color'>是</span>";
    } else {
        return "<span class='error-color'>否</span>";
    }
}


/**
* 用户状态格式化
* @returns 
*/
export const UserStateFormatter = ({cellValue, row, column }) => {
    if(cellValue) {
        return "<span class='success-color'>已购买</span>";
    } else {
        return "<span class='error-color'>未购买</span>";
    }
}

/**
* 用户状态格式化
* @returns 
*/
export const UserDeleteFormatter = ({cellValue, row, column }) => {
    if(cellValue) {
        return "<span class='error-color'>已禁用</span>";
    } else {
        return "<span class='success-color'>正常</span>";
    }
}

/**
* 是否允许大额提现
* @returns 
*/
export const TXLimitFormatter = ({cellValue, row, column }) => {
    if(cellValue) {
        return "<span class='success-color'>允许</span>";
    } else {
        return "<span class='error-color'>不允许</span>";
    }
}

/**
* 订单状态格式化
* @returns 
*/
export const OrderStateClass = ({cellValue, row, column }) => {
    if(row.State == 0) {
        return `<span style="color:#409EFF;">${cellValue}</span>`;
    } else if(row.State == 1) {
        return `<span style="color:#67C23A;">${cellValue}</span>`;
    } else if(row.State == 2) {
        return `<span style="color:#F56C6C;">${cellValue}</span>`;
    } else if(row.State == 3) {
        return `<span style="color:#E6A23C;">${cellValue}</span>`;
    } 
    return `<span>${cellValue}</span>`;
}

/**
* 通知类型
* @returns 
*/
export const NotifyTypeFormatter = ({cellValue, row, column }) => {
    if(cellValue == 0) {
        return "首页";
    } else {
        return "个人中心";
    }
}