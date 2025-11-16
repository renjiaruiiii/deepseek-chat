import '../css/HistorySidebar.css';
import { useChatContext } from '../context/ChatContext';
import { useState } from 'react';
export default function HistorySidebar() {
    const { currentChatId, switchChat } = useChatContext();
    //1.从本地获取历史会话
    const storedChats = localStorage.getItem('chat_list');
    const [chats, setChats] = useState(() => {
        return storedChats ? JSON.parse(storedChats) : [
            { id: 'default', name: '默认会话' },
            { id: 'chat1', name: '会话1' }
        ];
    });
    //2.新建会话
    const handleNewChat = () => {
        const newChat = {
            id: `chat${Date.now()}`,
            name: `新会话${chats.length + 1}`
        };
        const newChats = [...chats, newChat];
        setChats(newChats);
        localStorage.setItem('chat_list', JSON.stringify(newChats));
        switchChat(newChat.id);
    };
    // 3.删除会话
    const handleDeleteChat = (id, e) => {
        e.stopPropagation(); // 防止触发切换
        const newChats = chats.filter(chat => chat.id !== id);
        setChats(newChats);
        localStorage.setItem('chat_list', JSON.stringify(newChats));
        if (id === currentChatId) switchChat('default');
        localStorage.removeItem(`chat_${id}`);
    };
    return (
        <div className="history-sidebar">
            <h3>历史会话</h3>
            <button className="new-chat" onClick={handleNewChat}>新建会话</button>
            <ul>
                {chats.map(chat => (
                    <li
                        key={chat.id}
                        onClick={() => switchChat(chat.id)}
                        className={currentChatId === chat.id ? 'active' : ''}
                    >
                        {chat.name}
                        <button className="delete" onClick={(e) => handleDeleteChat(chat.id, e)}>×</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};