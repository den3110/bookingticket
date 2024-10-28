import axios from 'axios';
import NodeCache from 'node-cache';

const imageCache = new NodeCache({ stdTTL: 3600 * 24 * 5 });

const fetchImage = async (req, res) => {
    const logoAriline = req.params.logoAriline;
    const imageUrl = 'https://res.ivivu.com/flight/inbound/images/logo-flight/' + logoAriline;

    // Kiểm tra xem hình ảnh đã có trong cache chưa
    const cachedImage = imageCache.get(imageUrl);
    if (cachedImage) {
        res.set('Content-Type', 'image/webp');
        return res.send(cachedImage); // Trả về hình ảnh từ cache
    }

    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Lưu hình ảnh vào cache
        imageCache.set(imageUrl, response.data);

        res.set('Content-Type', 'image/webp'); // Thiết lập Content-Type cho ảnh
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Error fetching image');
    }
};

export default fetchImage;
