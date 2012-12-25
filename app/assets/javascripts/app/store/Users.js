// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('AM.store.Users', {
  	extend		: 'Ext.data.Store',

  	model		: 'AM.model.User',
  	autoLoad	: {start: 0, limit: this.pageSize},
  	autoSync: false,
	pageSize : 10, 
	
	proxy: {
		url: '/users',
		type: 'rest',
		format: 'json',
	
		reader: {
			root: 'users',
			record: 'user',
			successProperty: 'success',
			totalProperty : 'total'
		},
		
		writer: {
			// wrap user params for Rails
			getRecordData: function(record) {
				return { user: record.data };
			}
		}
	},
		
		
	// first shite will be added first 
	sorters : [
		{
			property	: 'id',
			direction	: 'DESC'
		}
	],
		
		// next task 	: for the data failed to be created.. on failure.. don't append
		// how can we do it?
	

		// we need to sort, based on the id, DESC

  listeners: {
		//     load: function() {
		//       console.log(arguments);
		//     },
		//     update: function() {
		//       console.log(arguments);
		//     },
		//     beforesync: function() {
		//       console.log(arguments);
		//     },
		// 
		// write		: function(store, operation){
		// 	console.log(' on write is called: we want to append new row @ the beginning' ) ;
		// 	store.sort('id','DESC');
		// }
  } 
});
