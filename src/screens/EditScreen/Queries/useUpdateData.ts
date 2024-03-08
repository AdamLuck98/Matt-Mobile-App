import { useQuery } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";
import { apiCall } from "../../../utils/apiCall";
import { keyBy } from "lodash";
import { Platform } from "react-native";

export interface IEditRequest {
    UserId: string;
    listingid: string;
}

interface IDashResponse {
    userid: string;
    listingid: string;
    barcode: string;
    description: string;
    prodtitle: string;
    price: string;
    cost: string;
    wholesaleprice: string;
    location: string;
    cat_master: string;
    color: string;
    size: string;
    qty: string;
    created: string;
    supplier: string;
    tags: string;
    units: string;
    image_1: string;
    image_2: string;
    image_3: string;
    image_4: string;
    image_5: string;
    image_6: string;
    image_7: string;
    image_8: string;
    image_9: string;
    image_10: string;

}
async function fetchUserData(request: IEditRequest): Promise<IDashResponse | null> {
    try {
        const data = {
            do: "GetInventoryByUser",
            osname: Platform.OS === "ios" ? "ios" : "and",
            userid: request.UserId,
            listingid: request?.listingid,
        };
        const response: IDashResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useUpdateData = (request: IEditRequest, enable = true) => {
    const catchKey = [QueryKeys.UpdateData];
    return useQuery(catchKey, () => fetchUserData(request));
};


export { useUpdateData };
