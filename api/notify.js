export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { device, time } = req.body;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const message = `🔔 Naujas lankytojas!\n📱 Įrenginys: ${device}\n⏰ Laikas: ${time}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message })
        });
        
        const data = await response.json();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send message' });
    }
}
