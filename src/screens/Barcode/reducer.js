const initialState = {
   barcode: ''
};
  export default function(state: any = initialState, action: Function) {
    switch (action.type) {
      case "BARCODE_CAPTURED":
        return { ...state, barcode: action.barcode };
      default:
        return state;
    }
  }