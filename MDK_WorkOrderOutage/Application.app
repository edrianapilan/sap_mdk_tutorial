{
	"_Name": "MDK_WorkOrderOutage",
	"Version": "/MDK_WorkOrderOutage/Globals/AppDefinition_Version.global",
	"MainPage": "/MDK_WorkOrderOutage/Pages/Main.page",
	"OnLaunch": [
		"/MDK_WorkOrderOutage/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/MDK_WorkOrderOutage/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/MDK_WorkOrderOutage/Actions/Service/InitializeOffline.action",
	"Styles": "/MDK_WorkOrderOutage/Styles/Styles.less",
	"Localization": "/MDK_WorkOrderOutage/i18n/i18n.properties",
	"_SchemaVersion": "23.4"
}