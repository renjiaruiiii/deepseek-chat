import { useChatContext } from '../context/ChatContext';
import { useState, useRef, useEffect } from 'react';

export const VoiceRecorder = () => {
    const { isRecording, setIsRecording, sendVoiceMessage } = useChatContext();
    const recognitionRef = useRef(null); // 语音识别实例

    // 初始化浏览器语音识别（兼容不同浏览器前缀）
    useEffect(() => {
        // 兼容 Chrome 的前缀（webkitSpeechRecognition）
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false; // 一次识别结束后停止
            recognitionRef.current.interimResults = false; // 只返回最终识别结果
            recognitionRef.current.lang = 'zh-CN'; // 识别中文
        } else {
            alert('当前浏览器不支持语音识别，请使用 Chrome 浏览器');
        }
    }, []);

    // 切换语音录制+识别
    const toggleRecording = () => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        if (isRecording) {
            // 停止识别
            recognition.stop();
            setIsRecording(false);
        } else {
            // 开始识别
            setIsRecording(true);
            let resultText = '';

            // 监听识别结果
            recognition.onresult = (event) => {
                resultText = event.results[0][0].transcript; // 获取最终识别的文字
            };

            // 识别结束后，发送文字消息
            recognition.onend = () => {
                setIsRecording(false);
                if (resultText.trim()) {
                    sendVoiceMessage(resultText); // 调用 Context 方法发送转好的文字
                }
            };

            // 识别出错处理
            recognition.onerror = (error) => {
                console.error('语音识别错误：', error);
                setIsRecording(false);
                alert('语音识别失败，请重试');
            };

            recognition.start(); // 启动识别
        }
    };

    return (
        <button type="button" onClick={toggleRecording} disabled={!recognitionRef.current}>
            {isRecording ? '停止语音输入' : '语音输入'}
        </button>
    );
};