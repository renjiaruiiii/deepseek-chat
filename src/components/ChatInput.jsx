import '../css/ChatInput.css';

import { useChatContext } from '../context/ChatContext';
import { useState } from 'react';
import { VoiceRecorder } from './VoiceRecorder';

export default function ChatInput() {
    const { sendMessage, sendVoiceMessage, isRecording, setIsRecording } = useChatContext();
    const [inputText, setInputText] = useState('');
    // 1.发送消息
    const handleSubmit = (e) => {
        e.preventDefault();//阻止表单默认提交
        sendMessage(inputText);
        setInputText('');
    };

    return (
        <form className="chat-input" onSubmit={handleSubmit}>
            <input
                placeholder="输入消息..."
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}

            />

            <button className="send" type="submit" >发送</button>
            <VoiceRecorder />
        </form>
    );
};