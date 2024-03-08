import { apiCall } from "../../../utils/apiCall";
import { useQueryClient } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";



interface IsetOrdereReq {
    do: "SetOrder";
    R_userid: string;
    R_order_number: number;
    R_order_status: number,
}

interface IsetOrderResponse {

}


async function setOrderInInventory(request: IsetOrdereReq): Promise<IsetOrderResponse | null> {
    try {
        const data = {
            do: "SetOrder",
            userid: request.R_userid,
            order_number: request.R_order_number,
            order_status: request.R_order_status,
        };
        const response: IsetOrderResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}


const setOrderOprations = () => {
    const queryClient = useQueryClient()

    const setOrder = async (request: IsetOrdereReq) => {

        try {
            const response = await setOrderInInventory(request)
            queryClient.invalidateQueries([QueryKeys.orderScreen])
            queryClient.invalidateQueries([QueryKeys.GetOrderInfo])
            return response;
        } catch (error) {

        }
    }
    return { setOrder }

};


export default setOrderOprations;


