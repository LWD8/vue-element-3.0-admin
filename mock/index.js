/* eslint-disable */
import Mock from 'mockjs'

import * as user from './User'
Mock.mock(/\/user\/login/, 'post', user.login)
Mock.mock(/\/user\/list/, 'post', user.userList)

export default Mock;
