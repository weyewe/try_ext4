Ext.define("AM.view.Workspace", {
	extend 		: 'Ext.container.Container',
	alias			: 'widget.workspace', 
	
	layout	: 'hbox',
	items		: [
		{
			html	: "panel 1"
		},
		{
			html	: 'panel 2'
		}
	]
});