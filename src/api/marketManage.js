import request from '@/utils/request';

function requestLimitAct(config) {
    return request({
        url: "/lejuAdmin/homeRecommend/findAllRecommends"
    })
}

function deleteLimitAction(config) {
    return request({
        url: `/lejuAdmin/homeRecommend/delRecommend/${config.id}`,
        method: 'DELETE'
    })
}

export {
    requestLimitAct,
    deleteLimitAction
}