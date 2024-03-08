import { apiCall } from "../../../../utils/apiCall";

interface IRequest{
    do: string,
    username:string
    password: string,
    osname: string,
    device_id: string,
    token:string,
}
interface IRespone{

}
async function fatchUesrFilter(request: IRequest): Promise<IRespone | null> {
    try {
        const response: IRespone = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const UesrFilterOpration = () => {
    const UesrFilter = async (request: IRequest) => {
        try {
            const response = await fatchUesrFilter(request)
            return response;
        } catch (error) {

        }
    }
    return { UesrFilter }


};

export default UesrFilterOpration;