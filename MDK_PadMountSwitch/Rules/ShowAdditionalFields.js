export default function ShowAdditionalFields(context) {

    var inspectionType = context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCInspType/#SelectedValue');

    switch (inspectionType) {
        case "Live Front":
            
            break;

        case "Dead Front":
            
            break;

        case "S&C":
            
            break;
    
        default:
            break;
    }

    // if (timeToStoreVal == "Other") {
    //     context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCSPTime').setVisible(true);
    // } else {
    //     context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCSPTime').setVisible(false);
    // }
}