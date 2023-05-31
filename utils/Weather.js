const axios = require('axios');

const getWeather = async() => {
    const apiURL = process.env.WEATHER_API_URL;

    const res = await axios.get(apiURL);

    const temp = res.data.main.temp + '℃'
    const tempFeellike = res.data.main.feels_like + '℃'
    const humidity = res.data.main.humidity + '%'
    const visibility = res.data.visibility + 'km'


    const weatherStr = `Bây giờ nhiệt độ Hà Nội là ${temp} (cảm giác như ${tempFeellike}).Độ ẩm hiện tại là ${humidity},Tầm nhìn hiện tại là ${visibility}`;
    return weatherStr
}

module.exports = {
    getWeather
}