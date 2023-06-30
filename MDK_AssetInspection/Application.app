{
	"_Name": "MDK_AssetInspection",
	"Version": "/MDK_AssetInspection/Globals/AppDefinition_Version.global",
	"MainPage": "/MDK_AssetInspection/Pages/Main.page",
	"OnLaunch": [
		"/MDK_AssetInspection/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/MDK_AssetInspection/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/MDK_AssetInspection/Actions/Service/InitializeOffline.action",
	"Styles": "/MDK_AssetInspection/Styles/Styles.less",
	"Localization": "/MDK_AssetInspection/i18n/i18n.properties",
	"_SchemaVersion": "23.4"
}