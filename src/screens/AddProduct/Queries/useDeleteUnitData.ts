import { Platform } from "react-native";
import { apiCall } from "../../../utils/apiCall";

export interface IDelUnitReq {
    UserId: string;
    unit: string;
}

interface IDeleteUnitResponse {
    Datamaster: any,
    data: string,
    SubselectData: any
}

async function unitDelete(request: IDelUnitReq): Promise<IDeleteUnitResponse | null> {
    try {
        const data = {
            do: "DelUnit",
            userid: request.UserId,
            osname: Platform.OS === "android" ? "and" : "ios",
            supplier: request.unit,
        };
        const response: IDeleteUnitResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useDropDownDelUnit = () => {
    const deleteUnitData = async (request: IDelUnitReq) => {
        try {
            const response = await unitDelete(request)
            return response;
        } catch (error) {
            console.log('this is errr>>>', error)
        }
    }
    return { deleteUnitData }

};

export default useDropDownDelUnit;