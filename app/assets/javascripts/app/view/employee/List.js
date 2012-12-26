Ext.define('AM.view.employee.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.employeelist',

  // title : 'All Users',
  	store: 'Employees', 
 

	initComponent: function() {
		this.columns = [
			{ header: ' Name',  dataIndex: 'name',  flex: 1 , sortable: false} 
		];

		this.addUserButton = new Ext.Button({
			text: 'Add Employee',
			action: 'addUser'
		});

		this.editUserButton = new Ext.Button({
			text: 'Edit Employee',
			action: 'editUser',
			disabled: true
		});

		this.deleteUserButton = new Ext.Button({
			text: 'Delete Employee',
			action: 'deleteUser',
			disabled: true
		});


		this.tbar = [this.addUserButton, this.editUserButton, this.deleteUserButton];
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
	
	getSelectedUser: function() {
		return this.getSelectionModel().getSelection()[0];
	},

	enableRecordButtons: function() {
		this.editUserButton.enable();
		this.deleteUserButton.enable();
	},

	disableRecordButtons: function() {
		this.editUserButton.disable();
		this.deleteUserButton.disable();
	}
});
