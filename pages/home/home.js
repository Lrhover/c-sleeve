import {config} from "../../config/config";
import {Theme} from "../../models/theme";
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA:null,
        themeE:null,
        themeESpu:[],
        bannerB:null,
        grid:[],
        activityD:null,
        spuPaging:null,
        loadingType:'loading',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.initAllData()
        this.initBottomSpuList()
    },

    async initBottomSpuList(){
        const paging =SpuPaging.getLatest()
        this.data.spuPaging = paging
        const data =await paging.getMoreData()
        if(!data){
            return
        }
        wx.lin.renderWaterFlow(data.items)
    },

    async initAllData(){
        const theme = new Theme()
        await theme.getThemes()
        const themeA =  theme.getHomeLocationA()
        const themeE =  theme.getHomeLocationE()
        let themeESpu = []
        if(themeE.online){
            const data = await Theme.getHomeLocationESpu()
            if(data){
                themeESpu = data.spu_list.slice(0,8)
            }
        }

        const themeF =  theme.getHomeLocationF()

        const bannerB = await Banner.getHomeLocationB()
        const grid = await Category.getHomeLocationC()
        const activityD = await Activity.getHomeLocationD()

        const bannerG = await Banner.getHomeLocationG()

        const themeH = await theme.getHomeLocationH()
        this.setData({
            themeA,
            bannerB,
            grid,
            activityD,
            themeE,
            themeESpu,
            themeF,
            bannerG,
            themeH
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    async onReachBottom() {
        const  data =await this.data.spuPaging.getMoreData()
        if(!data){
            return
        }
        wx.lin.renderWaterFlow(data.items)
        if(!data.moreData){
            this.setData({
                loadingType:'end'
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})