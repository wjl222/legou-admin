import request from '@/utils/request';
function login(config) {
    return request({
        url: '/lejuAdmin/index/login',
        method: 'POST',
        data: config.data
    })
}

export {
    login
}