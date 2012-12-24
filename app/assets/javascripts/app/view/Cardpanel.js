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
	
	// how can we enforce the role?
	// most likely in the initComponent
	initComponent: function(){

		//  initComponent can be used to programmatically configure 
		// the component's config JSON.. => using Ext.apply( this, {}); 
		
		// Ext.apply(this, {
		// 	activeItem : 1 
		// });

		// this.layout.setActiveItem( 0 ) ; 
		// so, on initComponent, we can use the role ... 
		this.callParent(arguments);
	},
	// 
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