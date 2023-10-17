// pages/cart/cart.js
import {Cart} from "../../models/cart";

const cart = new Cart()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartItems:[],
        isEmpty:false,
        allChecked:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const cartItems = cart.getAllItemFromLocal().items
        if(cart.isEmpty()){
            this.empty()
            return
        }
        this.setData({
            cartItems:cartItems
        })
        this.notEmpty()
        this.isAllChecked()
    },

    refreshCartData(){

    },

    isAllChecked(){
        const allChecked = cart.isAllChecked()
        this.setData({
            allChecked
        })
    },

    onCheckAll(event){
        const checked = event.detail.checked
        cart.checkAll(checked)
        this.setData({
            cartItems:this.data.cartItems
        })
    },

    onDeleteItem(event){
        this.isAllChecked()
    },

    onSingleCheck(event){
        this.isAllChecked()
    },

    empty(){
        this.setData({
            isEmpty:true
        })
        wx.hideTabBarRedDot({
            index:2
        })
    },

    notEmpty(){
        this.setData({
            isEmpty:false
        })
        wx.showTabBarRedDot({
            index:2
        })
    }

})