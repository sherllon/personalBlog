
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , exphbs  = require('express-handlebars')
  , hbs = exphbs.create({ /* config */
					  	layoutsDir: "templates/layouts/",
					  	defaultLayout: "layout",
					  	extname:".hbs",
					  	helpers: {
					  	    section: function(name, options){
					  	        if(!this._sections) {
					  	        	this._sections = {};
					  	        }
					  	        this._sections[name] = options.fn(this);
					  	        return null;
					  	    }
					  	}
					  });

var app = express();

app.engine('hbs', hbs.engine);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/templates');
app.set('view engine', 'hbs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
