import NodeCache from 'node-cache';
import axios from 'axios';

// Khởi tạo cache với thời gian sống (TTL) 1 giờ
const cache = new NodeCache({ stdTTL: 3600 * 24});

export const airport_autocomplete = async (req, res) => {
    // Kiểm tra xem dữ liệu đã có trong cache chưa
    const cacheKey = 'airport_autocomplete';
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
        // Nếu có trong cache, trả về dữ liệu từ cache
        return res.json(cachedData);
    }

    try {
        const response = await axios({
            url: "https://apiportal.ivivu.com/flightinbound/gate/apiv1/AllPlace",
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Host: "apiportal.ivivu.com",
            },
        });

        const data = response.data;

        // Lưu dữ liệu vào cache
        cache.set(cacheKey, data);

        // Trả về dữ liệu từ API
        return res.json(data);
    } catch (error) {
        console.error('Error fetching airport data:', error);
        return res.status(500).send('Error fetching airport data');
    }
};
