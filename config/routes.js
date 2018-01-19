const Index = require('../app/controllers/index');
const User = require('../app/controllers/user');
const Movie = require('../app/controllers/movie');

module.exports = function(app){
	// pre handle user
	app.use((req, res,next)=>{
		let _user = req.session.user; // 从session读取y用户

		app.locals.user = _user;
		next();	
	});

	//路由编写 .调用controller

	// index page
	app.get('/', Index.index);

	// User
	app.post('/user/signup',User.signup);
	app.post('/user/signin', User.signin);
	app.get('/logout',User.logout);
	app.get('/user/userlist', User.userlist);

	// Movie
	app.get('/movie/:id', Movie.detail);
	app.get('/admin/movie', Movie.new);
	app.get('/admin/update/:id', Movie.update);
	app.post('/admin/movie/new', Movie.save);
	app.get('/admin/list', Movie.list);
	app.delete('/admin/list', Movie.del);	
};

