import { apiCall } from "../../../utils/apiCall";
import { useQuery, useQueryClient } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";

export interface IDelSizeReq {
    UserId: string;
    UserName: string;
    password: string;
    isenglish: boolean;
    CompamyName: string;
    MastercaId: any;
    catagoryId: any;
    isLoading: string;
    data: string;
    isError: string;
    refetch: string;
    R_barcode: string;
    R_productTitle: string;
    R_master: string;
    R_subcategory: string;
    R_subcategory2: string;
    R_fulldescription: string;
    R_quantityAvailable: string;
    R_supplier: string;
    R_location: string;
    R_price: string;
    R_cost: string;
    R_wholesale: string;
    R_unit: string;
    R_notes: string;
    R_size: string;
    R_color: string;
    R_listingid: string;
    R_imges1: any;
    R_imges2: any;
    R_imges3: any;
    R_imges4: any;
    R_imges5: any;
    R_imges6: any;
    R_imges7: any;
    R_imges8: any;
    R_imges9: any;
    R_imges10: any;
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
    R_subcategory2: string,
    R_fulldescription: string,
    R_quantityAvailable: string,
    R_supplier: string,
    R_location: string,
    R_price: string,
    R_cost: string;
    R_notes: string,
    R_size: string,
    R_color: string,
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
    R_subcategory2: string,
    R_fulldescription: string,
    R_quantityAvailable: string,
    R_supplier: string,
    R_location: string,
    R_price: string,
    R_notes: string,
    R_size: string,
    R_color: string,
}


async function updatePropductOprations(request: IDelSizeReq): Promise<IDeleteCatResponse | null> {
    try {
        const data = {
            do: "InventoryUpdate",
            barcode: request.R_barcode,
            prod_title: request.R_productTitle,
            maincat: request.R_master,
            subcat_1: request.R_subcategory,
            subcat_2: request.R_subcategory2,
            tags: "",
            desc: request.R_fulldescription,
            qty: request.R_quantityAvailable,
            supplier: request.R_supplier,
            location: request.R_location,
            unit: request.R_unit,
            price: request.R_price,
            cost: request.R_cost,
            wholesale: request.R_wholesale,
            pvt_notes: request.R_notes,
            size: request.R_size,
            color: request.R_color,
            listingid: request.R_listingid,
            listype: "1",
            username: request.UserName,
            userid: request.UserId,
            delete: "",
            image_1: request.R_imges1,
            image_2: request.R_imges2,
            image_3: request.R_imges3,
            image_4: request.R_imges4,
            image_5: request.R_imges5,
            image_6: request.R_imges6,
            image_7: request.R_imges7,
            image_8: request.R_imges8,
            image_9: request.R_imges9,
            image_10: request.R_imges10,
        };
        console.log("submit req>>", JSON.stringify(request, null, 2))
        const response: IDeleteCatResponse = await apiCall(data);
        console.log("submit res>>", JSON.stringify(response, null, 2))
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}


const updatePropduct = () => {
    const queryClient = useQueryClient()
    const productUpdate = async (request: IDelSizeReq) => {
        console.log("edited req>>", JSON.stringify(request, null, 2));

        try {
            const response = await updatePropductOprations(request)
            console.log("edited res>>", JSON.stringify(response, null, 2));
            queryClient.invalidateQueries([QueryKeys.dashboard])
            queryClient.invalidateQueries([QueryKeys.useOutStock])
            queryClient.invalidateQueries([QueryKeys.useAllLocation])
            queryClient.invalidateQueries([QueryKeys.thilocation])
            return response;
        } catch (error) {

        }
    }
    return { productUpdate }
};


export default updatePropduct;

