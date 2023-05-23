{
	"_Name": "MDK_Hydraulic",
	"Version": "/MDK_Hydraulic/Globals/AppDefinition_Version.global",
	"MainPage": "/MDK_Hydraulic/Pages/Main.page",
	"OnLaunch": [
		"/MDK_Hydraulic/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/MDK_Hydraulic/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/MDK_Hydraulic/Actions/Service/InitializeOffline.action",
	"Styles": "/MDK_Hydraulic/Styles/Styles.less",
	"Localization": "/MDK_Hydraulic/i18n/i18n.properties",
	"_SchemaVersion": "23.4"
}