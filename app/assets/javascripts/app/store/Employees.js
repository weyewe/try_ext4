// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('AM.store.Employees', {
  	extend: 'Ext.data.Store',

  	model: 'AM.model.Employee',
  	autoLoad: {start: 0, limit: this.pageSize},
  	autoSync: false,
	pageSize : 10, 
	
	proxy: {
		url: '/employees',
		type: 'rest',
		format: 'json',
	
		reader: {
			root: 'employees',
			record: 'employee',
			successProperty: 'success',
			totalProperty : 'total'
		},
			
		writer: {
			getRecordData: function(record) {
				return { employee : record.data };
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
