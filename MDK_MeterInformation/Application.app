{
	"_Name": "MDK_MeterInformation",
	"Version": "/MDK_MeterInformation/Globals/AppDefinition_Version.global",
	"MainPage": "/MDK_MeterInformation/Pages/Main.page",
	"OnLaunch": [
		"/MDK_MeterInformation/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/MDK_MeterInformation/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/MDK_MeterInformation/Actions/Service/InitializeOffline.action",
	"Styles": "/MDK_MeterInformation/Styles/Styles.less",
	"Localization": "/MDK_MeterInformation/i18n/i18n.properties",
	"_SchemaVersion": "23.4"
}