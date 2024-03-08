import { apiCall } from "../../../utils/apiCall";

export interface ISetSubCateqory2Req {
    userid: string;
    size: string;
}

interface ISetSubCateqory2Res {
    data: string,
}


async function SubCategorySet(request: ISetSubCateqory2Req): Promise<ISetSubCateqory2Res | null> {
    try {
        const response: ISetSubCateqory2Res = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}



const useSetSubCategory = () => {

    const setSubCat = async (request: ISetSubCateqory2Req) => {
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