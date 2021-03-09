import request from '@/utils/request';
import { config } from '@vue/test-utils';

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

function requestGoodList(config) {
    return request({
        url: `/lejuAdmin/product/productsByPage/${config.start}/${config.limit}`,
        method: 'POST',
        data: config.data
    })
}

function uploadLimitActivity(config) {
    return request({
        url: '/lejuAdmin/homeRecommend/addRecommend',
        method: 'POST',
        data: config.data
    })
}

function requestAdList(config) {
    return request({
        url: `/lejuAdmin/advertise/adsList`,
        method: "GET"
    })
}

function addAd(config) {
    return request({
        url: `/lejuAdmin/advertise/addAds`,
        method: 'POST',
        data: config.data
    })
}

function editAd(config) {
    return request({
        url: '/lejuAdmin/advertise/updateAds',
        method: 'POST',
        data: config.data
    })
}

function deleteAd(config) {
    return request({
        url: `/lejuAdmin/advertise/delAds/${config.adsId}`,
        method: 'DELETE'
    })
}

export {
    requestLimitAct,
    deleteLimitAction,
    requestGoodList,
    uploadLimitActivity,
    requestAdList,
    addAd,
    editAd,
    deleteAd
}