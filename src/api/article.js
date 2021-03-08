import request from '@/utils/request';

function requestArticleDetail(config) {
    return request({
        url: `/lejuAdmin/productArticle/productArticle/${config.id}`
    })
}

function uploadArticleDetail(config) {
    return request({
        url: `/lejuAdmin/productArticle/updateArticle`,
        data: config.data,
        method: 'POST'
    })
}

function deleteArticleR(config) {
    return request({
        url: `/lejuAdmin/productArticle/del/${config.id}`,
        method: 'DELETE'
    })
}

function requestArticleInfo(config) {
    return request({
        url: `/lejuAdmin/productArticle/findArticles/${config.pagenum}/${config.limit}`,
        method: 'POST',
        data: config.data
    })
}

function addArticleR(config) {
    return request({
        url: '/lejuAdmin/productArticle/addArticle',
        method: 'POST',
        data: config.data
    })
}

function requestMeterial(config) {
    return request({
        url: `/lejuAdmin/material/findMaterialByPage/${config.start}/${config.limit}`,
        method: 'GET'
    })
}

function deleteMeterial(config) {
    return request({
        url: `/lejuAdmin/material/delMaterial/${config.id}`,
        method: 'DELETE'
    })
}

export {
    requestArticleInfo,
    requestArticleDetail,
    uploadArticleDetail,
    deleteArticleR,
    addArticleR,
    requestMeterial,
    deleteMeterial
}