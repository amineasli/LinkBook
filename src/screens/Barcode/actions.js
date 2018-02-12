export function setBarcode(barcode: string) {
    return {
        type: 'BARCODE_CAPTURED',
        barcode: barcode
    }
}

export function captureBarcode(barcode: string) {
    return dispatch => {
        dispatch(setBarcode(barcode));
    }    
}