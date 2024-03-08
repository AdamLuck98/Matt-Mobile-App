import { apiCall } from "../../../utils/apiCall";

export interface ISetSubCateqoryReq {
    userid: string;
    size: string;
}

interface ISetSubCateqoryResponse {
    data: string,
}


async function SubCategorySet(request: ISetSubCateqoryReq): Promise<ISetSubCateqoryResponse | null> {
    try {
        const response: ISetSubCateqoryResponse = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}



const useSetSubCategory = () => {

    const setSubCat = async (request: ISetSubCateqoryReq) => {
        try {
            const response = await SubCategorySet(request)
            return response;
        } catch (error) {
            console.log("error", error)
        }
    }
    return { setSubCat }
}


export default useSetSubCategory;