

//var databases= require('./client/js/database/createcollections');
/*app.get('/', function (req, res) {
  res.send('<html>\n' +
      '<head>\n' +
      '<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">\n' +
      '    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">\n' +
      '        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">\n' +
      '\n' +
      '\n' +
      '    <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">\n' +
      '<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>\n' +
      '<!------ Include the above in your HEAD tag ---------->\n' +
      '\n' +
      '<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n' +
      '  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>\n' +
      '  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>\n' +
      '  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>\n' +
      '</head>\n' +
      '<body style="background-color: #D4D8D8;">\n' +
      '  <div>\n' +
      '  <nav class="navbar navbar-default navbar-inverse" role="navigation" style="background-color: #25913E;">\n' +
      '  <div class="container-fluid">\n' +
      '    <!-- Brand and toggle get grouped for better mobile display -->\n' +
      '    <div class="navbar-header" >\n' +
      '      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">\n' +
      '        <span class="sr-only">Toggle navigation</span>\n' +
      '        <span class="icon-bar"></span>\n' +
      '        <span class="icon-bar"></span>\n' +
      '        <span class="icon-bar"></span>\n' +
      '      </button>\n' +
      '      <a class="navbar-brand" href="#">Login dropdown</a>\n' +
      '    </div>\n' +
      '\n' +
      '    <!-- Collect the nav links, forms, and other content for toggling -->\n' +
      '    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n' +
      '      <ul class="nav navbar-nav">\n' +
      '        <li class="active"><a href="#">Link</a></li>\n' +
      '        <li><a href="#">Link</a></li>\n' +
      '        <li class="dropdown">\n' +
      '          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>\n' +
      '          <ul class="dropdown-menu" role="menu">\n' +
      '            <li><a href="#">Action</a></li>\n' +
      '            <li><a href="#">Another action</a></li>\n' +
      '            <li><a href="#">Something else here</a></li>\n' +
      '            <li class="divider"></li>\n' +
      '            <li><a href="#">Separated link</a></li>\n' +
      '            <li class="divider"></li>\n' +
      '            <li><a href="#">One more separated link</a></li>\n' +
      '          </ul>\n' +
      '        </li>\n' +
      '      </ul>\n' +
      '      <form class="navbar-form navbar-left" role="search">\n' +
      '        <div class="form-group">\n' +
      '          <input type="text" class="form-control" placeholder="Search">\n' +
      '        </div>\n' +
      '        <button type="submit" class="btn btn-default">Submit</button>\n' +
      '      </form>\n' +
      '      <ul class="nav navbar-nav navbar-right">\n' +
      '        <li><p class="navbar-text">Already have an account?</p></li>\n' +
      '        <li class="dropdown">\n' +
      '          <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span class="caret"></span></a>\n' +
      '\t\t\t<ul id="login-dp" class ="dropdown-menu">\n' +
      '\t\t\t\t<li>\n' +
      '\t\t\t\t\t <div class="row">\n' +
      '\t\t\t\t\t\t\t<div class="col-md-12">\n' +
      '\t\t\t\t\t\t\t\tLogin via\n' +
      '\t\t\t\t\t\t\t\t<div class="social-buttons">\n' +
      '\t\t\t\t\t\t\t\t\t<a href="#" class="btn btn-fb"><i class="fa fa-facebook"></i> Facebook</a>\n' +
      '\t\t\t\t\t\t\t\t\t<a href="#" class="btn btn-tw"><i class="fa fa-twitter"></i> Twitter</a>\n' +
      '\t\t\t\t\t\t\t\t</div>\n' +
      '                                or\n' +
      '\t\t\t\t\t\t\t\t <form class="form" role="form" method="post" action="login" accept-charset="UTF-8" id="login-nav">\n' +
      '\t\t\t\t\t\t\t\t\t\t<div class="form-group">\n' +
      '\t\t\t\t\t\t\t\t\t\t\t <label class="sr-only" for="exampleInputEmail2">Email address</label>\n' +
      '\t\t\t\t\t\t\t\t\t\t\t <input type="email" class="form-control" id="exampleInputEmail2" placeholder="Email address" required>\n' +
      '\t\t\t\t\t\t\t\t\t\t</div>\n' +
      '\t\t\t\t\t\t\t\t\t\t<div class="form-group">\n' +
      '\t\t\t\t\t\t\t\t\t\t\t <label class="sr-only" for="exampleInputPassword2">Password</label>\n' +
      '\t\t\t\t\t\t\t\t\t\t\t <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password" required>\n' +
      '                                             <div class="help-block text-right"><a href="">Forget the password ?</a></div>\n' +
      '\t\t\t\t\t\t\t\t\t\t</div>\n' +
      '\t\t\t\t\t\t\t\t\t\t<div class="form-group">\n' +
      '\t\t\t\t\t\t\t\t\t\t\t <button type="submit" class="btn btn-primary btn-block">Sign in</button>\n' +
      '\t\t\t\t\t\t\t\t\t\t</div>\n' +
      '\t\t\t\t\t\t\t\t\t\t<div class="checkbox">\n' +
      '\t\t\t\t\t\t\t\t\t\t\t <label>\n' +
      '\t\t\t\t\t\t\t\t\t\t\t <input type="checkbox"> keep me logged-in\n' +
      '\t\t\t\t\t\t\t\t\t\t\t </label>\n' +
      '\t\t\t\t\t\t\t\t\t\t</div>\n' +
      '\t\t\t\t\t\t\t\t </form>\n' +
      '\t\t\t\t\t\t\t</div>\n' +
      '\t\t\t\t\t\t\t<div class="bottom text-center">\n' +
      '\t\t\t\t\t\t\t\tNew here ? <a href="#"><b>Join Us</b></a>\n' +
      '\t\t\t\t\t\t\t</div>\n' +
      '\t\t\t\t\t </div>\n' +
      '\t\t\t\t</li>\n' +
      '\t\t\t</ul>\n' +
      '        </li>\n' +
      '      </ul>\n' +
      '    </div><!-- /.navbar-collapse -->\n' +
      '  </div><!-- /.container-fluid -->\n' +
      '</nav>\n' +
      '      <div class="container">\n' +
      '  <h2>Latest Winning Tips</h2>\n' +
      '  <table class="table table-dark table-hover">\n' +
      '    <thead>\n' +
      '      <tr>\n' +
      '        <th>Home Team </th>\n' +
      '        <th>Away Team</th>\n' +
      '        <th>Odds</th>\n' +
      '      </tr>\n' +
      '    </thead>\n' +
      '    <tbody>\n' +
      '      <tr>\n' +
      '        <td>John</td>\n' +
      '        <td>Doe</td>\n' +
      '        <td>john@example.com</td>\n' +
      '      </tr>\n' +
      '      <tr>\n' +
      '        <td>Mary</td>\n' +
      '        <td>Moe</td>\n' +
      '        <td>mary@example.com</td>\n' +
      '      </tr>\n' +
      '      <tr>\n' +
      '        <td>July</td>\n' +
      '        <td>Dooley</td>\n' +
      '        <td>july@example.com</td>\n' +
      '      </tr>\n' +
      '    </tbody>\n' +
      '  </table>\n' +
      '</div>\n' +
      '       <div class="container">\n' +
      '  <h2>Free Tips Today</h2>\n' +
      '  <table class="table table-dark table-hover">\n' +
      '    <thead>\n' +
      '      <tr>\n' +
      '        <th>Home Team </th>\n' +
      '        <th>Away Team</th>\n' +
      '        <th>Odds</th>\n' +
      '      </tr>\n' +
      '    </thead>\n' +
      '    <tbody>\n' +
      '      <tr>\n' +
      '        <td>John</td>\n' +
      '        <td>Doe</td>\n' +
      '        <td>john@example.com</td>\n' +
      '      </tr>\n' +
      '      <tr>\n' +
      '        <td>Mary</td>\n' +
      '        <td>Moe</td>\n' +
      '        <td>mary@example.com</td>\n' +
      '      </tr>\n' +
      '      <tr>\n' +
      '        <td>July</td>\n' +
      '        <td>Dooley</td>\n' +
      '        <td>july@example.com</td>\n' +
      '      </tr>\n' +
      '    </tbody>\n' +
      '  </table>\n' +
      '</div>\n' +
      '  </div>\n' +
      '  <div class="container">\n' +
      '  <h2>Live Games</h2>\n' +
      '  <table class="table table-dark table-hover">\n' +
      '    <thead>\n' +
      '      <tr>\n' +
      '        <th>Home Team </th>\n' +
      '        <th>Away Team</th>\n' +
      '        <th>Odds</th>\n' +
      '      </tr>\n' +
      '    </thead>\n' +
      '    <tbody>\n' +
      '      <tr>\n' +
      '        <td>John</td>\n' +
      '        <td>Doe</td>\n' +
      '        <td>john@example.com</td>\n' +
      '      </tr>\n' +
      '      <tr>\n' +
      '        <td>Mary</td>\n' +
      '        <td>Moe</td>\n' +
      '        <td>mary@example.com</td>\n' +
      '      </tr>\n' +
      '      <tr>\n' +
      '        <td>July</td>\n' +
      '        <td>Dooley</td>\n' +
      '        <td>july@example.com</td>\n' +
      '      </tr>\n' +
      '    </tbody>\n' +
      '  </table>\n' +
      '</div>\n' +
      '  </div> <div class="container">' +
      '<script type="text/javascript">\' +\n' +
      '      \'var a=10; var b=20;\' +\n' +
      '      \'document.write("the sum is"+ a+b\')</script> </div>\n' +

      '<div class="container" style="background-color: #0e0e0e; width:100%;">\n' +
      '    <section style="height:80px;"></section>\n' +
      '\n' +
      '\n' +
      '    <footer class="footer-bs" style="color:#fff;">\n' +
      '        <div class="row">\n' +
      '\n' +
      '        \t<div class="col-md-4 footer-nav animated fadeInUp">\n' +
      '            \t<h4>Menu —</h4>\n' +
      '            \t<div class="col-md-6">\n' +
      '                    <ul class="pages">\n' +
      '                        <li><a href="#">Travel</a></li>\n' +
      '                        <li><a href="#">Nature</a></li>\n' +
      '                        <li><a href="#">Explores</a></li>\n' +
      '                        <li><a href="#">Science</a></li>\n' +
      '                        <li><a href="#">Advice</a></li>\n' +
      '                    </ul>\n' +
      '                </div>\n' +
      '            \t<div class="col-md-6">\n' +
      '                    <ul class="list">\n' +
      '                        <li><a href="#">About Us</a></li>\n' +
      '                        <li><a href="#">Contacts</a></li>\n' +
      '                        <li><a href="#">Terms & Condition</a></li>\n' +
      '                        <li><a href="#">Privacy Policy</a></li>\n' +
      '                    </ul>\n' +
      '                </div>\n' +
      '            </div>\n' +
      '        \t<div class="col-md-2 footer-social animated fadeInDown">\n' +
      '            \t<h4>Follow Us</h4>\n' +
      '            \t<ul>\n' +
      '                \t<li><a href="#">Facebook</a></li>\n' +
      '                \t<li><a href="#">Twitter</a></li>\n' +
      '                \t<li><a href="#">Instagram</a></li>\n' +
      '                \t<li><a href="#">RSS</a></li>\n' +
      '                </ul>\n' +
      '            </div>\n' +
      '\n' +
      '        </div>\n' +
      '    </footer>\n' +
      '    <section style="text-align:center; margin:10px auto;"><p>Boibet ©2018</a></p></section>\n' +
      '</div>\n' +
      '\n' +
      '</body>\n' +
      '</html>')
})*/

const express = require('express');
const mysql=require('mysql');
const app = express();
var con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "" ,// corresponding password
    database: "boibet"
});

var mydata;
var sql='select * from fixtures2 where htvalue<>0.00';
con.query(sql, function (err, resp) {
    if (err) throw err;
    mydata= resp;
    console.log(JSON.stringify(mydata));
})
app.set('view engine', 'pug');

//app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    var users=[{name:'Peter'},{name:'James'},{name:'John'}];
    var name='Peter';
    var name2='Ryanada';
  res.render('index', {
    title: 'Boibet', name: name, name2: name2, users:mydata
  })
});

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});