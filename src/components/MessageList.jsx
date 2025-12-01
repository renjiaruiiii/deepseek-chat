import '../css/MessageList.css';
import { useChatContext } from '../context/ChatContext';
import { useEffect, useRef } from 'react';
export default function MessageList() {
    const { messages, isTyping } = useChatContext();
    //1.useRef获取dom元素,用于后续操作DOM元素
    const listRef = useRef(null);
    //2.自动滚动到最新消息
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;//检查listRef.current是否存在，如果存在则设置滚动条位置到最底部
        }
    }, [messages]);
    return (
        <div className="message-list" ref={listRef}>
            {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role}`}>
                    <p>{msg.role === 'user' ? '我' : 'DeepSeek'}：{msg.content}</p>
                </div>
            ))}

            {isTyping && <div className="typing">DeepSeek: 正在输入...</div>}
        </div>
    );
};