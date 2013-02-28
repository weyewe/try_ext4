Ext.define('AM.model.Customer', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
    	{ name: 'name', type: 'string' } 
  	],

  	validations: [
    	// { type: 'presence', field: 'name' } 
  	],

  	idProperty: 'id' ,proxy: {
			url: '/customers',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'customers',
				record: 'customer',
				successProperty: 'success',
				totalProperty : 'total'
			},

			// reader: {
			// 	root: 'data',
			// 	record: 'customer',
			// 	successProperty: 'success',
			// 	totalProperty : 'total',
			// 	messageProperty: 'message'
			// },

			writer: {
				getRecordData: function(record) {
					return { customer : record.data };
				}
			}
		}
	
  
});
