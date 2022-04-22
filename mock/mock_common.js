/* eslint-disable */
import Mock from 'mockjs'

export const req_content_default = () => {
    return {
        status: 200,
        message: '查询成功',
        data: []
    }
}

export const mock_join = (params) => {
    return Mock.mock(Object.assign(req_content_default(), params))
}