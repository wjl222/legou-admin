import request from '@/utils/request';
function requestArticleInfo(config) {
    return request({
        url: config.url,
        method: 'POST',
        data: config.data
    })
}

function requestArticleDetail(config) {
    return request({
        url: `/lejuAdmin/productArticle/productArticle/${config.id}`
    })
}



export {
    requestArticleInfo,
    requestArticleDetail
}