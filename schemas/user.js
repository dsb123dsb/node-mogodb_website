const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // 密码加盐
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
	name:{
		type:String,
		unique:true
	},
	password:String,
	meta: {// 更新记录的状态记录
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});
// 模式方法，每次调用判断是否是新加的
UserSchema.pre('save', (next) => {
	let user = this;
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.updateAt = Date.now();
	}
	// 对hash后的密码加盐，并且重新复制给passwork
	bcrypt.genSaltt(SALT_WORK_FACTOR, (err,salt)=>{
		if(err)return next(err);

		bcrypt.hash(user.password,salt,(err,hash)=>{
			if(err)return next(err);

			user.password=hash;
			next();
		});
	});
	next();// 存储流程走下去
});
// 静态方法
UserSchema.statics = {
	fetch(cb){ // 取出数据库所有数据
		return this
			.find({})
			.sort('meta.updateAt')  // 排序
			.exec(cb)
	},
	findById(id, cb){ // 查询单条数据
		return this
			.findOne({_id: id})
			.exec(cb)
	}
};

module.exports = UserSchema;