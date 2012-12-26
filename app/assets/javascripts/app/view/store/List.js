
Ext.define('AM.view.store.List' ,{
	extend		: 'AM.view.util.CrudList', 
  	// extend: 'Ext.grid.Panel',
  	alias : 'widget.storelist',

  // title : 'All Users',
  	store: 'Stores', 
 	columns	: [
		{ header: ' Name',  dataIndex: 'name',  flex: 1 , sortable: false} 
	],

	initComponent: function() { 
 

		this.callParent(arguments);
		
		this.addObjectButton.setText("Add Store");
		this.editObjectButton.setText("Edit Store");
		this.deleteObjectButton.setText("Delete Store");
	} 
});