{
	"_Name": "MDK_PadMountSwitch",
	"Version": "/MDK_PadMountSwitch/Globals/AppDefinition_Version.global",
	"MainPage": "/MDK_PadMountSwitch/Pages/Main.page",
	"OnLaunch": [
		"/MDK_PadMountSwitch/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/MDK_PadMountSwitch/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/MDK_PadMountSwitch/Actions/Service/InitializeOffline.action",
	"Styles": "/MDK_PadMountSwitch/Styles/Styles.less",
	"Localization": "/MDK_PadMountSwitch/i18n/i18n.properties",
	"_SchemaVersion": "23.4"
}