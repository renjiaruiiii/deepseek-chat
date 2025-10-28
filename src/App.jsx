import './css/App.css'; // 路径从 ./ 改为 ./css/，适配 css 文件夹层级
// 主组件：仅串联侧边栏、聊天区，不写样式
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { HistorySidebar } from './components/HistorySidebar';
function App() {
  return (
    <div className="app">
      <HistorySidebar />
      <div className="chat-area">
        <MessageList />
        <ChatInput />
      </div>
    </div>
  );
}
export default App;