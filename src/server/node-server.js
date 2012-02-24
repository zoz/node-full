(function() {
  var H, Html, L, P, PageTemplates, ZozLog, aGlobalVar, app, async, bug, doTests, doZepto, err, express, h, layoutSimple, layoutTest, microtime, printLog, redis, reduceAttr, subTemplate, testScriptTempl, testTempl, zeptoOrjQuery,
    __slice = Array.prototype.slice;

  require('bs');

  microtime = require('microtime');

  async = require('async');

  redis = require('redis').createClient('/tmp/redis.sock');

  express = require('express');

  app = express.createServer();

  app.use(express.static("build/client"));

  app.use(express.static("vendor"));

  app.use(express.bodyParser());

  doTests = true;

  doZepto = false;

  redis.on("error", function(err) {
    return console.log("Zoz Redis Error " + err);
  });

  bug = {
    log: function(msg) {
      return console.log(msg);
    }
  };

  err = {
    log: function(msg) {
      return console.log(msg);
    }
  };

  redis.flushall();

  redis.set("test:phone", "415-444-0000");

  reduceAttr = function(attrObj) {
    var a, k, v;
    a = (function() {
      var _results;
      _results = [];
      for (k in attrObj) {
        v = attrObj[k];
        _results.push("" + k + "='" + v + "'");
      }
      return _results;
    })();
    return a.join(', ');
  };

  h = function(txt) {
    return String(txt).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  Html = (function() {

    function Html() {}

    Html.prototype.createTag = function() {
      var args, attr, content, res, tagName;
      tagName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      attr = "";
      if (typeof args[0] === 'object') {
        attr = ' ' + reduceAttr(args[0]);
        content = args[1];
      } else {
        content = args[0];
      }
      if (typeof content === 'undefined') {
        res = '';
      } else if (typeof content === 'function') {
        res = content();
      } else {
        res = String(content);
      }
      return "<" + tagName + attr + ">" + res + "</" + tagName + ">";
    };

    Html.prototype.div = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.createTag.apply(this, ["div"].concat(__slice.call(args)));
    };

    Html.prototype.ol = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.createTag.apply(this, ["ol"].concat(__slice.call(args)));
    };

    Html.prototype.script = function(source) {
      return "<script type='text/javascript' src='" + source + "'></script>";
    };

    Html.prototype.tbox = function(attr2, content) {
      return "<input type='text' value='" + content + "' " + (reduceAttr(attr2)) + " />";
    };

    return Html;

  })();

  H = new Html;

  PageTemplates = (function() {

    function PageTemplates() {}

    PageTemplates.prototype.boo_bar = function(x) {
      return H.div({
        "class": "barky",
        id: "392"
      }, function() {
        return H.tbox({
          id: "t1",
          name: "t1"
        }, "Go Juice") + H.tbox({
          id: "t2",
          name: 't2'
        }, "Go Maxi") + H.div({
          "class": "foodog"
        }, function() {
          return 5 + 7 + x;
        });
      });
    };

    return PageTemplates;

  })();

  P = new PageTemplates;

  app.get('/', function(req, res) {
    var start;
    start = microtime.now();
    return redis.get("test:phone", function(err, phone) {
      var end;
      res.send(layoutSimple("Magic Muffin & Me", "415"));
      end = microtime.now();
      return bug.log(end - start);
    });
  });

  app.get('/test', function(req, res) {
    return res.send(layoutTest());
  });

  aGlobalVar = 'global';

  console.log('node started\n');

  ZozLog = (function() {

    function ZozLog() {
      this.arr = [];
    }

    ZozLog.prototype.log = function(str) {
      console.log(str);
      return this.arr.push(str);
    };

    ZozLog.prototype.toHtml = function() {
      var l, res, _i, _len, _ref, _results;
      res = '';
      _ref = this.arr;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        l = _ref[_i];
        _results.push(res = res + h(l) + '<br />');
      }
      return _results;
    };

    return ZozLog;

  })();

  L = new ZozLog;

  app.listen(3000);

  subTemplate = function(phone) {
    return H.div({
      style: 'color: red;'
    }, function() {
      return phone;
    });
  };

  printLog = function() {
    return H.div({
      style: 'background-color: #eeeeee; position: absolute; width: 500px; right: 0px; bottom: 0px;'
    }, function() {
      return L.toHtml();
    });
  };

  testTempl = function() {
    return H.div({
      style: "position: absolute; right: 0px; top: 0px;"
    }, function() {
      return H.div({
        id: "qunit-testrunner-toolbar"
      }) + H.ol({
        id: "qunit-tests"
      }) + H.div({
        id: "qunit-fixture"
      }, "test markup, will be hidden");
    });
  };

  testScriptTempl = function() {
    return H.script("syn.js") + H.script("qunit-feb-18.js");
  };

  zeptoOrjQuery = function() {
    if (doZepto) {
      L.log("doing zepto");
      return H.script("zepto-oct-4-11.js");
    } else {
      L.log("doing jquery");
      return H.script("jquery-1.7.2b1.js");
    }
  };

  layoutTest = function() {
    return "  \n<html>\n<head>\n  <title>Node Test</title>\n  <link rel=\"stylesheet\" href=\"reset.css\" type=\"text/css\" media=\"screen\" />\n  <link rel=\"stylesheet\" href=\"zozdesktop.css\" type=\"text/css\" media=\"screen\" />\n  <style>\n    #dragMe { width: 100px; height: 100px; }\n  	#droppable { width: 150px; height: 150px; }\n    .zoz-box {border:1px solid black;}\n  </style>\n  " + (zeptoOrjQuery()) + "\n  <script type=\"text/javascript\" src=\"zozlib.js\"></script>\n  <script type=\"text/javascript\" src=\"full-client.js\"></script>\n  <script type=\"text/javascript\">\n    $(document).ready(function() {\n      window.runtest();\n    });\n  </script>\n</head>\n<body>\n<div id=\"container\" style=\"margin: 50px; left: 100px; \">\n  <div id=\"dragMe\" class=\"zoz-box grab\" style=\"position: relative;\">\n    <p>Barf</p>\n  </div>\n  <div style=\"margin: 30px; padding: 10px;\">\n  <div id=\"droppable\" class=\"zoz-box drop\">\n    Drop Target\n  </div>\n  </div>\n</div>\n</body>\n</html>";
  };

  layoutSimple = function(lastname, phone) {
    return "  \n<html>\n<head>\n  <link rel=\"stylesheet\" href=\"qunit.css\" type=\"text/css\" media=\"screen\" />\n  <link rel=\"stylesheet\" href=\"zozdesktop.css\" type=\"text/css\" media=\"screen\" />\n  <link rel=\"stylesheet\" href=\"smoothness/jquery-ui-1.8.16.custom.css\" type=\"text/css\" media=\"screen\" />\n  <style>\n    #dragMe { width: 100px; height: 100px; padding: 0.5em; float: left; margin: 10px 10px 10px 0; }\n  	#droppable { width: 150px; height: 150px; padding: 0.5em; float: left; margin: 10px; }\n  </style>\n  " + (zeptoOrjQuery()) + "\n  <script type=\"text/javascript\" src=\"jquery.dateFormat-1.0-oct-4-11.js\"></script>\n  <script type=\"text/javascript\" src=\"jquery-ui-1.8.16.custom.min.js\"></script>\n  <script type=\"text/javascript\" src=\"full-client.js\"></script>\n  " + (doTests ? testScriptTempl() : void 0) + "\n  <script type=\"text/javascript\">\n    $(document).ready(function() {\n      window.runclient(" + doTests + ");\n    });\n  </script>\n</head>\n<body>\n<div id=\"dragMe\" class=\"ui-widget-content\">\n  Barf\n</div>\n<div id=\"droppable\" class=\"ui-widget-content\">Drop Target</div>\n\n<div style=\"width: 100%; clear: both;\">\n  <div id=\"fullnode\" >\n    Full Node Template, " + (P.boo_bar(100)) + "\n  </div>\n  <div id='testDiv'>\n    should be replaced\n  </div>\n  <textarea id='tarea'>Default Text</textarea>\n  " + (subTemplate(phone)) + "\n  " + (aGlobalVar + ' ' + lastname) + "\n  <div>\n    " + (printLog()) + "\n  </div>\n  " + (doTests ? testTempl() : void 0) + "\n</div>\n</body>\n</html>";
  };

}).call(this);
