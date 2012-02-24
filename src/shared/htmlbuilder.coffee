world = exports ? this

class world.H

  @esc = (txt) ->
    String(txt).replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')

  @reduceAttr = (attrObj) ->
    a = for k, v of attrObj
      "#{k}='#{v}'"
    a.join(' ')

  @createTag = (tagName, args...) ->
    if args.length > 2
      throw new Error("Html builder passed tag with more then two arguments")

    if args.length == 0 || !args[0]
      return "<#{tagName}></#{tagName}>"

    attr = ""
    if typeof args[0] == 'object'
      # the first argument is a object hash with html tag attributes
      attr = ' ' + @reduceAttr(args[0])
      content = args[1]
    else
      content = args[0]

    if !content?
      res = ''
    else if typeof content == 'function'
      res = content()
    else
      res = String(content)

    return "<#{tagName}#{attr}>#{res}</#{tagName}>"

  @span = (args...) =>
    @createTag 'span', args...

  @div = (args...) =>
    @createTag 'div', args...

  @html = (args...) =>
    @createTag 'html', args...

  @head = (args...) =>
    @createTag 'head', args...

  @body = (args...) =>
    @createTag 'body', args...

  @ol: (args...) ->
    @createTag "ol", args...

  @script: (args...) ->
    res = ''
    for scriptname in args
      res = res + "<script type='text/javascript' src='#{scriptname}'></script>"
    return res

  @link: (args...) ->
    res = ''
    for stylename in args
      res = res + "<link rel='stylesheet' href='#{stylename}' type='text/css' media='screen' >"
    return res

  @tbox: (attr2, content) ->
    return "<input type='text' value='#{content}' #{@reduceAttr(attr2)} >"

  @printLog: (L) ->
    @div {style: 'background-color: #eeeeee; position: absolute; width: 500px; right: 0px; bottom: 0px;'}, ->
      L.toHtml()

