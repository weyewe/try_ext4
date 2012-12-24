Ext.define('AM.view.user.List' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.userlist',

  title : 'All Users',
  store: 'Users',

  initComponent: function() {
    this.columns = [
      { header: 'First Name',  dataIndex: 'first_name',  flex: 1 },
      { header: 'Last Name',  dataIndex: 'last_name',  flex: 1 },
      { header: 'Email', dataIndex: 'email', flex: 1 }
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

    this.callParent(arguments);
  },

	dockedItems: [{
	        xtype: 'pagingtoolbar',
	        store: this.store,   // same store GridPanel is using
	        dock: 'bottom',
	        displayInfo: true
	    }], 
	
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