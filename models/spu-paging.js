import {Paging} from "../utils/paging";

class SpuPaging {
    static getLatest(){
        return new Paging({
            url:`spu/latest`
        },5)
    }
}

export {
    SpuPaging
}