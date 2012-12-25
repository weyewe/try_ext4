Ext.define('AM.controller.Customers', {
  	extend: 'AM.controller.BaseCrud',

	stores: ['Customers'],
	models: ['Customer'],

	views: [
		'customer.List',
		'customer.Form' 
	],

	refs: [
		{
			ref: 'list',
			selector: 'customerlist'
		} 
		
	],
	
	formSelector	: 'customerform',
	listSelector	: 'customerlist',  
	backingStore	: 'Customers',
	backingModel	: 'Customer',
});
