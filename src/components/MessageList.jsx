import '../css/MessageList.css';
import { useChatContext } from '../context/ChatContext';
import { useEffect, useRef } from 'react';
export default function MessageList() {
    const { messages, isTyping } = useChatContext();
    //1.useRef获取dom元素
    const listRef = useRef(null);
    //2.自动滚动到最新消息
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
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