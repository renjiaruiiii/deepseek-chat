import { useChatContext } from '../context/ChatContext';
import { useState, useRef, useEffect } from 'react';

export const VoiceRecorder = () => {
    const { isRecording, setIsRecording, sendVoiceMessage } = useChatContext();
    const recognitionRef = useRef(null); // 语音识别实例
    const [isRecognizing, setIsRecognizing] = useState(false); // 识别中状态


    // 1.初始化语音识别
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false; // 一次识别结束后停止
            recognitionRef.current.interimResults = false; // 只返回最终识别结果
            recognitionRef.current.lang = 'zh-CN'; // 设置识别语言为中文
        } else {
            alert('当前浏览器不支持语音识别，请使用 Chrome 浏览器');
        }
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    // 2. 是一个切换语音识别功能的切换函数，用于控制语音识别的开始和停止
    const toggleRecording = () => {
        if (!recognitionRef.current) return;
        const recognition = recognitionRef.current;

        if (isRecording) {
            recognition.stop();
            setIsRecording(false);
        } else {
            setIsRecording(true);
            setIsRecognizing(true);
            let resultText = '';

            recognition.onresult = (event) => {
                resultText = event.results[0][0].transcript;
            };

            recognition.onend = () => {
                setIsRecognizing(false);
                setIsRecording(false);
                if (resultText.trim()) {
                    sendVoiceMessage(resultText);
                }
            };

            recognition.onerror = (error) => {
                console.error('语音识别错误：', error);
                setIsRecognizing(false);
                setIsRecording(false);
                alert('语音识别失败，请重试');
            };

            recognition.start();
        }
    };

    return (
        <button type="button" onClick={toggleRecording} disabled={!recognitionRef.current}>
            {isRecording ? (isRecognizing ? '识别中...' : '停止语音输入') : '语音输入'}
        </button>
    );
};