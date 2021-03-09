import request from "@/utils/request";

function requestOrderList(config) {
    return request({
        url: `/lejuAdmin/order/findOrdersByPage/${config.start}/${config.limit}`,
        method: 'POST',
        data: config.data
    })
}

function requestOrderDetail(config) {
    return request({
        url: `/lejuAdmin/order/orderDetail/${config.id}`,
        method: 'get'
    })
}

function closeOrder(config) {
    return request({
        url: `/lejuAdmin/order/finishOrder/${config.orderId}`,
        method: 'post'
    })
}

function requestReturnOrder(config) {
    return request({
        url: `/lejuAdmin/orderReturn/findReturnApply/${config.start}/${config.limit}`,
        method: 'post',
        data: config.data
    })
}

function requestReturnOrderDetail(config) {
    return request({
        url: `/lejuAdmin/orderReturn/${config.id}`,
        method: 'get'
    })
}

function receiveProductR(config) {
    return request({
        url: `/lejuAdmin/orderReturn/receiveProduct/${config.id}`,
        method: 'POST',
        data: config.data
    })
}

export {
    requestOrderList,
    requestOrderDetail,
    closeOrder,
    requestReturnOrder,
    requestReturnOrderDetail,
    receiveProductR
}