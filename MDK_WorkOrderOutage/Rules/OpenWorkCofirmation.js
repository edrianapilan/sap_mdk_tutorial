export default function OpenWorkCofirmation(context) {

    var wrStatusVal = context.evaluateTargetPath('#Page:Work_Request_Details/#Control:FCWRStatus/#SelectedValue');
    if (wrStatusVal == "Completed") {
        context.executeAction('/MDK_WorkOrderOutage/Actions/NavToWork_Confirmation.action');
    } else {
        return true;
    }
}