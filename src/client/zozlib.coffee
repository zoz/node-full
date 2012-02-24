
isOver = (x, y, left, top, width, height) ->
  (x > left) && (x < left + width) && (y > top) && (y < top + height)

stopEvent = (evt) ->
  if (evt.preventDefault)
    evt.preventDefault()
  if (evt.stopPropagation)
    evt.stopPropagation()
  evt.returnValue = false
  return false

class DD
  ddobj:
    cloneElem: null
    origElem: null
    dropTargets: []
    currentDrop: null

  constructor: (container, selector, callback) ->
    self = this
    $(container).delegate selector, "mousedown", self, (eStart) ->
      ddobj = self.ddobj
      return if eStart.which != 1
      origElem = $(this)
      offX = eStart.pageX - origElem.offset().left
      offY = eStart.pageY - origElem.offset().top
      cloneElem = origElem.clone()
      cloneElem.css('left', (eStart.pageX - offX) + 'px')
      cloneElem.css('top', (eStart.pageY - offY) + 'px')
      cloneElem.css('position', 'absolute')
      cloneElem.appendTo(document.body)
      cloneElem.addClass("dragging")
      self.ddobj.cloneElem = cloneElem
      self.ddobj.origElem = origElem

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
            callback(ddobj.origElem, ddobj.currentDrop.elem)
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


