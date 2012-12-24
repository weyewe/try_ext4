Ext.define("AM.view.Cardpanel", {
	extend	: "Ext.panel.Panel",
	alias	: 'widget.cardpanel',
	layout			: 'card',
	activeItem	: 0,
	border			: false, 
	items		: [
		{
			xtype		: 'userlist'
		},
		{
			xtype		: 'departmentmanager'
		},
		{
			xtype		: 'employeemanager'
		}
	],
	
	tbar				: [
			{
				text		: 'User List',
				toggleGroup		: 'navGrp',
				itemType		: 'userlist',
				enableToggle	: true, 
				pressed			: true ,
				action			: 'changetoolbar'
			} ,
			'-',
			{
				text			: 'Manage Departments',
				itemType		: 'departmentmanager',
				toggleGrp		: 'navGrp',
				enableToggle		: true,
				action			: 'changetoolbar'
			},
			'-',
			{
				text			: 'Manage Employees',
				itemType		: 'employeemanager',
				toggleGrp		: 'navGrp',
				enableToggle	: true,
				action			: 'changetoolbar'
			},
			'->',
			{
				text			: 'Log out'
			}
	
	],
});