window.runclient = (doTests) ->
  $('#testDiv').html('jquery changed this div')
  el = $("#tarea")
  el.val("turkey")
  console.log el.text()

  now = new Date()
  dateStr = $.format.date(now, "Date Test: dd/MM/yyyy")
  $("#testDiv").html(dateStr)

  if (doTests)
    callback = ->
      Syn.click({}, 'tarea').type("One bar ").click({}, $('#testDiv'), () ->
        test "Syn Typeing", () ->
          equal $('#tarea').val(), "One bar turkey", "textarea problem"
      )
    setTimeout callback, 1000

    test "QUnit Test", () ->
      equal true, true, 'QUnit Test'

    test "Basic page checks", () ->
      expect 2
      equal $('#tarea').val(), "turkey", "textarea problem"
      equal true, true, "passing test"

    test "formatDate", () ->
      equal $.format.date("2009-12-18 10:54:50.546", "Test: dd/MM/yyyy"), "Test: 18/12/2009"
