chai = require('chai')
#chai.Assertion.includeStack = true
expect = chai.expect
H = require('../build/server/htmlbuilder').H

describe 'zz top', ->

  describe 'Mocha and Chai tests', ->
    describe 'basic', ->
      it '1 equal ok', ->
        expect(true).to.be.ok
      it '1 to equal 1', ->
        expect(1).equal 1
      it 'array test', ->
        expect([5,1,6][2]).equal 6

  describe 'CoffeeScript Tests', ->
    it 'statics in classes', ->
      class b
        @a: () ->
          'in b.a'

      class c extends b
        t: () ->
          'in t'

        y: () ->
          b.a()

      ib = new c
      expect(b.a()).equal "in b.a"
      expect(ib.t()).equal 'in t'
      expect(ib.y()).equal 'in b.a'

  describe 'Html Builder', ->

    it 'script simple', ->
      html = H.script "one"
      expect(html).equal "<script type='text/javascript' src='one'></script>"

    it 'script multiple arguments', ->
      html = H.script "one", "two"
      expect(html).equal "<script type='text/javascript' src='one'></script><script type='text/javascript' src='two'></script>"

    it 'div simple', ->
      html = H.div "one"
      expect(html).equal "<div>one</div>"

    it 'div with id', ->
      expect(H.div {id: 'id1'}).equal "<div id='id1'></div>"

    it 'div with id and class', ->
      expect(H.div { id: 'id1', class: 'c1'  }).equal "<div id='id1' class='c1'></div>"

    it 'pass three arguements causes error', ->
      fn = () ->
        H.div {id:"id1"}, "one", "two"
      expect(fn).throw Error

    it 'no content', ->
      html = H.div()
      expect(html).equal "<div></div>"

    it 'null content', ->
      html = H.div null
      expect(html).equal "<div></div>"

    it 'undefined content', ->
      html = H.div undefined
      expect(html).equal "<div></div>"

    it 'two content concatenate', ->
      html = H.div "content one" + " content two"
      expect(html).equal "<div>content one content two</div>"

    it 'two content concatenate with attributes', ->
      html = H.div {id: "id1", class: 'c1'}, "content one" + " content two"
      expect(html).equal "<div id='id1' class='c1'>content one content two</div>"

    it 'div child', ->
      html =
      H.div ->
        H.div "one"
      expect(html).equal "<div><div>one</div></div>"
      temp = '''  
      <div>
        <div>one</div>
      <div>
      '''

    it 'div child of child', ->
      html = H.div ->
               H.div ->
                 H.div "one"
      expect(html).equal "<div><div><div>one</div></div></div>"
      temp = '''  
      <div>
        <div>one</div>
        <div>two</div>
      <div>
      '''

    it 'div two sibling children', ->
      html = H.div ->
               H.div("one") +
               H.div("two")
      expect(html).equal "<div><div>one</div><div>two</div></div>"
      temp = '''  
      <div>
        <div>
          <div>one</div>
        </div>
      <div>
      '''

    it 'div attribute options different formats', ->
      html = H.div { "id": 'id1', "class": "c1", attr2: "stuff" }
      expect(html).equal "<div id='id1' class='c1' attr2='stuff'></div>"

    it 'div attributes and child', ->
      html =
      H.div {id: 'id1', class:'c1'}, ->
        H.div {id: 'id2', class:'c2'}, "one"
      expect(html).equal "<div id='id1' class='c1'><div id='id2' class='c2'>one</div></div>"

    it 'escape html to safe string', ->
      safestring = H.esc "<div id=\"id1\" class='c1'>One & Two</div>"
      expect(safestring).equal '&lt;div id=&quot;id1&quot; class=&#x27;c1&#x27;&gt;One &amp; Two&lt;&#x2F;div&gt;'

