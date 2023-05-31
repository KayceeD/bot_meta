const axios = require('axios');

const getWeather = async() => {
    const apiURL = process.env.WEATHER_API_URL;

    const data = await axios.get(apiURL);

    const temp = data.main.temp + '℃'
    const tempFeellike = data.main.feels_like + '℃'
    const humidity = data.main.humidity + '%'
    const visibility = data.visibility + 'km'


    const weatherStr = `Bây giờ nhiệt độ Hà Nội là ${temp} (cảm giác như ${tempFeellike}).Độ ẩm hiện tại là ${humidity},Tầm nhìn hiện tại là ${visibility}`;
    return weatherStr
}

module.exports = {
    getWeather
}