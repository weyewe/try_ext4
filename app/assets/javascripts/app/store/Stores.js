// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('AM.store.Stores', {
  	extend: 'Ext.data.Store',

  	model: 'AM.model.Store',
  	autoLoad: {start: 0, limit: this.pageSize},
  	autoSync: false,
	pageSize : 10, 
	
	proxy: {
		url: '/stores',
		type: 'rest',
		format: 'json',
	
		reader: {
			root: 'stores',
			record: 'store',
			successProperty: 'success',
			totalProperty : 'total'
		},
			
		writer: {
			getRecordData: function(record) {
				return { store : record.data };
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
