import axios from "axios";

// import { setLogStyle } from './log-config'
import { BASE_URL } from '../constants/url';
// import GlobalStore from '../Constants/GlobalStore';

export default async (endPoint, data = null, method = "get", headers = {}) => {
    
    // console.log('----FETCHING START: ', BASE_URL + endPoint, { data });
    let objForSubmitAxios = {
        url: BASE_URL + endPoint,
        method,
        headers,
    };
    if (data && method.toLocaleLowerCase() != 'get') {
        objForSubmitAxios = {
            ...objForSubmitAxios, data
        }
    }
    
    return axios(objForSubmitAxios)
        .then((response) => {
            if (response) {
                const { status, data: d } = response;
                const { error, message, ...data } = d;

                if (!error) {
                    console.log('----FETCHING SUCCESS: ', response);
                    // console.log('----FETCHING SUCCESS: ', setLogStyle('green'), response);

                    return data;
                }
                // console.log('----FETCHING FAIL: ', setLogStyle('red'), message, error);

                return { err: true, error: true, message: message };
            }
        })
        .catch((error) => {
            throw error
            // const { response, message, errors } = error;
            // console.log('----FETCHING FAIL: ', setLogStyle('red'), response, message, errors);

            // if (errors && errors.length > 0) {
            //     console.log(errors);

            //     throw errors[0];
            // }
            // if (message) {
            //     console.log(message);
            //     if (error.message.includes("timeout of")) throw "Time out";
            //     if (message.toString().includes("Network Error"))
            //         throw `Lỗi kết nối, vui lòng thử lại`;

            //     throw message;
            // }

            // if (error.toString().includes("Network Error")) throw `Lỗi kết nối, vui lòng thử lại`;

            // throw error;
        });
};
