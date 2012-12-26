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
			xtype		: 'employeelist'
		},
		{
			xtype		: 'customerlist'
		}
	],
	
 
	initComponent: function(){ 
		var selectedActiveItemIndex = 2; 
		
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
					itemType		: 'employeelist',
					toggleGrp		: 'navGrp',
					enableToggle	: true, 
					pressed			:  (  selectedActiveItemIndex   === 2 )  ,
					action			: 'changetoolbar'
				},
				'-',
				{
					text			: 'Manage Customer',
					itemType		: 'customerlist',
					toggleGrp		: 'navGrp',
					enableToggle	: true, 
					pressed			:  (  selectedActiveItemIndex   === 3 )  ,
					action			: 'changetoolbar'
				},
				'->',
				{
					text			: 'Log out'
				}

		];
	} 
});