export default function ShowDerrickDiggerForm(context) {

    var switchControl = context.evaluateTargetPath('#Page:Hydraulic_Inspection_Form/#Control:FormCellSwitch1/#Value');
    if (switchControl) {
        // turn off aerial lift switch
        context.evaluateTargetPath('#Page:Hydraulic_Inspection_Form/#Control:FormCellSwitch0').setValue(false);
        
        // hide aerial lift section
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftControls').setVisible(false);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftBooms').setVisible(false);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftStructural').setVisible(false);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftOther').setVisible(false);

        // show derrick digger section
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerControls').setVisible(true);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerBooms').setVisible(true);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerOther').setVisible(true);
    } else {
        // turn on aerial lift switch
        context.evaluateTargetPath('#Page:Hydraulic_Inspection_Form/#Control:FormCellSwitch0').setValue(true);

        // show aerial lift section
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftControls').setVisible(true);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftBooms').setVisible(true);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftStructural').setVisible(true);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftOther').setVisible(true);

        // hide derrick digger section
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerControls').setVisible(false);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerBooms').setVisible(false);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerOther').setVisible(false);
    }
}