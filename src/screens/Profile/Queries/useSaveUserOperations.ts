import { apiCall } from "../../../utils/apiCall";

export interface IDelSizeReq {
    UserId: string;
    UserName: string;
    password: string;
    isenglish: boolean;
    CompamyName: string;
    MastercaId: any;
    catagoryId: any;
    isLoading: string,
    data: string,
    isError: string,
    refetch: string,
    R_barcode: string,
    R_productTitle: string,
    R_master: string,
    R_subcategory: string,
    R_fulldescription: string,
    R_quantityAvailable: string,
    R_supplier: string,
    R_location: string,
    R_price: string,
    R_notes: string,
    R_size: string,
    R_color: string,
    R_imges1: string,
    R_imges2: string,
    R_imges3: string,
    R_imges4: string,
}

interface IDeleteCatResponse {
    UserId: string;
    UserName: string;
    password: string;
    isenglish: boolean;
    CompamyName: string;
    MastercaId: any;
    catagoryId: any;
    isLoading: string,
    data: string,
    isError: string,
    refetch: string,
    R_barcode: string,
    R_productTitle: string,
    R_master: string,
    R_subcategory: string,
    R_fulldescription: string,
    R_quantityAvailable: string,
    R_supplier: string,
    R_location: string,
    R_price: string,
    R_notes: string,
    R_size: string,
    R_color: string,
    R_imges1: string,
    R_imges2: string,
    R_imges3: string,
    R_imges4: string,

}




export interface IDeleteCatReq {
    UserId: string;
    UserName: string;
    password: string;
    isenglish: boolean;
    CompamyName: string;
    MastercaId: any;
    catagoryId: any;
    isLoading: string,
    data: string,
    isError: string,
    refetch: string,
    R_barcode: string,
    R_productTitle: string,
    R_master: string,
    R_subcategory: string,
    R_fulldescription: string,
    R_quantityAvailable: string,
    R_supplier: string,
    R_location: string,
    R_price: string,
    R_notes: string,
    R_size: string,
    R_color: string,
}


async function addkizbinprofile(request: IDelSizeReq): Promise<IDeleteCatResponse | null> {
    try {
        const response: IDeleteCatResponse = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}


const useSaveUserOperations = () => {
    const addprofile = async (request: IDelSizeReq) => {
        try {
            const response = await addkizbinprofile(request)
            return response;
        } catch (error) {
            console.log("error", error)
        }
    }
    return { addprofile }


};



export default useSaveUserOperations;