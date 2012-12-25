Ext.define('AM.view.customer.List' ,{
  	extend: 'AM.view.util.CrudList', 

  // title : 'All Users',
  	store		: 'Customers', 
	alias		: 'widget.customerlist',
 

	initComponent: function() {
		this.columns = [
			{ header: 'Name',  dataIndex: 'name',  flex: 1 , sortable: false} 
		];

 
		this.callParent(arguments); 
	} 
});
