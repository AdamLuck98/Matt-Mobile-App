const initialState = {
  Accociation: 0,
  StockNumber: "",
  StockKey: "",
  barcodeKey: "",
  categoryKey: "",
  subcategoryKey: "",
  subcategoryKey2: "",
  apikey: "",
  detailsKey: "",
  color: "",
  size: "",
  showDetail: 1,
 

};
const SerchScreenSort = (state = initialState, action: any) => {
  switch (action.type) {
    case "Accociation":
      return {
        ...state,
        Accociation: action.payload
      }
    case "StockNumber":
      return {
        ...state,
        StockNumber: action.payload
      }

    case "StockKey":
      return {
        ...state,
        StockKey: action.payload
      }


    case "barcodeKey":
      return {
        ...state,
        barcodeKey: action.payload
      }

    case "detailsKey":
      return {
        ...state,
        detailsKey: action.payload
      }


    case "categoryKey":
      return {
        ...state,
        categoryKey: action.payload
      }

    case "subcategoryKey":
      return {
        ...state,
        subcategoryKey: action.payload
      }

    case "subcategoryKey2":
      return {
        ...state,
        subcategoryKey2: action.payload
      }

    case "apikey":
      return {
        ...state,
        apikey: action.payload
      }

    case "showDetail":
      return {
        ...state,
        showDetail: action.payload
      }
      
      case "color":
      return {
        ...state,
        color: action.payload
      }
      case "size":
      return {
        ...state,
        size: action.payload
      }

    default:
      return state;
  }
};

export default SerchScreenSort;
