const User = require('../models/users');

// singn up
exports.signup = function(req, res){
	let _user = req.body.user;
	// /user/signup/:useerId?useerId=1122;
	// 三种获取userId，1.req.params.userid, 2.req.body.userid 3.req.query.useerid,  若直接使用req.param('userid'),会从123按顺序找

	// 查找是或否用户名已存在
	User.find({name:_user.name}, (err, user)=>{ // find返回的是数组
		if(err){
			console.log(err);
		}
		if(user&&user.length){
			return res.redirect('/');
		}
		else{
			let user = new User(_user);
			user.save((err, user)=>{
				if(err){
					console.log(err);
				}else{
					console.log(user);
					res.redirect('/user/userlist');
				}
			})	
		}
	})

};

// signin
exports.signin = function(req,res){
	let _user= req.body.user;
	let name = _user.name;
	let password = _user.password;

	User.findOne({name:name}, (err,user)=>{
		if(err){
			console.log(err);
		}
		if(!user){
			return res.redirect('/');
		}
		// compare password
		user.comparePassword(password, (err, isMatched)=>{
			if(err){
				console.log(err);
			}
			if(isMatched){
				req.session.user = user; // 写入session,不做处理重启服务就消失了
				// console.log("Password is matched");
				return	res.redirect('/');
			}else{
				console.log("Password is not matched");
			}
		});
	});
};

// logout
exports.logout = function(req,res){
	delete req.session.user;
	// delete app.locals.user
	res.redirect('/');
};
	// userlist page
exports.userlist = function(req,res){
	User.fetch((err ,users) => {
		if(err){
			console.log(err);
		}
		res.render('userlist', {
			title: 'zhou\'site user列表页',
			users: users
		});

	});
};