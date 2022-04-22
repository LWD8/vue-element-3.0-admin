import Mock from 'mockjs'
import { mock_join } from '../mock_common'
import qs from 'qs'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

export const login = config => {
  const { account } = qs.parse(config.body)
  const token = tokens[account]

  // mock error
  if (!token) {
    return mock_join({
      code: 60204,
      message: 'Account and password are incorrect.'
    })
  }
  return Mock.mock({
    code: 200,
    data: token
  })
}

export const userList = Mock.mock({
  code: 200,
  data: {
    pages: { current_page: 1, offset: 0, page_size: 10, total: 3 },
    list: [
      {
        id: 5,
        mobile: '13822136029',
        username: 'user_test',
        email: '333333@163.com',
        nickname: '测试用户编辑1',
        created_at: '2022-03-28 15:28:19'
      },
      {
        id: 4,
        mobile: '13122222222',
        username: 'user_2',
        email: '222222@qq.com',
        nickname: '用户2',
        created_at: '2022-03-17 11:01:03'
      },
      {
        id: 1,
        mobile: '13111111111',
        username: 'admin',
        email: null,
        nickname: '测试账号',
        created_at: '2022-03-16 16:58:11'
      }
    ]
  }
})
