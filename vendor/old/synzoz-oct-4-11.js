(function(){var f=function(k,a){for(var b in a)k[b]=a[b];return k},j={msie:!(!window.attachEvent||window.opera),opera:!!window.opera,webkit:navigator.userAgent.indexOf("AppleWebKit/")>-1,safari:navigator.userAgent.indexOf("AppleWebKit/")>-1&&navigator.userAgent.indexOf("Chrome/")===-1,gecko:navigator.userAgent.indexOf("Gecko")>-1,mobilesafari:!!navigator.userAgent.match(/Apple.*Mobile.*Safari/),rhino:navigator.userAgent.match(/Rhino/)&&true},m=function(k,a,b){k=b.ownerDocument.createEventObject();
return f(k,a)},h={},i=1,a="_synthetic"+(new Date).getTime(),b,d,e=/keypress|keyup|keydown/,c=/load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll/,l,g=function(k,a,b,e){return new g.init(k,a,b,e)};b=function(k,a,b){return k.addEventListener?k.addEventListener(a,b,false):k.attachEvent("on"+a,b)};d=function(k,a,b){return k.addEventListener?k.removeEventListener(a,b,false):k.detachEvent("on"+a,b)};f(g,{init:function(k,a,b,e){var c=g.args(a,b,e),d=this;this.queue=[];this.element=
c.element;if(typeof this[k]==="function")this[k](c.options,c.element,function(k,a){c.callback&&c.callback.apply(d,arguments);d.done.apply(d,arguments)});else this.result=g.trigger(k,c.options,c.element),c.callback&&c.callback.call(this,c.element,this.result)},jquery:function(k){return window.FuncUnit&&window.FuncUnit.jquery?window.FuncUnit.jquery:k?g.helpers.getWindow(k).jQuery||window.jQuery:window.jQuery},args:function(){for(var k={},a=0;a<arguments.length;a++)if(typeof arguments[a]==="function")k.callback=
arguments[a];else if(arguments[a]&&arguments[a].jquery)k.element=arguments[a][0];else if(arguments[a]&&arguments[a].nodeName)k.element=arguments[a];else if(k.options&&typeof arguments[a]==="string")k.element=document.getElementById(arguments[a]);else if(arguments[a])k.options=arguments[a];return k},click:function(a,b,e){g("click!",a,b,e)},defaults:{focus:function(){if(!g.support.focusChanges){var a=this,e=a.nodeName.toLowerCase();g.data(a,"syntheticvalue",a.value);(e==="input"||e==="textarea")&&b(a,
"blur",function(){g.data(a,"syntheticvalue")!=a.value&&g.trigger("change",{},a);d(a,"blur",arguments.callee)})}},submit:function(){g.onParents(this,function(a){if(a.nodeName.toLowerCase()==="form")return a.submit(),false})}},changeOnBlur:function(a,e,c){b(a,"blur",function(){c!==a[e]&&g.trigger("change",{},a);d(a,"blur",arguments.callee)})},closest:function(a,b){for(;a&&a.nodeName.toLowerCase()!==b.toLowerCase();)a=a.parentNode;return a},data:function(b,e,c){b[a]||(b[a]=i++);h[b[a]]||(h[b[a]]={});
if(c)h[b[a]][e]=c;else return h[b[a]][e]},onParents:function(a,b){for(var e;a&&e!==false;)e=b(a),a=a.parentNode;return a},focusable:/^(a|area|frame|iframe|label|input|select|textarea|button|html|object)$/i,isFocusable:function(a){var b;return(this.focusable.test(a.nodeName)||(b=a.getAttributeNode("tabIndex"))&&b.specified)&&g.isVisible(a)},isVisible:function(a){return a.offsetWidth&&a.offsetHeight||a.clientWidth&&a.clientHeight},tabIndex:function(a){var b=a.getAttributeNode("tabIndex");return b&&
b.specified&&(parseInt(a.getAttribute("tabIndex"))||0)},bind:b,unbind:d,browser:j,helpers:{createEventObject:m,createBasicStandardEvent:function(a,b,e){var c;try{c=e.createEvent("Events")}catch(g){c=e.createEvent("UIEvents")}finally{c.initEvent(a,true,true),f(c,b)}return c},inArray:function(a,b){for(var e=0;e<b.length;e++)if(b[e]===a)return e;return-1},getWindow:function(a){return a.ownerDocument.defaultView||a.ownerDocument.parentWindow},extend:f,scrollOffset:function(a,b){var e=a.document.documentElement,
c=a.document.body;if(b)window.scrollTo(b.left,b.top);else return{left:(e&&e.scrollLeft||c&&c.scrollLeft||0)+(e.clientLeft||0),top:(e&&e.scrollTop||c&&c.scrollTop||0)+(e.clientTop||0)}},scrollDimensions:function(a){var b=a.document.documentElement,e=a.document.body,c=b.clientWidth,b=b.clientHeight,a=a.document.compatMode==="CSS1Compat";return{height:a&&b||e.clientHeight||b,width:a&&c||e.clientWidth||c}},addOffset:function(a,b){var e=g.jquery(b);if(typeof a==="object"&&a.clientX===void 0&&a.clientY===
void 0&&a.pageX===void 0&&a.pageY===void 0&&e)b=e(b),e=b.offset(),a.pageX=e.left+b.width()/2,a.pageY=e.top+b.height()/2}},key:{ctrlKey:null,altKey:null,shiftKey:null,metaKey:null},dispatch:function(a,e,c,g){if(e.dispatchEvent&&a){var l=a.preventDefault,h=g?-1:0;g&&b(e,c,function(a){a.preventDefault();d(this,c,arguments.callee)});a.preventDefault=function(){h++;++h>0&&l.apply(this,[])};e.dispatchEvent(a);return h<=0}else{try{window.event=a}catch(f){}return e.sourceIndex<=0||e.fireEvent&&e.fireEvent("on"+
c,a)}},create:{page:{event:function(a,b,e){var c=g.helpers.getWindow(e).document||document,d;if(c.createEvent)d=c.createEvent("Events"),d.initEvent(a,true,true);else try{d=m(a,b,e)}catch(l){}return d}},focus:{event:function(a,b,e){g.onParents(e,function(a){if(g.isFocusable(a)){if(a.nodeName.toLowerCase()!=="html")a.focus(),l=a;else if(l)a=g.helpers.getWindow(e).document,a===window.document&&(a.activeElement?a.activeElement.blur():l.blur(),l=null);return false}});return true}}},support:{clickChanges:false,
clickSubmits:false,keypressSubmits:false,mouseupSubmits:false,radioClickChanges:false,focusChanges:false,linkHrefJS:false,keyCharacters:false,backspaceWorks:false,mouseDownUpClicks:false,tabKeyTabs:false,keypressOnAnchorClicks:false,optionClickBubbles:false,ready:0},trigger:function(a,b,d){b||(b={});var l=g.create,h=l[a]&&l[a].setup,f=e.test(a)?"key":c.test(a)?"page":"mouse",i=l[a]||{},f=l[f],l=d;g.support.ready===2&&h&&h(a,b,d);h=b._autoPrevent;delete b._autoPrevent;if(i.event)i=i.event(a,b,d);else{b=
f.options?f.options(a,b,d):b;if(!g.support.changeBubbles&&/option/i.test(d.nodeName))l=d.parentNode;i=f.event(a,b,l);i=g.dispatch(i,l,a,h)}i&&g.support.ready===2&&g.defaults[a]&&g.defaults[a].call(d,b,h);return i},eventSupported:function(a){var b=document.createElement("div"),a="on"+a,e=a in b;e||(b.setAttribute(a,"return;"),e=typeof b[a]==="function");return e}});f(g.init.prototype,{then:function(a,b,e,c){g.autoDelay&&this.delay();var d=g.args(b,e,c),l=this;this.queue.unshift(function(b){if(typeof this[a]===
"function")this.element=d.element||b,this[a](d.options,this.element,function(a,b){d.callback&&d.callback.apply(l,arguments);l.done.apply(l,arguments)});else return this.result=g.trigger(a,d.options,d.element),d.callback&&d.callback.call(this,d.element,this.result),this});return this},delay:function(a,b){typeof a==="function"&&(b=a,a=null);var a=a||600,e=this;this.queue.unshift(function(){setTimeout(function(){b&&b.apply(e,[]);e.done.apply(e,arguments)},a)});return this},done:function(a,b){b&&(this.element=
b);this.queue.length&&this.queue.pop().call(this,this.element,a)},_click:function(a,b,e,c){g.helpers.addOffset(a,b);g.trigger("mousedown",a,b);setTimeout(function(){g.trigger("mouseup",a,b);!g.support.mouseDownUpClicks||c?(g.trigger("click",a,b),e(true)):(g.create.click.setup("click",a,b),g.defaults.click.call(b),setTimeout(function(){e(true)},1))},1)},_rightClick:function(a,b,e){g.helpers.addOffset(a,b);var c=f(f({},g.mouse.browser.right.mouseup),a);g.trigger("mousedown",c,b);setTimeout(function(){g.trigger("mouseup",
c,b);g.mouse.browser.right.contextmenu&&g.trigger("contextmenu",f(f({},g.mouse.browser.right.contextmenu),a),b);e(true)},1)},_dblclick:function(a,b,e){g.helpers.addOffset(a,b);var c=this;this._click(a,b,function(){setTimeout(function(){c._click(a,b,function(){g.trigger("dblclick",a,b);e(true)},true)},2)})}});for(var j="click,dblclick,move,drag,key,type,rightClick".split(","),v=function(a){g[a]=function(b,e,c){return g("_"+a,b,e,c)};g.init.prototype[a]=function(b,e,c){return this.then("_"+a,b,e,c)}},
r=0;r<j.length;r++)v(j[r]);if(window.jQuery||window.FuncUnit&&window.FuncUnit.jquery)(window.FuncUnit&&window.FuncUnit.jquery||window.jQuery).fn.triggerSyn=function(a,b,e){g(a,b,this[0],e);return this};window.Syn=g})();(function(){var f=Syn.helpers,j=f.getWindow;Syn.mouse={};f.extend(Syn.defaults,{mousedown:function(){Syn.trigger("focus",{},this)},click:function(){var f=Syn.data(this,"radioChanged"),h=j(this),i=this.nodeName.toLowerCase();if(!Syn.support.linkHrefJS&&/^\s*javascript:/.test(this.href)){var a=this.href.replace(/^\s*javascript:/,"");a!="//"&&a.indexOf("void(0)")==-1&&(window.selenium?eval("with(selenium.browserbot.getCurrentWindow()){"+a+"}"):eval("with(scope){"+a+"}"))}if(!Syn.support.clickSubmits&&
i=="input"&&this.type=="submit"||i=="button")(a=Syn.closest(this,"form"))&&Syn.trigger("submit",{},a);if(i=="a"&&this.href&&!/^\s*javascript:/.test(this.href))h.location.href=this.href;i=="input"&&this.type=="checkbox"&&(Syn.support.clickChanges||Syn.trigger("change",{},this));i=="input"&&this.type=="radio"&&f&&!Syn.support.radioClickChanges&&Syn.trigger("change",{},this);i=="option"&&Syn.data(this,"createChange")&&(Syn.trigger("change",{},this.parentNode),Syn.data(this,"createChange",false))}});
f.extend(Syn.create,{mouse:{options:function(j,h){var i=document.documentElement,a=document.body,b=[h.pageX||0,h.pageY||0],d=Syn.mouse.browser&&Syn.mouse.browser.left[j],e=Syn.mouse.browser&&Syn.mouse.browser.right[j];return f.extend({bubbles:true,cancelable:true,view:window,detail:1,screenX:1,screenY:1,clientX:h.clientX||b[0]-(i&&i.scrollLeft||a&&a.scrollLeft||0)-(i.clientLeft||0),clientY:h.clientY||b[1]-(i&&i.scrollTop||a&&a.scrollTop||0)-(i.clientTop||0),ctrlKey:!!Syn.key.ctrlKey,altKey:!!Syn.key.altKey,
shiftKey:!!Syn.key.shiftKey,metaKey:!!Syn.key.metaKey,button:d&&d.button!=null?d.button:e&&e.button||(j=="contextmenu"?2:0),relatedTarget:document.documentElement},h)},event:function(m,h,i){var a=j(i).document||document;if(a.createEvent){var b;try{b=a.createEvent("MouseEvents"),b.initMouseEvent(m,h.bubbles,h.cancelable,h.view,h.detail,h.screenX,h.screenY,h.clientX,h.clientY,h.ctrlKey,h.altKey,h.shiftKey,h.metaKey,h.button,h.relatedTarget)}catch(d){b=f.createBasicStandardEvent(m,h,a)}b.synthetic=true}else try{b=
f.createEventObject(m,h,i)}catch(e){}return b}},click:{setup:function(f,h,i){h=i.nodeName.toLowerCase();if(!Syn.support.clickChecks&&!Syn.support.changeChecks&&h==="input"){f=i.type.toLowerCase();if(f==="checkbox")i.checked=!i.checked;if(f==="radio"&&!i.checked){try{Syn.data(i,"radioChanged",true)}catch(a){}i.checked=true}}h=="a"&&i.href&&!/^\s*javascript:/.test(i.href)&&Syn.data(i,"href",i.href);if(/option/i.test(i.nodeName)){f=i.parentNode.firstChild;for(h=-1;f;){if(f.nodeType==1&&(h++,f==i))break;
f=f.nextSibling}if(h!==i.parentNode.selectedIndex)i.parentNode.selectedIndex=h,Syn.data(i,"createChange",true)}}},mousedown:{setup:function(f,h,i){f=i.nodeName.toLowerCase();if(Syn.browser.safari&&(f=="select"||f=="option"))h._autoPrevent=true}}});(function(){if(document.body){var f=window.__synthTest;window.__synthTest=function(){Syn.support.linkHrefJS=true};var h=document.createElement("div"),i,a,b,d;h.innerHTML="<form id='outer'><input name='checkbox' type='checkbox'/><input name='radio' type='radio' /><input type='submit' name='submitter'/><input type='input' name='inputter'/><input name='one'><input name='two'/><a href='javascript:__synthTest()' id='synlink'></a><select><option></option></select></form>";
document.documentElement.appendChild(h);b=h.firstChild;i=b.childNodes[0];a=b.childNodes[2];d=b.getElementsByTagName("select")[0];i.checked=false;i.onchange=function(){Syn.support.clickChanges=true};Syn.trigger("click",{},i);Syn.support.clickChecks=i.checked;i.checked=false;Syn.trigger("change",{},i);Syn.support.changeChecks=i.checked;b.onsubmit=function(a){a.preventDefault&&a.preventDefault();Syn.support.clickSubmits=true;return false};Syn.trigger("click",{},a);b.childNodes[1].onchange=function(){Syn.support.radioClickChanges=
true};Syn.trigger("click",{},b.childNodes[1]);Syn.bind(h,"click",function(){Syn.support.optionClickBubbles=true;Syn.unbind(h,"click",arguments.callee)});Syn.trigger("click",{},d.firstChild);Syn.support.changeBubbles=Syn.eventSupported("change");h.onclick=function(){Syn.support.mouseDownUpClicks=true};Syn.trigger("mousedown",{},h);Syn.trigger("mouseup",{},h);document.documentElement.removeChild(h);window.__synthTest=f;Syn.support.ready++}else setTimeout(arguments.callee,1)})()})();(function(){Syn.key.browsers={webkit:{prevent:{keyup:[],keydown:["char","keypress"],keypress:["char"]},character:{keydown:[0,"key"],keypress:["char","char"],keyup:[0,"key"]},specialChars:{keydown:[0,"char"],keyup:[0,"char"]},navigation:{keydown:[0,"key"],keyup:[0,"key"]},special:{keydown:[0,"key"],keyup:[0,"key"]},tab:{keydown:[0,"char"],keyup:[0,"char"]},"pause-break":{keydown:[0,"key"],keyup:[0,"key"]},caps:{keydown:[0,"key"],keyup:[0,"key"]},escape:{keydown:[0,"key"],keyup:[0,"key"]},"num-lock":{keydown:[0,
"key"],keyup:[0,"key"]},"scroll-lock":{keydown:[0,"key"],keyup:[0,"key"]},print:{keyup:[0,"key"]},"function":{keydown:[0,"key"],keyup:[0,"key"]},"\r":{keydown:[0,"key"],keypress:["char","key"],keyup:[0,"key"]}},gecko:{prevent:{keyup:[],keydown:["char"],keypress:["char"]},character:{keydown:[0,"key"],keypress:["char",0],keyup:[0,"key"]},specialChars:{keydown:[0,"key"],keypress:[0,"key"],keyup:[0,"key"]},navigation:{keydown:[0,"key"],keypress:[0,"key"],keyup:[0,"key"]},special:{keydown:[0,"key"],keyup:[0,
"key"]},"\t":{keydown:[0,"key"],keypress:[0,"key"],keyup:[0,"key"]},"pause-break":{keydown:[0,"key"],keypress:[0,"key"],keyup:[0,"key"]},caps:{keydown:[0,"key"],keyup:[0,"key"]},escape:{keydown:[0,"key"],keypress:[0,"key"],keyup:[0,"key"]},"num-lock":{keydown:[0,"key"],keyup:[0,"key"]},"scroll-lock":{keydown:[0,"key"],keyup:[0,"key"]},print:{keyup:[0,"key"]},"function":{keydown:[0,"key"],keyup:[0,"key"]},"\r":{keydown:[0,"key"],keypress:[0,"key"],keyup:[0,"key"]}},msie:{prevent:{keyup:[],keydown:["char",
"keypress"],keypress:["char"]},character:{keydown:[null,"key"],keypress:[null,"char"],keyup:[null,"key"]},specialChars:{keydown:[null,"char"],keyup:[null,"char"]},navigation:{keydown:[null,"key"],keyup:[null,"key"]},special:{keydown:[null,"key"],keyup:[null,"key"]},tab:{keydown:[null,"char"],keyup:[null,"char"]},"pause-break":{keydown:[null,"key"],keyup:[null,"key"]},caps:{keydown:[null,"key"],keyup:[null,"key"]},escape:{keydown:[null,"key"],keypress:[null,"key"],keyup:[null,"key"]},"num-lock":{keydown:[null,
"key"],keyup:[null,"key"]},"scroll-lock":{keydown:[null,"key"],keyup:[null,"key"]},print:{keyup:[null,"key"]},"function":{keydown:[null,"key"],keyup:[null,"key"]},"\r":{keydown:[null,"key"],keypress:[null,"key"],keyup:[null,"key"]}},opera:{prevent:{keyup:[],keydown:[],keypress:["char"]},character:{keydown:[null,"key"],keypress:[null,"char"],keyup:[null,"key"]},specialChars:{keydown:[null,"char"],keypress:[null,"char"],keyup:[null,"char"]},navigation:{keydown:[null,"key"],keypress:[null,"key"]},special:{keydown:[null,
"key"],keypress:[null,"key"],keyup:[null,"key"]},tab:{keydown:[null,"char"],keypress:[null,"char"],keyup:[null,"char"]},"pause-break":{keydown:[null,"key"],keypress:[null,"key"],keyup:[null,"key"]},caps:{keydown:[null,"key"],keyup:[null,"key"]},escape:{keydown:[null,"key"],keypress:[null,"key"]},"num-lock":{keyup:[null,"key"],keydown:[null,"key"],keypress:[null,"key"]},"scroll-lock":{keydown:[null,"key"],keypress:[null,"key"],keyup:[null,"key"]},print:{},"function":{keydown:[null,"key"],keypress:[null,
"key"],keyup:[null,"key"]},"\r":{keydown:[null,"key"],keypress:[null,"key"],keyup:[null,"key"]}}};Syn.mouse.browsers={webkit:{right:{mousedown:{button:2,which:3},mouseup:{button:2,which:3},contextmenu:{button:2,which:3}},left:{mousedown:{button:0,which:1},mouseup:{button:0,which:1},click:{button:0,which:1}}},opera:{right:{mousedown:{button:2,which:3},mouseup:{button:2,which:3}},left:{mousedown:{button:0,which:1},mouseup:{button:0,which:1},click:{button:0,which:1}}},msie:{right:{mousedown:{button:2},
mouseup:{button:2},contextmenu:{button:0}},left:{mousedown:{button:1},mouseup:{button:1},click:{button:0}}},chrome:{right:{mousedown:{button:2,which:3},mouseup:{button:2,which:3},contextmenu:{button:2,which:3}},left:{mousedown:{button:0,which:1},mouseup:{button:0,which:1},click:{button:0,which:1}}},gecko:{left:{mousedown:{button:0,which:1},mouseup:{button:0,which:1},click:{button:0,which:1}},right:{mousedown:{button:2,which:3},mouseup:{button:2,which:3},contextmenu:{button:2,which:3}}}};Syn.key.browser=
function(){if(Syn.key.browsers[window.navigator.userAgent])return Syn.key.browsers[window.navigator.userAgent];for(var f in Syn.browser)if(Syn.browser[f]&&Syn.key.browsers[f])return Syn.key.browsers[f];return Syn.key.browsers.gecko}();Syn.mouse.browser=function(){if(Syn.mouse.browsers[window.navigator.userAgent])return Syn.mouse.browsers[window.navigator.userAgent];for(var f in Syn.browser)if(Syn.browser[f]&&Syn.mouse.browsers[f])return Syn.mouse.browsers[f];return Syn.mouse.browsers.gecko}()})();(function(){var f=Syn.helpers,j=Syn,m=function(a){if(a.selectionStart!==void 0)return document.activeElement&&document.activeElement!=a&&a.selectionStart==a.selectionEnd&&a.selectionStart==0?{start:a.value.length,end:a.value.length}:{start:a.selectionStart,end:a.selectionEnd};else try{if(a.nodeName.toLowerCase()=="input"){var b=f.getWindow(a).document.selection.createRange(),d=a.createTextRange();d.setEndPoint("EndToStart",b);var e=d.text.length;return{start:e,end:e+b.text.length}}else{var b=f.getWindow(a).document.selection.createRange(),
d=b.duplicate(),c=b.duplicate(),l=b.duplicate();c.collapse();l.collapse(false);c.moveStart("character",-1);l.moveStart("character",-1);d.moveToElementText(a);d.setEndPoint("EndToEnd",b);var e=d.text.length-b.text.length,g=d.text.length;e!=0&&c.text==""&&(e+=2);g!=0&&l.text==""&&(g+=2);return{start:e,end:g}}}catch(h){return{start:a.value.length,end:a.value.length}}},h=function(a){for(var a=f.getWindow(a).document,b=[],d=a.getElementsByTagName("*"),e=d.length,c=0;c<e;c++)Syn.isFocusable(d[c])&&d[c]!=
a.documentElement&&b.push(d[c]);return b};f.extend(Syn,{keycodes:{"\u0008":"8","\t":"9","\r":"13",shift:"16",ctrl:"17",alt:"18","pause-break":"19",caps:"20",escape:"27","num-lock":"144","scroll-lock":"145",print:"44","page-up":"33","page-down":"34",end:"35",home:"36",left:"37",up:"38",right:"39",down:"40",insert:"45","delete":"46"," ":"32",0:"48",1:"49",2:"50",3:"51",4:"52",5:"53",6:"54",7:"55",8:"56",9:"57",a:"65",b:"66",c:"67",d:"68",e:"69",f:"70",g:"71",h:"72",i:"73",j:"74",k:"75",l:"76",m:"77",
n:"78",o:"79",p:"80",q:"81",r:"82",s:"83",t:"84",u:"85",v:"86",w:"87",x:"88",y:"89",z:"90",num0:"96",num1:"97",num2:"98",num3:"99",num4:"100",num5:"101",num6:"102",num7:"103",num8:"104",num9:"105","*":"106","+":"107","-":"109",".":"110","/":"111",";":"186","=":"187",",":"188","-":"189",".":"190","/":"191","`":"192","[":"219","\\":"220","]":"221","'":"222","left window key":"91","right window key":"92","select key":"93",f1:"112",f2:"113",f3:"114",f4:"115",f5:"116",f6:"117",f7:"118",f8:"119",f9:"120",
f10:"121",f11:"122",f12:"123"},typeable:/input|textarea/i,selectText:function(a,b,d){if(a.setSelectionRange)d?(a.selectionStart=b,a.selectionEnd=d):(a.focus(),a.setSelectionRange(b,b));else if(a.createTextRange){var e=a.createTextRange();e.moveStart("character",b);e.moveEnd("character",(d||b)-a.value.length);e.select()}},getText:function(a){if(Syn.typeable.test(a.nodeName)){var b=m(a);return a.value.substring(b.start,b.end)}a=Syn.helpers.getWindow(a);return a.getSelection?a.getSelection().toString():
a.document.getSelection?a.document.getSelection().toString():a.document.selection.createRange().text},getSelection:m});f.extend(Syn.key,{data:function(a){if(j.key.browser[a])return j.key.browser[a];for(var b in j.key.kinds)if(f.inArray(a,j.key.kinds[b])>-1)return j.key.browser[b];return j.key.browser.character},isSpecial:function(a){for(var b=j.key.kinds.special,d=0;d<b.length;d++)if(Syn.keycodes[b[d]]==a)return b[d]},options:function(a,b){var d=Syn.key.data(a);if(!d[b])return null;var e=d[b][0],
d=d[b][1],c={};c.keyCode=d=="key"?Syn.keycodes[a]:d=="char"?a.charCodeAt(0):d;if(e=="char")c.charCode=a.charCodeAt(0);else if(e!==null)c.charCode=e;return c},kinds:{special:["shift","ctrl","alt","caps"],specialChars:["\u0008"],navigation:"page-up,page-down,end,home,left,up,right,down,insert,delete".split(","),"function":"f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12".split(",")},getDefault:function(a){if(Syn.key.defaults[a])return Syn.key.defaults[a];for(var b in Syn.key.kinds)if(f.inArray(a,Syn.key.kinds[b])>
-1&&Syn.key.defaults[b])return Syn.key.defaults[b];return Syn.key.defaults.character},defaults:{character:function(a,b,d,e,c){/num\d+/.test(d)&&(d=d.match(/\d+/)[0]);if(e||!j.support.keyCharacters&&Syn.typeable.test(this.nodeName))b=this.value,a=b.substr(0,c.start),c=b.substr(c.end),this.value=a+d+c,Syn.selectText(this,a.length+(d=="\n"&&j.support.textareaCarriage?2:d.length))},c:function(a,b,d,e,c){Syn.key.ctrlKey?Syn.key.clipboard=Syn.getText(this):Syn.key.defaults.character.apply(this,arguments)},
v:function(a,b,d,e,c){Syn.key.ctrlKey?Syn.key.defaults.character.call(this,a,b,Syn.key.clipboard,true,c):Syn.key.defaults.character.apply(this,arguments)},a:function(a,b,d,e,c){Syn.key.ctrlKey?Syn.selectText(this,0,this.value.length):Syn.key.defaults.character.apply(this,arguments)},home:function(){Syn.onParents(this,function(a){if(a.scrollHeight!=a.clientHeight)return a.scrollTop=0,false})},end:function(){Syn.onParents(this,function(a){if(a.scrollHeight!=a.clientHeight)return a.scrollTop=a.scrollHeight,
false})},"page-down":function(){Syn.onParents(this,function(a){if(a.scrollHeight!=a.clientHeight)return a.scrollTop+=a.clientHeight,false})},"page-up":function(){Syn.onParents(this,function(a){if(a.scrollHeight!=a.clientHeight)return a.scrollTop-=a.clientHeight,false})},"\u0008":function(a,b,d,e,c){if(!j.support.backspaceWorks&&Syn.typeable.test(this.nodeName))b=this.value,a=b.substr(0,c.start),b=b.substr(c.end),c.start==c.end&&c.start>0?(this.value=a.substring(0,a.length-1)+b,Syn.selectText(this,
c.start-1)):(this.value=a+b,Syn.selectText(this,c.start))},"delete":function(a,b,d,e,c){if(!j.support.backspaceWorks&&Syn.typeable.test(this.nodeName))b=this.value,a=b.substr(0,c.start),b=b.substr(c.end),this.value=c.start==c.end&&c.start<=this.value.length-1?a+b.substring(1):a+b,Syn.selectText(this,c.start)},"\r":function(a,b,d,e,c){d=this.nodeName.toLowerCase();!j.support.keypressSubmits&&d=="input"&&(e=Syn.closest(this,"form"))&&Syn.trigger("submit",{},e);!j.support.keyCharacters&&d=="textarea"&&
Syn.key.defaults.character.call(this,a,b,"\n",void 0,c);!j.support.keypressOnAnchorClicks&&d=="a"&&Syn.trigger("click",{},this)},"\t":function(){var a=h(this),b=Syn.tabIndex(this),d=null,e=0;for(orders=[];e<a.length;e++)orders.push([a[e],e]);orders.sort(function(a,b){var e=b[0],d=Syn.tabIndex(a[0])||0,e=Syn.tabIndex(e)||0;return d==e?a[1]-b[1]:d==0?1:e==0?-1:d-e});console.log(a,b);for(e=0;e<orders.length;e++)b=orders[e][0],this==b&&(Syn.key.shiftKey?(d=orders[e-1][0])||(d=orders[a.length-1][0]):(d=
orders[e+1][0])||(d=orders[0][0]));d||(d=void 0);d&&d.focus();return d},left:function(a,b,d,e,c){Syn.typeable.test(this.nodeName)&&(Syn.key.shiftKey?Syn.selectText(this,c.start==0?0:c.start-1,c.end):Syn.selectText(this,c.start==0?0:c.start-1))},right:function(a,b,d,e,c){Syn.typeable.test(this.nodeName)&&(Syn.key.shiftKey?Syn.selectText(this,c.start,c.end+1>this.value.length?this.value.length:c.end+1):Syn.selectText(this,c.end+1>this.value.length?this.value.length:c.end+1))},up:function(){if(/select/i.test(this.nodeName))this.selectedIndex=
this.selectedIndex?this.selectedIndex-1:0},down:function(){/select/i.test(this.nodeName)&&(Syn.changeOnBlur(this,"selectedIndex",this.selectedIndex),this.selectedIndex+=1)},shift:function(){return null}}});f.extend(Syn.create,{keydown:{setup:function(a,b,d){f.inArray(b,Syn.key.kinds.special)!=-1&&(Syn.key[b+"Key"]=d)}},keypress:{setup:function(a,b,d){j.support.keyCharacters&&!j.support.keysOnNotFocused&&d.focus()}},keyup:{setup:function(a,b){f.inArray(b,Syn.key.kinds.special)!=-1&&(Syn.key[b+"Key"]=
null)}},key:{options:function(a,b){b=typeof b!="object"?{character:b}:b;b=f.extend({},b);b.character&&(f.extend(b,j.key.options(b.character,a)),delete b.character);return b=f.extend({ctrlKey:!!Syn.key.ctrlKey,altKey:!!Syn.key.altKey,shiftKey:!!Syn.key.shiftKey,metaKey:!!Syn.key.metaKey},b)},event:function(a,b,d){var e=f.getWindow(d).document||document;if(e.createEvent){var c;try{c=e.createEvent("KeyEvents"),c.initKeyEvent(a,true,true,window,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,b.keyCode,b.charCode)}catch(l){c=
f.createBasicStandardEvent(a,b,e)}c.synthetic=true}else try{c=f.createEventObject.apply(this,arguments),f.extend(c,b)}catch(g){}return c}}});var i={enter:"\r",backspace:"\u0008",tab:"\t",space:" "};f.extend(Syn.init.prototype,{_key:function(a,b,d){if(/-up$/.test(a)&&f.inArray(a.replace("-up",""),Syn.key.kinds.special)!=-1)Syn.trigger("keyup",a.replace("-up",""),b),d(true,b);else{var e=Syn.typeable.test(b.nodeName)&&m(b),c=i[a]||a,l=Syn.trigger("keydown",c,b),a=Syn.key.getDefault,g=Syn.key.browser.prevent,
h,j=Syn.key.options(c,"keypress");l?j?(l=Syn.trigger("keypress",j,b))&&(h=a(c).call(b,j,f.getWindow(b),c,void 0,e)):h=a(c).call(b,j,f.getWindow(b),c,void 0,e):j&&f.inArray("keypress",g.keydown)==-1&&Syn.trigger("keypress",j,b);h&&h.nodeName&&(b=h);h!==null?setTimeout(function(){Syn.trigger("keyup",Syn.key.options(c,"keyup"),b);d(l,b)},1):d(l,b);return b}},_type:function(a,b,d){var e=a.match(/(\[[^\]]+\])|([^\[])/g),c=this,f=function(a,h){var i=e.shift();i?(h=h||b,i.length>1&&(i=i.substr(1,i.length-
2)),c._key(i,h,f)):d(a,h)};f()}});(function(){if(document.body){var a=document.createElement("div"),b,d,e,c;a.innerHTML="<form id='outer'><input name='checkbox' type='checkbox'/><input name='radio' type='radio' /><input type='submit' name='submitter'/><input type='input' name='inputter'/><input name='one'><input name='two'/><a href='#abc'></a><textarea>1\n2</textarea></form>";document.documentElement.appendChild(a);b=a.firstChild;d=b.getElementsByTagName("a")[0];e=b.getElementsByTagName("textarea")[0];
c=b.childNodes[3];b.onsubmit=function(a){a.preventDefault&&a.preventDefault();j.support.keypressSubmits=true;return a.returnValue=false};c.focus();Syn.trigger("keypress","\r",c);Syn.trigger("keypress","a",c);j.support.keyCharacters=c.value=="a";c.value="a";Syn.trigger("keypress","\u0008",c);j.support.backspaceWorks=c.value=="";c.onchange=function(){j.support.focusChanges=true};c.focus();Syn.trigger("keypress","a",c);b.childNodes[5].focus();Syn.trigger("keypress","b",c);j.support.keysOnNotFocused=
c.value=="ab";j.bind(d,"click",function(a){a.preventDefault&&a.preventDefault();j.support.keypressOnAnchorClicks=true;return a.returnValue=false});Syn.trigger("keypress","\r",d);j.support.textareaCarriage=e.value.length==4;document.documentElement.removeChild(a);j.support.ready++}else setTimeout(arguments.callee,1)})()})();(function(){(function(){if(document.body){var a=document.createElement("div");document.body.appendChild(a);Syn.helpers.extend(a.style,{width:"100px",height:"10000px",backgroundColor:"blue",position:"absolute",top:"10px",left:"0px",zIndex:19999});document.body.scrollTop=11;if(document.elementFromPoint)document.elementFromPoint(3,1)==a?Syn.support.elementFromClient=true:Syn.support.elementFromPage=true,document.body.removeChild(a),document.body.scrollTop=0}else setTimeout(arguments.callee,1)})();var f=
function(a,b){var d=a.clientX,g=a.clientY,f=Syn.helpers.getWindow(b);if(Syn.support.elementFromPage){var h=Syn.helpers.scrollOffset(f);d+=h.left;g+=h.top}d=f.document.elementFromPoint?f.document.elementFromPoint(d,g):b;return d===f.document.documentElement&&(a.clientY<0||a.clientX<0)?b:d},j=function(a,b,d){var g=f(b,d);Syn.trigger(a,b,g||d);return g},m=function(a,b,d){var g=f(a,b);if(d!=g&&g&&d){var h=Syn.helpers.extend({},a);h.relatedTarget=g;Syn.trigger("mouseout",h,d);h.relatedTarget=d;Syn.trigger("mouseover",
h,g)}Syn.trigger("mousemove",a,g||b);return g},h=function(a,b,d,g,h){var i=new Date,j=b.clientX-a.clientX,u=b.clientY-a.clientY,n=Syn.helpers.getWindow(g),o=f(a,g),p=n.document.createElement("div"),s=0;move=function(){var f=new Date,t=Syn.helpers.scrollOffset(n),f=(s==0?0:f-i)/d,q={clientX:j*f+a.clientX,clientY:u*f+a.clientY};s++;f<1?(Syn.helpers.extend(p.style,{left:q.clientX+t.left+2+"px",top:q.clientY+t.top+2+"px"}),o=m(q,g,o),setTimeout(arguments.callee,15)):(o=m(b,g,o),n.document.body.removeChild(p),
h())};Syn.helpers.extend(p.style,{height:"5px",width:"5px",backgroundColor:"red",position:"absolute",zIndex:19999,fontSize:"1px"});n.document.body.appendChild(p);move()},i=function(a,b,d,g,f){j("mousedown",a,g);h(a,b,d,g,function(){j("mouseup",b,g);f()})},a=function(a){var a=Syn.jquery()(a),b=a.offset();return{pageX:b.left+a.width()/2,pageY:b.top+a.height()/2}},b=function(b,c,d){var g=/(\d+)[x ](\d+)/,f=/(\d+)X(\d+)/,h=/([+-]\d+)[xX ]([+-]\d+)/;typeof b=="string"&&h.test(b)&&d&&(d=a(d),b=b.match(h),
b={pageX:d.pageX+parseInt(b[1]),pageY:d.pageY+parseInt(b[2])});typeof b=="string"&&g.test(b)&&(b=b.match(g),b={pageX:parseInt(b[1]),pageY:parseInt(b[2])});typeof b=="string"&&f.test(b)&&(b=b.match(f),b={clientX:parseInt(b[1]),clientY:parseInt(b[2])});typeof b=="string"&&(b=Syn.jquery()(b,c.document)[0]);b.nodeName&&(b=a(b));b.pageX&&(c=Syn.helpers.scrollOffset(c),b={clientX:b.pageX-c.left,clientY:b.pageY-c.top});return b},d=function(a,b,d){if(a.clientY<0){var g=Syn.helpers.scrollOffset(d);Syn.helpers.scrollDimensions(d);
var f=g.top+a.clientY-100,h=f-g.top;f>0||(f=0,h=-g.top);console.log("moving",a.clientY,a.clientY-h,g.top,f);a.clientY-=h;b.clientY-=h;Syn.helpers.scrollOffset(d,{top:f,left:g.left})}};Syn.helpers.extend(Syn.init.prototype,{_move:function(a,c,f){var g=Syn.helpers.getWindow(c),i=b(a.from||c,g,c),j=b(a.to||a,g,c);a.adjust!==false&&d(i,j,g);h(i,j,a.duration||500,c,f)},_drag:function(a,c,f){var g=Syn.helpers.getWindow(c),h=b(a.from||c,g,c),j=b(a.to||a,g,c);a.adjust!==false&&d(h,j,g);i(h,j,a.duration||
500,c,f)}})})();