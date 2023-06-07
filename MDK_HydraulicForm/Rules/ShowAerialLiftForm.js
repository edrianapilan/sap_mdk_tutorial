export default function ShowAerialLiftForm(context) {

    var switchControl = context.evaluateTargetPath('#Page:Hydraulic_Inspection_Form/#Control:FormCellSwitch0/#Value');
    if (switchControl) {
        // turn off derrick digger switch
        context.evaluateTargetPath('#Page:Hydraulic_Inspection_Form/#Control:FormCellSwitch1').setValue(false);

        // hide derrick digger section
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerControls').setVisible(false);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerBooms').setVisible(false);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerOther').setVisible(false);
        
        // show aerial lift section
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftControls').setVisible(true);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftBooms').setVisible(true);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftStructural').setVisible(true);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftOther').setVisible(true);
    } else {
        // turn on derrick digger switch
        context.evaluateTargetPath('#Page:Hydraulic_Inspection_Form/#Control:FormCellSwitch1').setValue(true);

        // show derrick digger section
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerControls').setVisible(true);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerBooms').setVisible(true);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCDerrickDiggerOther').setVisible(true);

        // hide aerial lift section
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftControls').setVisible(false);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftBooms').setVisible(false);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftStructural').setVisible(false);
        context.getPageProxy().getControl('SectionedTable0').getSection('SFCAerialLiftOther').setVisible(false);
    }
}