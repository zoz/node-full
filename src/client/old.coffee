
  #isOver = (x, y, left, top, width, height) ->
    #(x > left) && (x < left + width) && (y > top) && (y < top + height)

  #stopEvent = (evt) ->
    #if (evt.preventDefault)
      #evt.preventDefault()
    #if (evt.stopPropagation)
      #evt.stopPropagation()
    #evt.returnValue = false
    #return false

  #ddobj =
    #cloneElem: null
    #origElem: null
    #dropTargets: []
    #currentDrop: null
  $("#container").delegate ".grab", "mousedown", (eStart) ->
    return if eStart.button != 0
    origElem = $(this)
    offX = eStart.pageX - origElem.offset().left
    offY = eStart.pageY - origElem.offset().top
    cloneElem = origElem.clone()
    cloneElem.css('left', (eStart.pageX - offX) + 'px')
    cloneElem.css('top', (eStart.pageY - offY) + 'px')
    cloneElem.css('position', 'absolute')
    cloneElem.appendTo(document.body)
    cloneElem.addClass("dragging")
    ddobj.cloneElem = cloneElem
    ddobj.origElem = origElem

    $(".drop").each () ->
      $this = $(this)
      dTarg =
        left: $this.offset().left
        top: $this.offset().top
        width: $this.width()
        height: $this.height()
        elem: $this
      ddobj.dropTargets.push(dTarg)

    _mouseup = () ->
      if ddobj.origElem != null
        ddobj.dropTargets = []
        if ddobj.currentDrop?
          ddobj.currentDrop.elem.removeClass "magic"
          console.log "dropped "
          console.log ddobj.currentDrop.elem.attr('id')
        ddobj.currentDrop = null
        $(document).unbind ".dd"
        ddobj.cloneElem.animate ddobj.origElem.position(), 200, "linear", () ->
          ddobj.cloneElem.remove()
          ddobj.cloneElem = null
        ddobj.origElem = null

    $(document).bind "mouseup.dd", (eEnd) ->
      _mouseup()
      stopEvent eEnd

    $(document).bind "mousemove.dd", (eMove) =>
      #if eMove.which != 1
        ## ie9 might need this fix for mouseup out of window
        #console.log "no button"
      posX = eMove.pageX - offX
      posY = eMove.pageY - offY
      posX = 0 if posX < 0
      posY = 0 if posY < 0
      ddobj.cloneElem.css('left', posX + 'px')
      ddobj.cloneElem.css('top', posY + 'px')
      # check if we are still in the current drop target
      targ = null
      if ddobj.currentDrop != null
        targ = ddobj.currentDrop
        if not (isOver(eMove.pageX, eMove.pageY, targ.left, targ.top, targ.width, targ.height))
          ddobj.currentDrop.elem.removeClass "magic"
          ddobj.currentDrop = null
          targ = null

      for targ in ddobj.dropTargets
        if targ != ddobj.currentDrop
          if (isOver(eMove.pageX, eMove.pageY, targ.left, targ.top, targ.width, targ.height))
            targ.elem.addClass "magic"
            ddobj.currentDrop = targ

    document.body.focus()
    $(document.body).bind "selectstart.dd", (e) ->
      stopEvent e
    ddobj.cloneElem.bind "dragstart.dd", (e) ->
      stopEvent e
    stopEvent eStart


  #binddrag = (elem) ->

    #binding =
      #elem: elem
      #dragging: false
      #event: null

    #binding.event = elem.bind "mousedown", (eStart) =>
      #console.log "start drag"
      #binding.dragging = true
      #posX = elem.offset().left
      #posY = elem.offset().top
      #$(document).bind "mousemove.dd", (eMove) =>
        #offsetX = eMove.clientX - eStart.clientX
        #offsetY = eMove.clientY - eStart.clientY
        #elem.css('left', (posX + offsetX) + 'px')
        #elem.css('top', (posY + offsetY) + 'px')
        #stopEvent eMove
      #$(document).bind "mouseup.dd", (eStop) ->
        #console.log "stop drag"
        #binding.dragging = false
        #$(document).unbind(".dd")
        #elem.unbind(".dd")
        #stopEvent eStop
      #document.body.focus()
      #$(document).bind "selectstart.dd", (e) ->
        #stopEvent e
      #elem.bind "dragstart.dd", (e) ->
        #stopEvent e
      #stopEvent eStart
      #console.log bound

    #bound.push binding

  #binddrag $("#dragMe")

  #$("#dragMe").draggable({revert: true})
  ##{revert: true})
  #$("#container").delegate ".grab", "mousedown", (eStart) ->
    #el = $(eStart.target)
    #console.log window.getComputedStyle(eStart.target,null).left
    #console.log eStart.target.style.left
    #console.log el.parent()
    #console.log el.position().left + " " + el.offset().left
  #$("#dragMe").draggable(
    #start: (event, ui) ->
      #console.log "drag started"
    #stop: (event, ui) ->
      #console.log "drag stopped"
    ##helper: () ->
      ##$("<div>bbooo</div>")
  #)
  #$("#droppable").droppable(
    #drop: (event, ui) ->
      #console.log("dropped")
  #)

