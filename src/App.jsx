import React, { Suspense } from 'react'; // 引入 Suspense（按需加载必备）
import './css/App.css'; // 路径从 ./ 改为 ./css/，适配 css 文件夹层级

const HistorySidebar = React.lazy(() => import('./components/HistorySidebar'));
const MessageList = React.lazy(() => import('./components/MessageList'));
const ChatInput = React.lazy(() => import('./components/ChatInput'));
// 主组件：仅串联侧边栏、聊天区，不写样式
function App() {
  return (
    <div className="app">
      <Suspense fallback={<div>加载侧边栏...</div>}>
        <HistorySidebar />
      </Suspense>
      <div className="chat-area">
        <Suspense fallback={<div>加载消息列表...</div>}>
          <MessageList />
        </Suspense>
        <Suspense fallback={<div>加载输入区...</div>}>
          <ChatInput />
        </Suspense>
      </div>
    </div>
  );
}
export default App;