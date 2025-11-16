// 封装deepseek api：接口
export const fetchDeepseekResponse = async (message) => {
    try {
        const response = await fetch('https://metahk.zenymes.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-84i3AD6d32BrfqCO0F9NLN6kaO1ye1hU5gttw0k4xJUeCIvi' // API 密钥
            },
            body: JSON.stringify({
                model: 'gemini-2.0-flash-001',
                messages: [{ role: 'user', content: message }],
                stream: false
            })
        });
        const data = await response.json();
        return { reply: data.choices[0].message.content };
    } catch (error) {
        console.error('DeepSeek API 调用失败：', error);
        throw error;
    }
};