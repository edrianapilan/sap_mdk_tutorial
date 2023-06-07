export default function ShowInputTime(context) {

    var timeToStoreVal = context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCTimeToRestore/#SelectedValue');
    if (timeToStoreVal == "Other") {
        context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCSPTime').setVisible(true);
    } else {
        context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCSPTime').setVisible(false);
    }
}