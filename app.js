// app.js
import {Cart} from "./models/cart";

App({
    onLaunch(){
        const cart = new Cart()
        if(!cart.isEmpty()){
            wx.showTabBarRedDot({
                index:2
            })
        }
    }
})
