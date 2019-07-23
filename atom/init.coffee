path = require 'path'

# Set Makefile[.any extension] and '.mk' files to always use hard tabs
atom.workspace.observeTextEditors (editor) ->
  editorView = atom.views.getView(editor)
  p = editor.getPath()
  if !p
    return

  extension = path.extname(p)

  if path.basename(p) is 'Makefile' or extension is '.mk'
    editor.setSoftTabs(false)

  if /^\.(md|markdown)$/i.test(extension)
    editor.setSoftWrapped(true)
