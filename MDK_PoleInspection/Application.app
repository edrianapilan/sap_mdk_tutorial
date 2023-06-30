{
	"_Name": "MDK_PoleInspection",
	"Version": "/MDK_PoleInspection/Globals/AppDefinition_Version.global",
	"MainPage": "/MDK_PoleInspection/Pages/Main.page",
	"OnLaunch": [
		"/MDK_PoleInspection/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/MDK_PoleInspection/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/MDK_PoleInspection/Actions/Service/InitializeOffline.action",
	"Styles": "/MDK_PoleInspection/Styles/Styles.less",
	"Localization": "/MDK_PoleInspection/i18n/i18n.properties",
	"_SchemaVersion": "23.4"
}