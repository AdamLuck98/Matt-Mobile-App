import { Platform } from "react-native";
import { apiCall } from "../../../utils/apiCall";

export interface IDelSupplierReq {
    UserId: string;
    supplier: string;
}

interface IDeleteSupplierResponse {
    Datamaster: any,
    data: string,
    SubselectData: any
}


async function supplierDelete(request: IDelSupplierReq): Promise<IDeleteSupplierResponse | null> {
    try {
        const data = {
            do: "DelSupplier",
            userid: request.UserId,
            osname: Platform.OS === "android" ? "and" : "ios",
            supplier: request.supplier,
        };
        const response: IDeleteSupplierResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useDropDownDelSupplier = () => {
    const deleteSupplierData = async (request: IDelSupplierReq) => {
        try {
            const response = await supplierDelete(request)
            return response;
        } catch (error) {
            console.log('this is errr>>>', error)
        }
    }
    return { deleteSupplierData }


};

export default useDropDownDelSupplier;