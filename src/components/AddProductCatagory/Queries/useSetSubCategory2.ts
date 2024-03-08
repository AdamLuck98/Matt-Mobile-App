import { apiCall } from "../../../utils/apiCall";

export interface ISetSubCateqoryReq {
    userid: string;
    mastercat: string;
    subcat_1: string;
    subcat_2: string;
}

interface ISetSubCateqory2Res {
    data: any,
}


async function SubCategory2Set(request: ISetSubCateqoryReq): Promise<ISetSubCateqory2Res | null> {
    try {
        const response: ISetSubCateqory2Res = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}



const useSetSubCategory2 = () => {

    const setSubCat2 = async (request: ISetSubCateqoryReq) => {
        try {
            const response = await SubCategory2Set(request)
            return response;
        } catch (error) {
            console.log("error", error)
        }
    }
    return { setSubCat2 }
}


export default useSetSubCategory2;