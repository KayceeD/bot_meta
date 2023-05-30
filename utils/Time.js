const handleTime = (date = new Date()) => {
    let hours = date.getUTCHours()+7;
    let minutes = date.getUTCMinutes();

    let ampm = hours >=12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12 //the hour '0' should be 12
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    const timeStr = `${hours} : ${minutes} ${ampm}`

    return timeStr
}




module.exports = {
    handleTime
}