import { apiCall } from "../../../utils/apiCall";

interface IBarcodeSerchReq {
  do: string;
  userid: string | undefined;
  associates: number | undefined;
  barcode: string | undefined;
}

interface IBarcodeSerchResponse{
  CurrentCall:string;
  UserId:string;
  ResponseCode:string;
  ResponseMsg:string;
  InventoryData:{
  };
}

async function fatchBradodeSerch(request: IBarcodeSerchReq): Promise<IBarcodeSerchResponse | null> {
  try {
      const response: IBarcodeSerchResponse = await apiCall(request);
      return response;
  } catch (error) {
      return Promise.reject(error);
  }
}

const useBarcodeSerch = () => {
  const barcodeSerch = async (request: IBarcodeSerchReq) => {
      try {
          const response = await fatchBradodeSerch(request)
          return response;
      } catch (error) {

      }
  }
  return { barcodeSerch }
};
export default useBarcodeSerch;

