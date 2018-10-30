var MongoClient = require('mongodb').MongoClient;
var url='mongodb://127.0.0.1:27017/boibetdb';

var fixtures=[];
var ltnames=[];
var vtnames=[];
var ltscore=[];
var vtscore=[];

var today=new Date();
var yesterday = new Date(today);
yesterday.setDate(today.getDate()-1);
     month = '' + (yesterday.getMonth() + 1),
        day = '' + yesterday.getDate(),
        year = yesterday.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var date1=[year, month, day].join('-');

MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {

    var dob=db.db("boibetdb");
    var cursor = dob.collection("Fixtures"+date1).find({"flatOdds.data.market_id":1}).toArray(function (err,resp) {
        if (err) throw err;
        //fixtures= resp[1].fixture;
        console.log(resp);


       /* for (var i=0;i< 10;i++){
            ltnames[i]=fixtures[i].localTeam.data.name;
            vtnames[i]=fixtures[10].visitorTeam.data.name;
            vtscore[i]=fixtures[i].scores.visitorteam_score;
        }
        console.log(vtscore);*/
    });


});




html
    head
         block links
            link(rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css")
            link(href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet")
            link(rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css")


         block scripts
            script(src="http://code.jquery.com/jquery-1.11.1.min.js")
            script(src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js")
            script(src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js")
            script(src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js")


                    title.text-primary #{title}


    body(style={background: '#181A2C'})




        nav.navbar.navbar-default.navbar-fixed-top(style='background-color: #000;')
            .container
                .navbar-header
                    button.navbar-toggle(type='button' data-toggle='collapse' data-target='#myNavbar')
                        span.glyphicon.glyphicon-menu-hamburger
                    .navbar-left.logo
                        svg#Layer_1(version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewbox='0 0 291 385.3' style='enable-background:new 0 0 291 385.3;' xml:space='preserve')
                            style(type='text/css').
                                .st0 {
                                    fill: #000;
                                }
                            polygon.st0(points='82.1,12 7.4,138.7 38.7,237.3 ')
                            polygon.st0(points='92.7,5.3 199.4,8.7 223.4,82.7 ')
                            polygon.st0(points='89.4,8.7 223.4,86.7 42.1,237.3 ')
                            polygon.st0(points='206.1,15.3 262.7,66 228.1,82.7 ')
                            polygon.st0(points='262.7,70 228.1,86 266.4,175.3 ')
                            polygon.st0(points='228.1,92.7 262.7,179.3 173.4,328 ')
                            polygon.st0(points='223.4,92.7 44.7,240 167.7,336 ')
                            polygon.st0(points='252.1,210.3 184.4,380.3 170.7,339.7 ')
                            polygon.st0(points='60.1,260.3 167.4,341 180.4,380.3 ')



                nav.navbar.navbar-expand-sm.bg-dark.navbar-dark(style='text-align: #center; ')
                // Brand
                a.navbar-brand(href='#')(style=' color:#F5F510;') Home
                style.
                    .vl {
                        border-left: 1px solid white;
                        height: 40px;
                    }

                .vl

                a.navbar-brand(href='#')(style=' color:#F5F510;') MultiBets
                style.
                    .vl {
                        border-left: 1px solid white;
                        height: 40px;
                    }

                .vl
                a.navbar-brand(href='#')(style=' color:#F5F510;') JackPot Prediction
                style.
                    .vl {
                        border-left: 1px solid white;
                        height: 40px;
                    }

                .vl
                a.navbar-brand(href='#')(style=' color:#F5F510;') Premium Tips
                style.
                    .vl {
                        border-left: 1px solid white;
                        height: 40px;
                    }

                .vl
                a.navbar-brand(href='#')(style=' color:#F5F510;') Tipstars
                style.
                    .vl {
                        border-left: 1px solid white;
                        height: 40px;
                    }

                .vl
                a.navbar-brand(href='#')(style=' color:#F5F510;') Statistics



        div.container
            div.row
                div.col-md-2
                    h3(style="margin-left:20px; color: yellow") Leagues

                    table(class="table table-dark table-hover " style="margin-left:20px")
                        each league in leagues
                            tr
                                td !{league.name}

                div.col-md-8(style="margin-left: 30px")
                    h3(style={color: '#fff'}) Premier League Fixtures
                        table(class="table table-dark table-hover")
                            tr
                                th
                                th
                                th
                                th Home
                                th Draw
                                th Away

                            each user in users
                                tr
                                    td !{user.date}
                                    td !{user.localteam}
                                    td !{user.visitorteam}
                                    td !{user.htvalue}
                                    td !{user.drawvalue}
                                    td !{user.vtvalue}

                    h3(style={color: '#fff'})  League One Fixtures
                        table(class="table table-dark table-hover")
                            tr
                                th
                                th
                                th
                                th Home
                                th Draw
                                th Away
                            each leagues in leagueone
                                tr
                                    td !{leagues.date}
                                    td !{leagues.localteam}
                                    td !{leagues.visitorteam}
                                    td !{leagues.htvalue}
                                    td !{leagues.drawvalue}
                                    td !{leagues.vtvalue}

                .container(style='background-color: #0e0e0e; width:100%;')
                    footer#fh5co-footer.fh5co-bg(role='contentinfo')
                        .overlay
                        .container
                            .row.row-pb-md
                                .col-md-4.fh5co-widget(style='color: #fff; ')
                                    h3 A Little About Boibet
                                    p
                                        | Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit. Eos cumque dicta adipisci architecto culpa amet.
                                    p
                                        a.btn.btn-primary(href='#') Become A Member
                                .col-md-8
                                    h3 Classes
                                    .col-md-4.col-sm-4.col-xs-6(style='color: #fff; font-size:15px;')
                                        ul.fh5co-footer-links(style='color: #B1B1A1; ')
                                            li
                                                a(href='#') Home
                                            li
                                                a(href='#') Help
                                            li
                                                a(href='#') Pricing plan
                                            li
                                                a(href='#') Terms%conditions

                                    .col-md-4.col-sm-4.col-xs-6(style='color: #fff; font-size:15px;')
                                        ul.fh5co-footer-links
                                            li
                                                a(href='#') How to pay
                                            li
                                                a(href='#') Contact
                                            li
                                                a(href='#') About us
                                            li
                                                a(href='#') FAQ

                                    .col-md-4.col-sm-4.col-xs-6(style='color: #fff; font-size:15px;')
                                        ul.fh5co-footer-links
                                            li
                                                a(href='#') Mail update
                                            li
                                                a(href='#') Sms update
                                            li
                                                a(href='#') Tipstars
                                            li
                                                a(href='#') Blog

                            .row.copyright
                                .col-md-12.text-center
                                    p(style='color:#fff; font-size:10px;')
                                        small.block &copy; 2018 | All Rights Reserved.
                                        small.block Powered by  Boibet.com

extends header.pug
block content
     div.container
           div.row
                     div.col-md-8(style="margin-left: 30px")
                                    h3(style={color:'#fff'}) Premier League Fixtures
                                      table(class="table table-dark table-hover")
                                          tr
                                            th
                                            th
                                            th
                                            th Home
                                            th Draw
                                            th Away

                                          each user in users
                                           tr
                                                td !{user.date}
                                                td !{user.localteam}
                                                td !{user.visitorteam}
                                                td !{user.htvalue}
                                                td !{user.drawvalue}
                                                td !{user.vtvalue}

                                    h3(style={color:'#fff'})  League One Fixtures
                                        table(class="table table-dark table-hover")
                                            tr
                                                th
                                                th
                                                th
                                                th Home
                                                th Draw
                                                th Away
                                            each leagues in leagueone
                                             tr
                                                 td !{leagues.date}
                                                 td !{leagues.localteam}
                                                 td !{leagues.visitorteam}
                                                 td !{leagues.htvalue}
                                                 td !{leagues.drawvalue}
                                                 td !{leagues.vtvalue}
                     div.col-md-3
                         img(src='ball.jpg')




