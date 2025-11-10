import '../css/MessageList.css';
import { useChatContext } from '../context/ChatContext';
import { useEffect, useRef } from 'react';
export default function MessageList() {
    const { messages, isTyping } = useChatContext();//获取messages（消息数组）和isTyping（表示对方是否正在输入的状态）
    //1.使用useRef创建一个引用listRef，用于后续操作DOM元素
    const listRef = useRef(null);
    //2.自动滚动到最新消息
    useEffect(() => { //使用useEffect监听消息变化，当messages变化时自动执行
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;//检查listRef.current是否存在，如果存在则设置滚动条位置到最底部
        }   //这确保了每当有新消息时，消息列表会自动滚动到最新消息的位置
    }, [messages]);
    return (
        <div className="message-list" ref={listRef}>
            {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.role}`}>
                    <p>{msg.role === 'user' ? '我' : 'DeepSeek'}：{msg.content}</p>
                </div>
            ))}

            {isTyping && <div className="typing">DeepSeek 正在输入...</div>}
        </div>
    );
};