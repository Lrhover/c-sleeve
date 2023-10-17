// components/cart-item/index.js
import {parseSpecValue} from "../../utils/sku";
import {Cart} from "../../models/cart";

const cart = new Cart()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cartItem:Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        specStr:String,
        soldOut:Boolean,
        discount:Boolean,
        online:Boolean,
        stock: Cart.SKU_MAX_COUNT,
        skuCount: 1,
        checkedStatus:''
    },

    observers:{
        cartItem:function (cartItem){
            if(!cartItem){
                return
            }
            const specStr = parseSpecValue(cartItem.sku.specs)
            const discount = cartItem.sku.discount_price?true:false
            const soldOut = Cart.isSoldOut(cartItem)
            const online = Cart.isOnline(cartItem)
            this.setData({
                specStr:specStr,
                discount:discount,
                soldOut:soldOut,
                online:online,
                stock: cartItem.sku.stock,
                skuCount: cartItem.count,
                checkedStatus:cartItem.checked
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onDelete(event){
            const skuId = this.properties.cartItem.skuId
            cart.removeItem(skuId)
            this.setData({
                cartItem:null
            })
            this.triggerEvent('itemdelete',{
                skuId
            })
        },

        checkedItem(event){
            // const online = event.currentTarget.dataset.online
            // const stock = event.currentTarget.dataset.stock
            // if(online == false){
            //     this.setData({
            //         checkedStatus:""
            //     })
            //     wx.showToast({
            //         title:'该商品已下架！',
            //         icon:"none",
            //         duration:2000
            //     })
            //     return
            // }
            // if(stock == 0){
            //     this.setData({
            //         checkedStatus:""
            //     })
            //     wx.showToast({
            //         title:'该商品库存为0！',
            //         icon:"none",
            //         duration:2000
            //     })
            //     return
            // }
            const checked = event.detail.checked
            cart.checkItem(this.properties.cartItem.skuId)
            this.properties.cartItem.checked = checked
            this.triggerEvent('itemcheck',{

            })
        }
    }
})
