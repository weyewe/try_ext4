Ext.define('AM.view.user.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.userlist',

  // title : 'All Users',
  	store: 'Users', 
 

	initComponent: function() {
		this.columns = [
		{ header: 'First Name',  dataIndex: 'first_name',  flex: 1 , sortable: false},
		{ header: 'Last Name',  dataIndex: 'last_name',  flex: 1 		, sortable: false},
		{ header: 'Email', dataIndex: 'email',			 flex: 1		, sortable: false  }
		];

		this.addUserButton = new Ext.Button({
			text: 'Add User',
			action: 'addUser'
		});

		this.editUserButton = new Ext.Button({
			text: 'Edit user',
			action: 'editUser',
			disabled: true
		});

		this.deleteUserButton = new Ext.Button({
			text: 'Delete User',
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
