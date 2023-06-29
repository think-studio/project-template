import { View } from '@tarojs/components'
import {
  Button
} from "@nutui/nutui-react-taro";
import './index.scss'
import Router from '/@/routes/router';

function handleLogin() {
  Router.pushName('login', {
    name: 'liuhao'
  })
}

function Index() {
  return (
    <View className="nutui-react-demo">
      <View className="index">
        <Button type="primary" className="btn" onClick={handleLogin}>
          登录
        </Button>
      </View>
    </View>
  )
}

export default Index
