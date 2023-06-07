{
	"_Name": "MDK_HydraulicForm",
	"Version": "/MDK_HydraulicForm/Globals/AppDefinition_Version.global",
	"MainPage": "/MDK_HydraulicForm/Pages/Main.page",
	"OnLaunch": [
		"/MDK_HydraulicForm/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/MDK_HydraulicForm/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/MDK_HydraulicForm/Actions/Service/InitializeOffline.action",
	"Styles": "/MDK_HydraulicForm/Styles/Styles.less",
	"Localization": "/MDK_HydraulicForm/i18n/i18n.properties",
	"_SchemaVersion": "23.4"
}