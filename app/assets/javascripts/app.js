/**
 *= require_self
 */

// Set valid ExtJS loading path (/vendor/assets/extjs4/src)
Ext.Loader.setPath('Ext', '/assets/extjs4/src');

// create a new instance of Application class
Ext.application({
  // the global namespace
  name: 'AM',

  appFolder: '/assets/app',

	// strange, when we don't have the controller, it is an error.
  controllers: [

			'Users' ,
			'Customers',
			'Employees',
			'Departments',
			'Stores',
			'Navs'
		],

  autoCreateViewport: true,
});


Ext.onReady(function(){
	
	Ext.Ajax.on('beforerequest', function(conn, options) {
	    var content, metatag;
	    metatag = Ext.select('meta[name="csrf-token"]');
	    if (metatag.first() != null) {
	      content = metatag.first().dom.content;
	      options.headers || (options.headers = {});
	      return options.headers["X-CSRF-Token"] = content;
	    }
	  }, this);
	
	// from this shite:
	// http://www.sencha.com/forum/showthread.php?136183-How-to-get-a-callback-from-store-sync
	
	// Ext.data.AbstractStore.override({
	//     sync: function(config) 
	//     {
	//         config = config || {};
	// 
	//         var defaults = {
	//             callback: Ext.emptyFn
	//         }
	// 
	//         config = Ext.apply(defaults, config);
	// 
	//         var me        = this,
	//             options   = {},
	//             toCreate  = me.getNewRecords(),
	//             toUpdate  = me.getUpdatedRecords(),
	//             toDestroy = me.getRemovedRecords(),
	//             needsSync = false;
	// 
	//         if (toCreate.length > 0) {
	//             options.create = toCreate;
	//             needsSync = true;
	//         }
	// 
	//         if (toUpdate.length > 0) {
	//             options.update = toUpdate;
	//             needsSync = true;
	//         }
	// 
	//         if (toDestroy.length > 0) {
	//             options.destroy = toDestroy;
	//             needsSync = true;
	//         }
	// 
	//         if (needsSync && me.fireEvent('beforesync', options) !== false) {
	//             var batch = me.proxy.batch(options, me.getBatchListeners());
	// 
	//             batch.on('complete', Ext.bind(config.callback, this, [this, options]), this, {single:true});
	//         }
	//     }
	// });
});

/*
Try this guy's 
http://www.sencha.com/forum/archive/index.php/t-136613.html

*/