
var express = require('express');
var router = express.Router();
var path = require('path');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var schema = require('../conf/schema');
var mongoose = require('mongoose');
var staff = schema.staffModel;
var assignment = schema.assignment;
var book = schema.bookModel;
var course = schema.courseModel;
var fs = require('fs');

router.param('id', function(req, res, next, id){
	res.set('Access-Control-Allow-Origin', '*');
    staff.findById(id, function(err, data){
		if(err) {return next(err);}
		req.id = data._id;
		req.name = data.name;
        req.dat = data;
		console.log("lw");
        next();
	});
});

router.param('course', function(req, res, next, id){
	//res.set('Access-Control-Allow-Origin', '*');
    
    course.findById(id, function(err, data){
		if(err) {return next(err);}
		req.course = data;
		//console.log("lw");
        next();
	});
});
router.get('/library/:dept/:level', function(req, res){
course.find({'level':req.params.level, 'department':req.params.dept}, function(err, data){
    if(err){return res.send(500);}
    return res.json(200, data);
}); 
});


router.get('/library/:dept', function(req, res){
book.find({'department':req.params.dept}, function(err, data){
    if(err){return res.send(500);}
    return res.json(200, data);
}); 
});


router.get('/courses/:id', function(req, res){
    course.find({l_id:req.id}, function(err, data){
        if(err){
            console.log(err);
            return res.send(500);
        }
        console.log(data);
        var datas = {profile : req.dat,
                    courses: data};
        return res.json(200, datas);
    });
});

router.get('/material/:course', function(req, res){
    var id = req.course._id;
    book.find({'course': id}, function(err, data){
        if(err){
          console.log(err);
            return res.send(500);
            
        }
        return res.json(200, data);
    });
});

router.post('/course/material/:course', multipartMiddleware,function(req, res){
    var data = req.course;
    var tm = req.files.file.name;
    //console.log(s);
    fs.readFile(req.files.file.path, function (err,data) {
    console.log(data);
        fs.writeFile('./public/pdf/'+tm, data, function(err){
        console.log(err);
    });
     });
console.log("Upload completed!");
    var tmm = tm.split(".");
   
    var books =new book({
        level:data.level,
        course:data._id,
        url: tm,
        title:tmm[0],
        department: data.department,
        course_name:data.title
    });
    
    books.save(function(err, data){
        if(err){
            return res.send(500);
            
        }
        console.log(data);
        return res.json(200, data);
    });
});

router.post('/course/:id', function(req, res){
    console.log(req.body);
    var data = req.body;
    var courses = new course({
        title: data.title,
        course_code: data.course_code,
        desc:data.desc,
        level:data.level,
        department:data.dept,
        l_id: req.id
    });
    console.log(course);
    courses.save(function(err, data){
        if(err){
      		console.log(err);
      		console.log(data);
      	return res.send(500);
      	}
      	return res.json(200, data);

    });
});
router.post('/sign_in', function(req, res){
	console.log(req.body);
	var data = req.body;
	var password = data.password;
	staff.findOne({username: data.username, password:password}, function(err, data){
		if(err){
			console.log(err);
		return res.send(500);
			}
			if(!data){
				return res.send(404);
			}
		if(data === undefined || (data.password != password)){
			return res.send(401);
		}
		console.log(data);
		return res.json(200, data);
			});
});


router.post('/user/register', function(req, res) {
 var data = req.body;
    console.log(data);
/*var tempPath = req.files.file.path,
    targetPath = path.resolve('./uploadFiles/' + req.files.file.name);
fs.rename(tempPath, targetPath, function(err) {
if (err) throw err;
});
    console.log("Upload completed!");
    console.log(tempPath);
    var url = './uploadFiles/' + req.files.file.name;
  */var staffs = new staff({
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
       contact: data.contact,
        dept: data.dept,
    //  img_url:url
      });
      console.log(data);
      staffs.save(function(err, data){
      	if(err){
      		console.log(err);
      		console.log(data);
      	return res.send(500);
      	}
      	return res.json(200, data);
      });
      });

router.post('/general/material', multipartMiddleware,function(req, res){
    var data = req.course;
    var tm = req.files.file.name;
    //console.log(s);
    fs.readFile(req.files.file.path, function (err,data) {
    console.log(data);
        fs.writeFile('./public/pdf/'+tm, data, function(err){
        console.log(err);
    });
     });
console.log("Upload completed!");
    var tmm = tm.split(".");
   
    var books =new book({
        url: tm,
        title:tmm[0],
        department: data.department,
        course_name:"General",
        view_type:"general"
    });
    
    books.save(function(err, data){
        if(err){
            return res.send(500);
            
        }
        console.log(data);
        return res.json(200, data);
    });
});


module.exports = router;