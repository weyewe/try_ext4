Ext.define('AM.view.util.CrudList' ,{
  	extend: 'Ext.grid.Panel', 

  // title : 'All Users',
  	// store: 'Users', 
	store	: undefined,
	title	: undefined, 
	columns	: undefined, 
 

	initComponent: function() {
		// this.columns = [
		// { header: 'First Name',  dataIndex: 'first_name',  flex: 1 , sortable: false},
		// { header: 'Last Name',  dataIndex: 'last_name',  flex: 1 		, sortable: false},
		// { header: 'Email', dataIndex: 'email',			 flex: 1		, sortable: false  }
		// ];

		this.addObjectButton = new Ext.Button({
			text: 'Add ',
			action: 'addObject'
		});

		this.editObjectButton = new Ext.Button({
			text: 'Edit ',
			action: 'editObject',
			disabled: true
		});

		this.deleteObjectButton = new Ext.Button({
			text: 'Delete ',
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
