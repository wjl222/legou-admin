import request from '@/utils/request';

function upLoadApi(data) {
    return request({
        url: `/lejuAdmin/material/uploadFileOss`,
        method: 'post',
        data
    })
}

export {
    upLoadApi
}