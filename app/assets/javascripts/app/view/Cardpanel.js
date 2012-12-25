Ext.define("AM.view.Cardpanel", {
	extend	: "Ext.panel.Panel",
	alias	: 'widget.cardpanel',
	layout			: 'card',
	// activeItem	: 0,
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
	
 
	initComponent: function(){ 
		var selectedActiveItemIndex = 1; 
		
		Ext.apply(this,	{
			activeItem		: selectedActiveItemIndex, 
			tbar			: this.buildTBar( selectedActiveItemIndex)
		});
		
		 
		this.callParent(arguments);
	},
	
	buildTBar			: function( selectedActiveItemIndex) {
		return [
				{
					text		: 'User List',
					toggleGroup		: 'navGrp',
					itemType		: 'userlist',
					enableToggle	: true, 
					pressed			: (  selectedActiveItemIndex   === 0 ) ,
					action			: 'changetoolbar'
				} ,
				'-',
				{
					text			: 'Manage Departments',
					itemType		: 'departmentmanager',
					toggleGrp		: 'navGrp',
					enableToggle	: true, 
					pressed			:  (  selectedActiveItemIndex   === 1 )  ,
					action			: 'changetoolbar'
				},
				'-',
				{
					text			: 'Manage Employees',
					itemType		: 'employeemanager',
					toggleGrp		: 'navGrp',
					enableToggle	: true, 
					pressed			:  (  selectedActiveItemIndex   === 2 )  ,
					action			: 'changetoolbar'
				},
				'->',
				{
					text			: 'Log out'
				}

		];
	} 
});