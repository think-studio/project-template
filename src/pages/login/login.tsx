import { View } from '@tarojs/components';
import { useEffect } from 'react'
import Router from '/@/routes/router';

function Login() {
  useEffect(() => {
    console.log(Router.params);
  })
  return (
    <View>
      <View>我是登录页面</View>
      <View> 参数: {JSON.stringify(Router.params)}</View>
    </View>
  )
}

export default Login
