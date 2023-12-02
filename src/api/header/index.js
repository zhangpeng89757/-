import axios from "@/http/axios";
import { reactive } from 'vue'

export const getDataUpdateDate = () => {
    let result = reactive({
        date: '',
    });
    axios({
        method: 'GET',
        url: 'dls/updateDate',
        data: {},
    }).then(res => {
        let resData = res.data;
        result.date = resData;
    });
    return result;
}