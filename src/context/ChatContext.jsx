import { createContext, useContext, useState, useEffect } from 'react';
import { fetchDeepseekResponse } from '../services/deepseekApi';
/* 1.数据通道 */
const ChatContext = createContext();
/* 2.功能更新 */
export const ChatProvider = ({ children }) => {
    // 1. 全局数据状态
    const [messages, setMessages] = useState([]);
    const [currentChatId, setCurrentChatId] = useState('default');
    const [isRecording, setIsRecording] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    // 2. 消息发送（对接 DeepSeek API）
    const sendMessage = async (text) => {//async声明异步函数
        if (!text.trim()) return;
        const userMsg = { role: 'user', content: text, time: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);
        try {
            const response = await fetchDeepseekResponse(text, currentChatId);
            const botMsg = { role: 'assistant', content: response.reply, time: Date.now() };
            setMessages(prev => [...prev, botMsg])
        } catch (error) {
            const errorMsg = { role: 'assistant', content: '请求失败，请重试', time: Date.now() };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };
    // 3. 语音消息（web speech api）
    const sendVoiceMessage = async (text) => {
        if (text.trim()) sendMessage(text);
    };
    // 4. 会话切换
    const switchChat = (chatId) => {
        setCurrentChatId(chatId);
        const storedMessages = localStorage.getItem(`chat_${chatId}`);
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        } else {
            setMessages([]);
        }
    };
    // 5. 会话保存
    useEffect(() => {
        localStorage.setItem(`chat_${currentChatId}`, JSON.stringify(messages));
    }, [messages, currentChatId]);
    // 6. 暴露方法和状态
    const value = {
        messages,
        currentChatId,
        isRecording,
        isTyping,
        sendMessage,
        sendVoiceMessage,
        switchChat,
        setIsRecording
    };
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
/* 3.其他组件调用数据状态 */
export const useChatContext = () => useContext(ChatContext);