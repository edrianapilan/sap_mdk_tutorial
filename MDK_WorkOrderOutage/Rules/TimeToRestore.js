export default function TimeToRestore(context) {

    var restoreServiceVal = context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCRestoreService/#SelectedValue');
    if (restoreServiceVal == "Yes") {
        context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCTimeToRestore').setVisible(true);
    } else {
        context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCTimeToRestore').setVisible(false);
        context.evaluateTargetPath('#Page:Work_Confirmation/#Control:FCSPTime').setVisible(false);
    }
}