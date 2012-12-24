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

  controllers: ['Users' ,'Navs'],

  autoCreateViewport: true,
});


Ext.onReady(function(){
	console.log("Inside the onReady");
	
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