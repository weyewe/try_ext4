Ext.define('AM.view.department.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.departmentlist',

  // title : 'All Users',
  	store: 'Departments', 
 

	initComponent: function() {
		this.columns = [
			{ header: ' Name',  dataIndex: 'name',  flex: 1 , sortable: false} 
		];

		this.addObjectButton = new Ext.Button({
			text: 'Add Department',
			action: 'addObject'
		});

		this.editObjectButton = new Ext.Button({
			text: 'Edit Department',
			action: 'editObject',
			disabled: true
		});

		this.deleteObjectButton = new Ext.Button({
			text: 'Delete Department',
			action: 'deleteObject',
			disabled: true
		});


		this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton];
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
	
	getSelectedObject: function() {
		return this.getSelectionModel().getSelection()[0];
	},

	enableRecordButtons: function() {
		this.editObjectButton.enable();
		this.deleteObjectButton.enable();
	},

	disableRecordButtons: function() {
		this.editObjectButton.disable();
		this.deleteObjectButton.disable();
	}
});


