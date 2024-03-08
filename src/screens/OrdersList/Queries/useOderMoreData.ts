import { useQuery } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";
import { apiCall } from "../../../utils/apiCall";
import { keyBy } from "lodash";
import { Platform } from "react-native";

export interface IGetOrderInfoRequest {
    do: "GetOrderInfo",
    userid: any;
    order_number: number;
}

interface IGetOrderInfohResponse {
    barcode: string;
    color: string;
    description: string;
    image_1: string;
    image_10: string;
    image_2: string;
    image_3: string;
    image_4: string;
    image_5: string;
    image_6: string;
    image_7: string;
    image_8: string;
    image_9: string;
    itemnote: string;
    listingid: string;
    location: string;
    price: string;
    prodtitle: string;
    qty: string;
    row_price: string;
    size: string;
    unit: string;
    OrdersInfo: any;

}
async function fetchUserData(request: IGetOrderInfoRequest): Promise<IGetOrderInfohResponse | null> {
    try {
        console.log("orderinfo>>", JSON.stringify(request, null, 2));

        const response: IGetOrderInfohResponse = await apiCall(request);
        console.log("orderinfo res>>", JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useOderMoreData = (request: IGetOrderInfoRequest, enable = true) => {
    const catchKey = [QueryKeys.GetOrderInfo];
    return useQuery(catchKey, () => fetchUserData(request));
};


export default useOderMoreData;
