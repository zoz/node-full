microtime = require('microtime')
async     = require('async')
express   = require('express')
app       = express.createServer()

#redis    = require('redis').createClient('/tmp/redis.sock')
H = require('../../build/server/htmlbuilder').H

app.use express.static("build/client")
app.use express.static("vendor")
app.use express.bodyParser()

doTests = true

#redis.on "error", (err) ->
  #console.log "Zoz Redis Error " + err

#redis.flushall()
#redis.set "test:phone", "415-444-0000"

bug =
  log: (msg) ->
    console.log msg

err =
  log: (msg) ->
    console.log msg

class ZozLog
  constructor: ->
    @arr = []

  log: (str) ->
    console.log str
    @arr.push(str)

  toHtml: () ->
    res = ''
    for l in @arr
      res = res + l + '<br />'
      #RWR above l should be html escaped


extend = (obj, mixin) ->
  obj[name] = method for name, method of mixin
  obj

include = (klass, mixin) ->
  extend klass.prototype, mixin

doZepto = false

class TestHtml

  testTempl: () -> 
    H.div {id: "mocha", style: "position: absolute; bottom: 0px; right: 0px;"}

  testScriptTempl: () ->
    "<script>mocha.setup('bdd')</script>" +
    H.script("syn.js")

  zeptoOrjQuery: () ->
    if (doZepto)
      H.script "zepto-oct-4-11.js"
    else  
      H.script "jquery-1.7.2b1.js"

  boo_bar: (x) =>
    (H.div -> "GOT IT!!!!") +
    H.div =>
      H.tbox({id: "t1", name: "t1"}, "Go Juice") +
      H.tbox({id: "t2", name: 't2'}, "Go Maxi" ) +
      H.div {class: "foodog"}, =>
        7 + 7 + x

  subTemplate: (phone) ->
    H.div {style: 'color: red;'}, =>
      phone

  layoutSimple: (lastname, phone) -> """  
    <html>
    <head>
      <title>Node Test5</title>
      <link rel="stylesheet" href="mocha.css" type="text/css" media="screen" />
      <link rel="stylesheet" href="zozdesktop.css" type="text/css" media="screen" />
      <link rel="stylesheet" href="smoothness/jquery-ui-1.8.16.custom.css" type="text/css" media="screen" />
      <style>
        #dragMe { width: 100px; height: 100px; padding: 0.5em; float: left; margin: 10px 10px 10px 0; }
        #droppable { width: 150px; height: 150px; padding: 0.5em; float: left; margin: 10px; }
      </style>
      #{@zeptoOrjQuery()}
      <script type="text/javascript" src="jquery.dateFormat-1.0-Feb-24-2012.js"></script>
      <script type="text/javascript" src="jquery-ui-1.8.16.custom.min.js"></script>
      <script type="text/javascript" src="chai.js"></script>
      <script type="text/javascript" src="mocha.js"></script>
      <script type="text/javascript" src="full-client.js"></script>
      #{@testScriptTempl() if doTests }
      <script type="text/javascript">
        $(document).ready(function() {
          mocha.run().globals(['hour', 'minute', 'second', '__synthTest']);
          window.runclient(#{doTests});
        });
      </script>
      <script type="text/javascript" src="browser.js"></script>
    </head>
    <body>
    <div id="dragMe" class="ui-widget-content">
      Love and Energy
    </div>
    <div id="droppable" class="ui-widget-content">Drop Target</div>
    <div style="width: 100%; clear: both;">
      <div id="fullnode" >
        Full Node Template, #{@boo_bar(100)}
      </div>
      <div id='testDiv'>
        should be replaced
      </div>
      <textarea id='tarea'>initial text</textarea>
      #{@subTemplate(phone)}
      #{lastname}
      #{@testTempl() if doTests}
    </div>
    </body>
    </html>
  """

  layoutTest: () -> """  
  <html>
  <head>
    <title>Node Test</title>
    <link rel="stylesheet" href="reset.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="zozdesktop.css" type="text/css" media="screen" />
    <style>
      #dragMe { width: 100px; height: 100px; }
      #droppable { width: 150px; height: 150px; }
      .zoz-box {border:1px solid black;}
    </style>
    #{@zeptoOrjQuery()}
    <script type="text/javascript" src="zozlib.js"></script>
    <script type="text/javascript" src="full-client.js"></script>
    <script type="text/javascript">
      $(document).ready(function() {
        window.runtest();
      });
    </script>
  </head>
  <body>
  <div id="container" style="margin: 50px; left: 100px; ">
    <div id="dragMe" class="zoz-box grab" style="position: relative;">
      <p>Positive Love</p>
    </div>
    <div style="margin: 30px; padding: 10px;">
    <div id="droppable" class="zoz-box drop">
      Drop Target
    </div>
    </div>
  </div>
  </body>
  </html>
  """

htmlBasic = () ->
  H.html ->
    H.head( ->
      H.link('mocha.css') +
      H.script('zepto-oct-4-11.js') +
      #H.script("jquery-1.7.2b1.js") +
      H.script('jquery.dateFormat-1.0-Feb-24-2012.js') +
      H.script('chai.js') +
      H.script('mocha.js') +
      H.script('browser.js')
    ) +
    H.body ->
      H.div({id: 'basicDiv'}, "Basic Html Layout") +
      H.div(H.span("Escaped content: ") + H.span(H.esc "<div id=\"id1\" class='c1'>One & Two</div>")) +
      H.div {id: "mocha", style: "position: absolute; bottom: 0px; right: 0px;"}

app.get '/', (req, res) ->
  start = microtime.now()
  L = new ZozLog
  testHtml = new TestHtml

  res.send testHtml.layoutSimple("Magic Muffin & Me", "415")
  #redis.get "test:phone", (err, phone) ->
    ##res.send testHtml.layoutTest()
    #end = microtime.now()
    #bug.log end - start

app.get '/test', (req, res) ->
  res.send layoutTest()

app.get '/basic', (req, res) ->
  res.send htmlBasic()

# keep this log message so that our ops scripts can detect when node has started
console.log 'node started\n'

app.listen 3000



    #<script type="text/javascript" src="drag-drop.js"></script>
    #<script type="text/javascript" src="jquery-ui-1.8.16.custom.min.js"></script>
    #<div id="container" style="margin: 25px; left: 100px; position: absolute;">

  #<script type="text/javascript" src="jquery.ui.core.js"></script>
  #<script type="text/javascript" src="jquery.ui.widget.js"></script>
  #<script type="text/javascript" src="jquery.ui.mouse.js"></script>
  #<script type="text/javascript" src="jquery.ui.draggable.js"></script>
  #<script type="text/javascript" src="jquery.ui.droppable.js"></script>
  #<link rel="stylesheet" href="smoothness/jquery-ui-1.8.16.custom.css" type="text/css" media="screen" />


