// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('AM.store.Departments', {
  	extend: 'Ext.data.Store',

  	model: 'AM.model.Department',
  	autoLoad: {start: 0, limit: this.pageSize},
  	autoSync: false,
	pageSize : 10, 
	
	proxy: {
		url: '/departments',
		type: 'rest',
		format: 'json',
	
		reader: {
			root: 'departments',
			record: 'department',
			successProperty: 'success',
			totalProperty : 'total'
		},
			
		writer: {
			getRecordData: function(record) {
				return { department : record.data };
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
