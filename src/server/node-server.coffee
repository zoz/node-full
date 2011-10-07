microtime = require('microtime')
async = require('async')
rl = require("redis")
redis = rl.createClient('/tmp/redis.sock')
express = require('express')
app = express.createServer()

require.paths.unshift "#{__dirname}"
app.use express.static("build/client")
app.use express.static("vendor")

app.use express.bodyParser()

doTests = true
doZepto = false

redis.on "error", (err) ->
  console.log "Zoz Redis Error " + err

bug =
  log: (msg) ->
    console.log msg

er =
  log: (msg) ->
    console.log msg


redis.flushall()
redis.set "test:phone", "415-444-0000"

app.get '/', (req, res) ->
  start = microtime.now()
  redis.get "test:phone", (err, phone) ->
    res.send layoutSimple("Reiss", phone)
    end = microtime.now()
    bug.log end - start

aGlobalVar = 'global'

# keep this log message so that our ops scripts can detect when node has started
console.log 'node started\n'

app.listen 3000

subTemplate = (phone) -> """  
<div>Phone: #{phone}</div>
"""

# QUnit test output frame stuff
#<h1 id="qunit-header">QUnit example</h1>
#<h2 id="qunit-banner"></h2>
#<div id="qunit-testrunner-toolbar"></div>
#<h2 id="qunit-userAgent"></h2>
testTempl = () -> '''  
  <ol id="qunit-tests"></ol>
  <div id="qunit-fixture">test markup, will be hidden</div>
'''

testScriptTempl = () -> '''  
  <script type="text/javascript" src="synzoz-oct-4-11.js"></script>
  <script type="text/javascript" src="qunit-oct-4-11.js"></script>
'''

zeptoOrjQuery = () ->
  if (doZepto)
    return '<script type="text/javascript" src="zepto-oct-4-11.js"></script>'
  else
    return '<script type="text/javascript" src="jquery-1.7b1.js"></script>'

layoutSimple = (lastname, phone) -> """  
<html>
<head>
  <link rel="stylesheet" href="qunit.css" type="text/css" media="screen" />
  #{zeptoOrjQuery()}
  <script type="text/javascript" src="jquery.dateFormat-1.0-oct-4-11.js"></script>
  <script type="text/javascript" src="full-client.js"></script>
  #{testScriptTempl() if doTests }
  <script type="text/javascript">
    $(document).ready(function() {
      window.runclient(#{doTests});
    });
  </script>
</head>
<body>

<div style="width: 100%;">
  <div>
    Full Node Template
  </div>
  <div id='testDiv'>
    should be replaced
  </div>
  <textarea id='tarea'>Default Text</textarea>
  #{subTemplate(phone)}
  #{aGlobalVar + ' ' + lastname}
  #{testTempl() if doTests}
</div>
</body>
</html>
"""
