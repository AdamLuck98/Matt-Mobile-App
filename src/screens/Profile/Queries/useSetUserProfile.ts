import { Alert } from "react-native";
import { apiCall } from "../../../utils/apiCall";

export interface ISetUserReq {
    CompanyName: string;
    contact_fname: string;
    contact_lname: string;
    cellphone: string;
    storephone: string;
    address: string;
    city: string;
    prephone: string;
    state_prov: string;
    userstate: string;
    password: string;
    zip_postal: string;
    email: string;
    limit_password: string;
    associate: string;
    d_charge: string;
    d_enable: string;
    op_hours: string;
    tax_rate: string;
    UserName: string;
    userid: string;
    d_gratuity: string;
    disclaimer: string;
    flags: string;
    lang: string;
    e_enable: string;
}

interface ISetUserResponse {
    Data: any
}


async function updateUserData(request: ISetUserReq): Promise<ISetUserResponse | null> {
    try {
        const data = {
            do: "saveuser",
            CompanyName: request.CompanyName,
            contact_fname: request.contact_fname,
            contact_lname: request.contact_lname,
            cellphone: request.cellphone,
            storephone: request.storephone,
            address: request.address,
            city: request.city,
            prephone: request.prephone,
            state_prov: request.state_prov,
            userstate: request.userstate,
            password: request.password,
            zip_postal: request.zip_postal,
            email: request.email,
            limit_password: request.limit_password,
            associate: request.associate,
            d_charge: request.d_charge,
            d_enable: request.d_enable,
            op_hours: request.op_hours,
            tax_rate: request.tax_rate,
            UserName: request.UserName,
            userid: request.userid,
            d_gratuity: request.d_gratuity,
            disclaimer: request.disclaimer,
            flags: request.flags,
            lang: request.lang,
            e_enable: request.e_enable
        };
        const response: ISetUserResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}


const updateUserDataOperation = () => {
    const updateData = async (request: ISetUserReq) => {
        try {
            const response = await updateUserData(request)
            return response;
        } catch (error) {

        }
    }
    return { updateData }


};



export default updateUserDataOperation;