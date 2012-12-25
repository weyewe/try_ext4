// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('AM.store.Customers', {
  	extend: 'Ext.data.Store',

  	model: 'AM.model.Customer',
  	autoLoad: {start: 0, limit: this.pageSize},
  	autoSync: false,
	pageSize : 10, 
	
	proxy: {
		url: '/customers',
		type: 'rest',
		format: 'json',
	
		reader: {
			root: 'customers',
			record: 'customer',
			successProperty: 'success',
			totalProperty : 'total'
		},
			
		writer: {
			getRecordData: function(record) {
				return { customer : record.data };
			}
		}
	},
		
		
	sorters : [
		{
			property	: 'id',
			direction	: 'DESC'
		}
	], 

	listeners: {

	} 
});
