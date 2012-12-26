/*
	We are trying to extend a base controller.
	But we haven't extended the view 
*/
Ext.define('AM.controller.Stores', {
	extend: 'AM.controller.BaseCrud',

	stores: ['Stores'],
	models: ['Store'],


	views: [
		'store.List',
		'store.Form' 
	],

  	refs: [
		{
			ref: 'list',
			selector: 'storelist'
		} 
	],
	
	formSelector	: 'storeform'	,
	listSelector	: 'storelist'	,
	backingStore	: 'Stores'  ,
	backingModel	: 'AM.model.Store'   

 

});
