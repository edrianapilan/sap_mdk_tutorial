export default function ShowAdditionalFields(context) {

    var inspectionType = context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCInspType/#SelectedValue');

    switch (inspectionType) {
        case value:
            
            break;
    
        default:
            break;
    }

    if (inspectionType == "Other") {
        context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCSPTime').setVisible(true);
    } else {
        context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCSPTime').setVisible(false);
    }
}