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
	
});

/*
Try this guy's 
http://www.sencha.com/forum/archive/index.php/t-136613.html

*/