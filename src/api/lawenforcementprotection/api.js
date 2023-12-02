//执法保护新增接口
import axios from '@/http/axios'

/**
 * 获取保护成果列表数据
 * @returns 
 */
export const protectionAchievementsList = () => {
    return axios({
        method: 'GET',
        url: `/enforceProtection/protectionAchievementsList`,
    });
}


/**
 * 根据ID获取保护成果详情数据
 * @param {	详情ID } id  
 * @returns 
 */
export const protectionAchievementInfo = (id) => {
    return axios({
        method: 'GET',
        url: `/enforceProtection/protectionAchievementsList/${id}`,
    });
}


/**
 * 省级典型案例,知识产权调解案件
 * @param {	type=1表示"典型案例"，type=2表示"调解案件" } id  
 * @returns 
 */
export const GetCaseList = (type) => {
    return axios({
        method: 'GET',
        url: `/ovr/caseList`,
        data: { type }
    });
}
