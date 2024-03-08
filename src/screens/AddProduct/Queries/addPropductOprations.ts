import { capitalize } from "lodash";
import { useQueryClient } from "react-query";
import { apiCall } from "../../../utils/apiCall";
import { QueryKeys } from "../../../utils/QueryKeys";

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
    R_subcategory2: string,
    R_fulldescription: string,
    R_quantityAvailable: string,
    R_supplier: string,
    R_location: string,
    R_price: string,
    R_wholesaleprice: string,
    R_cost: string,
    R_unit: string,
    R_notes: string,
    R_size: string,
    R_color: string,
    R_imges1: string,
    R_imges2: string,
    R_imges3: string,
    R_imges4: string,
    R_imges5: string,
    R_imges6: string,
    R_imges7: string,
    R_imges8: string,
    R_imges9: string,
    R_imges10: string,

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
    R_wholesaleprice: string,
    R_unit: string,
    R_cost: string,
    R_notes: string,
    R_size: string,
    R_color: string,
    R_imges1: string,
    R_imges2: string,
    R_imges3: string,
    R_imges4: string,
    R_imges5: string,
    R_imges6: string,
    R_imges7: string,
    R_imges8: string,
    R_imges9: string,
    R_imges10: string,
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
    // R_imges1:string,
    // R_imges2:string,
    // R_imges3:string,
    // R_imges4:string,
}

async function addpropductInInventory(request: IDelSizeReq): Promise<IDeleteCatResponse | null> {
    try {
        const data = {
            do: "BackgroundInsert",
            barcode: request.R_barcode,
            prod_title: capitalize(request.R_productTitle),
            maincat: request.R_master,
            subcat_1: request.R_subcategory,
            subcat_2: request.R_subcategory2,
            tags: "",
            desc: capitalize(request.R_fulldescription),
            qty: request.R_quantityAvailable,
            supplier: request.R_supplier,
            location: request.R_location,
            price: request.R_price,
            wholesale: request.R_wholesaleprice,
            unit: request.R_unit,
            cost: request.R_cost,
            pvt_notes: request.R_notes,
            size: request.R_size,
            color: request.R_color,
            listype: "1",
            username: request.UserName,
            userid: request.UserId,
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
        const response: IDeleteCatResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const addPropductOprations = () => {
    const queryClient = useQueryClient()
    const productadd = async (request: IDelSizeReq) => {
        try {
            console.log("add product req>>", JSON.stringify(request, null, 2))
            const response = await addpropductInInventory(request)
            console.log("add product res>>", JSON.stringify(response, null, 2))
            queryClient.invalidateQueries([QueryKeys.dashboard])
            return response;
        } catch (error) {

        }
    }
    return { productadd }
};

export default addPropductOprations;