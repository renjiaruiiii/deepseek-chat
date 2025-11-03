import '../css/ChatInput.css'; // 路径从 ./ 改为 ../css/
import { FaMicrophone } from 'react-icons/fa'; // 需先安装 react-icons：npm install react-icons
import { useChatContext } from '../context/ChatContext';
import { useState } from 'react';
import { VoiceRecorder } from './VoiceRecorder';
//输入文本
export const ChatInput = () => {
    const { sendMessage, sendVoiceMessage, isRecording, setIsRecording } = useChatContext();//从上下文中获取聊天相关的状态和函数
    const [inputText, setInputText] = useState('');//用于存储用户输入的文本消息
    // 1.文本发送
    const handleSubmit = (e) => { //处理表单提交事件，当用户点击发送按钮或按回车时触发
        e.preventDefault();//阻止默认的表单提交行为
        sendMessage(inputText);//调用sendMessage函数发送文本消息
        setInputText('');//清空输入框
    };
    // 直接在组件内定义toggleRecording函数
    const toggleRecording = () => {
        setIsRecording(!isRecording);
        // 这里可以添加简单的录音逻辑（如需复杂逻辑再考虑抽离）
    };
    return (
        <form className="chat-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="输入消息..."
            />
            <button className="send" type="submit" >发送</button>
            <button className="voice" type="button" onClick={toggleRecording}>
                <FaMicrophone />
                {isRecording ? '停止录制' : '语音输入'}
            </button>
        </form>
    );
};