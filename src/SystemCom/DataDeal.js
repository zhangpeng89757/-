// 数据处理工具类
export const filledNullNumber = (data) => {
    if ((!data && data != 0) || data < 0 || data === ''){
        return '暂无数据';
    }
    return data;
}