<html>
<head>
  <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
  <title>Registration Page</title>

	<link href="font-awesome-4.3.0/css/font-awesome.css" rel="stylesheet">
	<link href="css/bootstrap.css" rel="stylesheet">
</head>

<body>
	<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
         
      </button>
      <a class="navbar-brand" href="#">e-Library</a>
    </div>

  
  </div><!-- /.container-fluid -->
</nav>
	<div class="container">
    

    <div class="omb_login">
    	<h3 class="omb_authTitle"><a href="#">Registration Form</a></h3>
			</div></div>

		<div class="row omb_row-sm-offset-3">
			<div class="col-xs-12 col-sm-5">	
			    <form class="omb_loginForm" action="reg.php" autocomplete="off" method="POST">
				<div class="input-group">
                    
						<span class="input-group-addon"><i class="fa fa-user"></i></span>
						<input type="text"  name="sname" width="200" placeholder="Your Full name" ng-model="user.name"/>
					</div>
                    <span class="help-block"></span>
                    
						<span class="input-group-addon"><i class="fa fa-user"></i></span>
						<input type="text" name="usname" ng-model="user.username" placeholder="username"/>
					</div>
                    <span class="help-block"></span>
                    	
                						
					<div class="input-group">
						<span class="input-group-addon"><i class="fa fa-key fa-fw"></i></span>
						<input type="password" name="password" ng-model="user.password" placeholder="Password"/>
					</div>
                    <span class="help-block"></span>
                    <div class="input-group">
						<span class="input-group-addon"><i class="fa fa-envelope"></i></span>
						<input type="text" ng-model="user.email" placeholder="Email Address"/>
                        
					</div>
                    <span class="help-block"></span>
                    
                    <div class="input-group">
						<span class="input-group-addon"><i class="fa fa-phone"></i></span>
						<input type="text" name="phone" placeholder="Your Phone No." ng-model="user.phone" REQUIRED />
                        
					</div>
                   
                    <span class="help-block"></span> 
                    <div class="input-group">
						<span class="glyphicon glyphicon-book"></span>
						                    <select name="dept" id="day" ng-model="user.dept"><option value="">--select dept--</option>
        <option value="Civil Engineering">Civil Engineering</option>
  <option value="Electrical Engineering">Electrical Engineering</option>
    <option value="Electrical Engineering">Mechanical Engineering</option>
      <option value="Electrical Engineering">Wood Products</option></select>
    
					</div>
                    <span class="help-block"></span>
                	<button class="btn btn-primary" ng-click="addUser(user	)">Save</button>
                    <span class="help-block"></span>
                
                    </div>
				</form>
			</div>
    	</div>
		
		</div>	    	
	</div>



        </div>
