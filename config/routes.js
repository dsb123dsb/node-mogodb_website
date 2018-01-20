const Index = require('../app/controllers/index');
const User = require('../app/controllers/user');
const Movie = require('../app/controllers/movie');
const Comment = require('../app/controllers/comment');

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
	app.get('/signin', User.showSignin);
	app.get('/signup', User.showSignup);
	app.get('/logout',User.logout);
	app.get('/user/user/list', User.signinRequired, User.adminRequired, User.list); // 中间件概念

	// Movie
	app.get('/movie/:id', Movie.detail);
	app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);
	app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
	app.post('/admin/movie',User.signinRequired, User.adminRequired, Movie.save);
	app.get('/admin/movie/list',User.signinRequired, User.adminRequired, Movie.list);
	app.delete('/admin/movie/list',User.signinRequired, User.adminRequired, Movie.del);	
	// Comment
	app.post('/admin/comment',User.signinRequired, Comment.save);
};

