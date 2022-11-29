import axios from 'axios'

export default{

    getDateFromTimestamp(timestamp){
        let time = new Date(timestamp)
        let date = time.getDate()
        if(date < 10) date = '0' + date
        let month = time.getMonth() + 1
        if(month < 10) month = '0' + month
        let year = time.getFullYear()
        let hours = time.getHours()
        if(hours < 10) hours = '0' + hours
        let minutes = time.getMinutes()
        if(minutes < 10) minutes = '0' + minutes
        let seconds = time.getSeconds()
        if(seconds < 10) seconds = '0' + seconds
        return date + '.' + month + '.' + year + '. - ' + hours + ':' + minutes + ':' + seconds
    }
    
}