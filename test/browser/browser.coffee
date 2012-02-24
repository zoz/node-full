mocha.setup 'bdd'
expect = chai.expect

$(document).ready () ->
  # the global leaks are due to jQuery-dateformat plugin
  mocha.run().globals(['hour','minute','second'])

describe 'Browser Client Tests', ->
  describe 'Chai asserts', ->
    it '1 to be ok', ->
      expect(1).to.be.ok
    it 'obj to be empty', ->
      expect({ length: 0, duck: 'typing' }).to.be.empty
      expect([1,2,3]).to.not.be.empty
    it 'object to have prop', ->
      expect({ a: 'boo' }).to.have.property 'a'
    it 'keys of objects', ->
      expect({ a: 'b', c: 'd' }).not.keys('x')
      expect({ a: 'b', c: 'd' }).keys(['a', 'c'])
      expect({ a: 'b', c: 'd' }).contain.keys('a')

  describe 'jQuery', ->
    it 'jQuery html func', ->
      expect($('#basicDiv').html()).equal 'Basic Html Layout'
      str = 'Text change from jquery code'
      $('#basicDiv').html(str)
      el = $("#basicDiv")
      expect(el.html()).equal str

  describe 'jQuery-dateformat', ->
    it 'format date to string', ->
      str = $.format.date("2009-12-18 10:54:50.546", "Test: dd/MM/yyyy")
      expect(str).equal "Test: 18/12/2009"

###
  describe 'Html Text Selection', ->
    #it 'Set then get selection area of textarea to 0', ->
      #$('#tarea').setSelectRange(0,0)
      #expect($('#tarea').getSelectRange().start).equal 0

    it 'Textarea val is set', ->
      expect($('#tarea').val()).equal "initial text"

  describe 'User interaction', ->
    it 'Click and type in textarea', (done) ->
      $('#tarea').setSelectRange(0,0)
      Syn.click({}, 'tarea').type "One bar ", 'tarea', ->
        expect($('#tarea').val()).equal "One bar initial text"
        done()

    it 'textarea select to be correct range', ->
      $('#tarea').setSelectRange 2, 4
      tmp = $('#tarea').getSelectRange()
      tmp = JSON.stringify(tmp)
      expect(tmp).equal JSON.stringify {start: 2, end: 4}

###
