import axios from 'axios'
import qs from 'qs'
import {
    message,
    Spin
} from 'antd';

const success = () => {
    message.success('This is a message of success');
};

const error = (err) => {
    if (err) {
        message.error(err);

        return;
    }
    message.error('网络异常');
};

const warning = () => {
    message.warning('This is message of warning');
};

axios.interceptors.request.use(config => {
    // store.commit('UPDATE_LOADING', true) //显示loading
    return config
}, error => {
    return Promise.reject(error)
})


axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})

function errorState(response) {
    // store.commit('UPDATE_LOADING', false) //隐藏loading
    console.log(response)
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response
        // 如果不需要除了data之外的数据，可以直接 return response.data
    } else {
        error();
    }

}

function successState(res) {
    // store.commit('UPDATE_LOADING', false) //隐藏loading
    //统一判断后端返回的错误码
    if (res.data.errCode == '000002') {
        error();
    }
}

function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
const httpServer = (opts, data) => {

    let Public = { //公共参数
        // 'cwd': randomString()
    }


    let httpDefaultOpts = { //http默认配置
        method: opts.method,
        url: opts.url,
        timeout: 10000,
        params: Object.assign(Public, data),
        data: qs.stringify(Object.assign(Public, data)),
        headers: opts.method == 'POST' ? {
            "Content-Type": "'application/x-www-form-urlencoded; charset=UTF-8"
        } : {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }

    if (opts.method == 'get') {
        delete httpDefaultOpts.data
    } else {
        delete httpDefaultOpts.params
    }

    let promise = new Promise(function (resolve, reject) {
        axios(httpDefaultOpts).then(
            (res) => {
                // successState(res)
                resolve(res)
            }
        ).catch(
            (response) => {
                // errorState(response)
                reject(response)
            }
        )

    })
    return promise
}

export default httpServer