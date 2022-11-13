import sql from '../assets/sql.js'
import MD5 from "crypto-js/md5"
import VueCookies from 'vue-cookies'

export default{
    getEmail(){
        return window.location.search.substring(23, window.location.search.search(':::'))
    },

    getFirstname(){
        var firstname = window.location.search.substring(window.location.search.search(':::')+3, window.location.search.search(';;;'))
        return this.getCyrillicString(firstname)
    },

    getLastname(){
        var lastname = window.location.search.substring(window.location.search.search(';;;')+3, window.location.search.search('---'))
        return this.getCyrillicString(lastname)
    },

    getImage(){
        var image = window.location.search.substring(window.location.search.search('!!!')+3, window.location.search.length)
        return image
    },

    getTokenExpiration(){
        return window.location.search.substring(1,33).replace(/%+/g, ' ').toLowerCase()
    },

    getToken(){
        return window.location.search.substring(window.location.search.search('---')+3, window.location.search.search(',,,'))
    },

    getEmailToken(){
        return window.location.search.substring(window.location.search.search(',,,')+3, window.location.search.search('!!!'))
    },

    getRefreshed(){
        if(window.location.search.search(".....")) return 1
        else return 0
    },

    differenceInMinutes(){
        var tokenExpiration = new Date(
            parseInt(this.getTokenExpiration().substring(6,10)), parseInt(this.getTokenExpiration().substring(3,5))-1, parseInt(this.getTokenExpiration().substring(0,2)),
            parseInt(this.getTokenExpiration().substring(14,16)), parseInt(this.getTokenExpiration().substring(17,19)), parseInt(this.getTokenExpiration().substring(20,22)),
        )
        var now = new Date()
        var diffMs = (now - tokenExpiration);
        return Math.round(((diffMs % 86400000) % 3600000) / 60000);
    },

    checkTokenExpiration(){
        if(this.differenceInMinutes() > 19)
            window.location = '../?sessionExpired'
    },

    refreshTokenExpiration(){
        const d = new Date();
        let time = d.getTime();
        this.token = time + MD5(this.email).toString()
        this.tokenExpiration = new Date().toLocaleString()

        if(this.emailMessage == null && this.passwordMessage == null)
          window.location = sql.Refresh() + "?email=" + this.email + "&emailToken=" + this.getEmailToken() 
            + "&token=" + this.token + "&tokenExpiration=" + this.tokenExpiration
    },

    getCyrillicString(str){
        str = str.replace(/%C4%8D+/g, 'č')
        str = str.replace(/%C4%8C+/g, 'Č')
        str = str.replace(/%C4%87+/g, 'ć')
        str = str.replace(/%C4%86+/g, 'Ć')
        str = str.replace(/%C5%A1+/g, 'š')
        str = str.replace(/%C5%A0+/g, 'Š')
        str = str.replace(/%C4%91+/g, 'đ')
        str = str.replace(/%C4%90+/g, 'Đ')
        str = str.replace(/%C5%BE+/g, 'ž')
        str = str.replace(/%C5%BD+/g, 'Ž')
        str = str.replace(/%20+/g, ' ')
        return str
    },

    setCookies(){
        VueCookies.set('email' , this.getEmail())
        VueCookies.set('emailToken' , this.getEmailToken())
        VueCookies.set('token' , this.getToken())
        VueCookies.set('firstname' , this.getFirstname())
        VueCookies.set('lastname' , this.getLastname())
        VueCookies.set('image' , this.getImage())
    },

    expiredLogOut(){
        VueCookies.get('expiration' , this.getLastname())
    },

    getSearch(){
        return window.location.search.substring(window.location.search.indexOf('?link=1')+7, window.location.search.indexOf('---id:'))
    },

    getSearchUsers(){
        var users = []
        var link = this.getCyrillicString(window.location.search)
        for(var i=0; i<link.length; i++){
            if(link.indexOf('id:') != -1){
                users.push({
                    id: link.substring(link.indexOf('id:') + 3, link.indexOf(':::')),
                    fullname: link.substring(link.indexOf(':::') + 3, link.indexOf(';;;')),
                    image: link.substring(link.indexOf(';;;') + 3, link.indexOf('!!!')),
                    email: link.substring(link.indexOf('!!!') + 3, link.indexOf('___'))
                })
                link = link.slice(link.indexOf('___') + 3, link.length)
            }
            else break;
        }
        return users
    }
}