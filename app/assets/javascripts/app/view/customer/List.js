Ext.define('AM.view.customer.List' ,{
  	extend		: 'AM.view.util.CrudList', 	

	alias		: 'widget.customerlist',
  // title : 'All Users',
  	store		: 'Customers', 
	
 

	initComponent: function() {
		this.columns = [
			{ header: 'Name',  dataIndex: 'name',  flex: 1 , sortable: false} 
		];

 
		this.callParent(arguments); 
		
		// we set auto load to be false. or else, crazy setup 
		this.store.load(); 
	} 
});
