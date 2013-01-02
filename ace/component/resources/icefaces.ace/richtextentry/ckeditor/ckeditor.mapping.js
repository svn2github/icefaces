window.CKEDITOR_GETURL = function(r) { var mappings = [{i: "CHANGES.html", o: "#{resource['icefaces.ace:richtextentry/ckeditor/CHANGES.html']}"},{i: "INSTALL.html", o: "#{resource['icefaces.ace:richtextentry/ckeditor/INSTALL.html']}"},{i: "LICENSE.html", o: "#{resource['icefaces.ace:richtextentry/ckeditor/LICENSE.html']}"},{i: "adapters/jquery.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/adapters/jquery.js']}"},{i: "ckeditor.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/ckeditor.js']}"},{i: "ckeditor.mapping.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/ckeditor.mapping.js']}"},{i: "ckeditor_basic.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/ckeditor_basic.js']}"},{i: "ckeditor_basic_source.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/ckeditor_basic_source.js']}"},{i: "ckeditor_source.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/ckeditor_source.js']}"},{i: "config.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/config.js']}"},{i: "lang/_languages.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/_languages.js']}"},{i: "lang/_translationstatus.txt", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/_translationstatus.txt']}"},{i: "lang/af.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/af.js']}"},{i: "lang/ar.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/ar.js']}"},{i: "lang/bg.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/bg.js']}"},{i: "lang/bn.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/bn.js']}"},{i: "lang/bs.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/bs.js']}"},{i: "lang/ca.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/ca.js']}"},{i: "lang/cs.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/cs.js']}"},{i: "lang/cy.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/cy.js']}"},{i: "lang/da.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/da.js']}"},{i: "lang/de.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/de.js']}"},{i: "lang/el.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/el.js']}"},{i: "lang/en-au.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/en-au.js']}"},{i: "lang/en-ca.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/en-ca.js']}"},{i: "lang/en-gb.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/en-gb.js']}"},{i: "lang/en.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/en.js']}"},{i: "lang/eo.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/eo.js']}"},{i: "lang/es.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/es.js']}"},{i: "lang/et.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/et.js']}"},{i: "lang/eu.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/eu.js']}"},{i: "lang/fa.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/fa.js']}"},{i: "lang/fi.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/fi.js']}"},{i: "lang/fo.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/fo.js']}"},{i: "lang/fr-ca.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/fr-ca.js']}"},{i: "lang/fr.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/fr.js']}"},{i: "lang/gl.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/gl.js']}"},{i: "lang/gu.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/gu.js']}"},{i: "lang/he.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/he.js']}"},{i: "lang/hi.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/hi.js']}"},{i: "lang/hr.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/hr.js']}"},{i: "lang/hu.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/hu.js']}"},{i: "lang/is.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/is.js']}"},{i: "lang/it.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/it.js']}"},{i: "lang/ja.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/ja.js']}"},{i: "lang/km.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/km.js']}"},{i: "lang/ko.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/ko.js']}"},{i: "lang/lt.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/lt.js']}"},{i: "lang/lv.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/lv.js']}"},{i: "lang/mn.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/mn.js']}"},{i: "lang/ms.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/ms.js']}"},{i: "lang/nb.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/nb.js']}"},{i: "lang/nl.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/nl.js']}"},{i: "lang/no.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/no.js']}"},{i: "lang/pl.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/pl.js']}"},{i: "lang/pt-br.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/pt-br.js']}"},{i: "lang/pt.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/pt.js']}"},{i: "lang/ro.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/ro.js']}"},{i: "lang/ru.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/ru.js']}"},{i: "lang/sk.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/sk.js']}"},{i: "lang/sl.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/sl.js']}"},{i: "lang/sr-latn.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/sr-latn.js']}"},{i: "lang/sr.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/sr.js']}"},{i: "lang/sv.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/sv.js']}"},{i: "lang/th.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/th.js']}"},{i: "lang/tr.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/tr.js']}"},{i: "lang/uk.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/uk.js']}"},{i: "lang/vi.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/vi.js']}"},{i: "lang/zh-cn.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/zh-cn.js']}"},{i: "lang/zh.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/lang/zh.js']}"},{i: "plugins/a11yhelp/dialogs/a11yhelp.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/a11yhelp/dialogs/a11yhelp.js']}"},{i: "plugins/a11yhelp/lang/en.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/a11yhelp/lang/en.js']}"},{i: "plugins/a11yhelp/lang/he.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/a11yhelp/lang/he.js']}"},{i: "plugins/about/dialogs/about.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/about/dialogs/about.js']}"},{i: "plugins/adobeair/plugin.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/adobeair/plugin.js']}"},{i: "plugins/autogrow/plugin.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/autogrow/plugin.js']}"},{i: "plugins/clipboard/dialogs/paste.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/clipboard/dialogs/paste.js']}"},{i: "plugins/colordialog/dialogs/colordialog.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/colordialog/dialogs/colordialog.js']}"},{i: "plugins/dialog/dialogDefinition.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/dialog/dialogDefinition.js']}"},{i: "plugins/div/dialogs/div.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/div/dialogs/div.js']}"},{i: "plugins/find/dialogs/find.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/find/dialogs/find.js']}"},{i: "plugins/flash/dialogs/flash.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/flash/dialogs/flash.js']}"},{i: "plugins/forms/dialogs/button.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/forms/dialogs/button.js']}"},{i: "plugins/forms/dialogs/checkbox.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/forms/dialogs/checkbox.js']}"},{i: "plugins/forms/dialogs/form.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/forms/dialogs/form.js']}"},{i: "plugins/forms/dialogs/hiddenfield.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/forms/dialogs/hiddenfield.js']}"},{i: "plugins/forms/dialogs/radio.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/forms/dialogs/radio.js']}"},{i: "plugins/forms/dialogs/select.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/forms/dialogs/select.js']}"},{i: "plugins/forms/dialogs/textarea.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/forms/dialogs/textarea.js']}"},{i: "plugins/forms/dialogs/textfield.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/forms/dialogs/textfield.js']}"},{i: "plugins/iframe/dialogs/iframe.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/iframe/dialogs/iframe.js']}"},{i: "plugins/iframedialog/plugin.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/iframedialog/plugin.js']}"},{i: "plugins/image/dialogs/image.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/image/dialogs/image.js']}"},{i: "plugins/link/dialogs/anchor.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/link/dialogs/anchor.js']}"},{i: "plugins/link/dialogs/link.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/link/dialogs/link.js']}"},{i: "plugins/liststyle/dialogs/liststyle.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/liststyle/dialogs/liststyle.js']}"},{i: "plugins/pastefromword/filter/default.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/pastefromword/filter/default.js']}"},{i: "plugins/pastetext/dialogs/pastetext.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/pastetext/dialogs/pastetext.js']}"},{i: "plugins/placeholder/dialogs/placeholder.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/placeholder/dialogs/placeholder.js']}"},{i: "plugins/placeholder/lang/en.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/placeholder/lang/en.js']}"},{i: "plugins/placeholder/plugin.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/placeholder/plugin.js']}"},{i: "plugins/save/plugin.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/save/plugin.js']}"},{i: "plugins/scayt/dialogs/options.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/scayt/dialogs/options.js']}"},{i: "plugins/smiley/dialogs/smiley.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/dialogs/smiley.js']}"},{i: "plugins/specialchar/dialogs/specialchar.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/specialchar/dialogs/specialchar.js']}"},{i: "plugins/specialchar/lang/en.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/specialchar/lang/en.js']}"},{i: "plugins/styles/styles/default.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/styles/styles/default.js']}"},{i: "plugins/table/dialogs/table.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/table/dialogs/table.js']}"},{i: "plugins/tableresize/plugin.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/tableresize/plugin.js']}"},{i: "plugins/tabletools/dialogs/tableCell.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/tabletools/dialogs/tableCell.js']}"},{i: "plugins/templates/dialogs/templates.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/templates/dialogs/templates.js']}"},{i: "plugins/templates/templates/default.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/templates/templates/default.js']}"},{i: "plugins/uicolor/dialogs/uicolor.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/uicolor/dialogs/uicolor.js']}"},{i: "plugins/uicolor/lang/en.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/uicolor/lang/en.js']}"},{i: "plugins/uicolor/lang/he.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/uicolor/lang/he.js']}"},{i: "plugins/uicolor/plugin.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/uicolor/plugin.js']}"},{i: "plugins/uicolor/yui/yui.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/uicolor/yui/yui.js']}"},{i: "plugins/wsc/dialogs/ciframe.html", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/wsc/dialogs/ciframe.html']}"},{i: "plugins/wsc/dialogs/tmpFrameset.html", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/wsc/dialogs/tmpFrameset.html']}"},{i: "plugins/wsc/dialogs/wsc.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/wsc/dialogs/wsc.js']}"},{i: "skins/kama/skin.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/skin.js']}"},{i: "skins/office2003/skin.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/office2003/skin.js']}"},{i: "skins/v2/skin.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/skin.js']}"},{i: "themes/default/theme.js", o: "#{resource['icefaces.ace:richtextentry/ckeditor/themes/default/theme.js']}"},{i: "contents.css", o: "#{resource['icefaces.ace:richtextentry/ckeditor/contents.css']}"},{i: "plugins/scayt/dialogs/toolbar.css", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/scayt/dialogs/toolbar.css']}"},{i: "plugins/uicolor/yui/assets/yui.css", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/uicolor/yui/assets/yui.css']}"},{i: "plugins/wsc/dialogs/wsc.css", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/wsc/dialogs/wsc.css']}"},{i: "skins/kama/dialog.css", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/dialog.css']}"},{i: "skins/kama/editor.css", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/editor.css']}"},{i: "skins/kama/templates.css", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/templates.css']}"},{i: "skins/office2003/dialog.css", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/office2003/dialog.css']}"},{i: "skins/office2003/editor.css", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/office2003/editor.css']}"},{i: "skins/office2003/templates.css", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/office2003/templates.css']}"},{i: "skins/v2/dialog.css", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/dialog.css']}"},{i: "skins/v2/editor.css", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/editor.css']}"},{i: "skins/v2/templates.css", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/templates.css']}"},{i: "images/spacer.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/images/spacer.gif']}"},{i: "plugins/about/dialogs/logo_ckeditor.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/about/dialogs/logo_ckeditor.png']}"},{i: "plugins/flash/images/placeholder.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/flash/images/placeholder.png']}"},{i: "plugins/forms/images/hiddenfield.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/forms/images/hiddenfield.gif']}"},{i: "plugins/iframe/images/placeholder.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/iframe/images/placeholder.png']}"},{i: "plugins/link/images/anchor.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/link/images/anchor.gif']}"},{i: "plugins/pagebreak/images/pagebreak.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/pagebreak/images/pagebreak.gif']}"},{i: "plugins/placeholder/placeholder.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/placeholder/placeholder.gif']}"},{i: "plugins/showblocks/images/block_address.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/showblocks/images/block_address.png']}"},{i: "plugins/showblocks/images/block_blockquote.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/showblocks/images/block_blockquote.png']}"},{i: "plugins/showblocks/images/block_div.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/showblocks/images/block_div.png']}"},{i: "plugins/showblocks/images/block_h1.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/showblocks/images/block_h1.png']}"},{i: "plugins/showblocks/images/block_h2.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/showblocks/images/block_h2.png']}"},{i: "plugins/showblocks/images/block_h3.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/showblocks/images/block_h3.png']}"},{i: "plugins/showblocks/images/block_h4.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/showblocks/images/block_h4.png']}"},{i: "plugins/showblocks/images/block_h5.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/showblocks/images/block_h5.png']}"},{i: "plugins/showblocks/images/block_h6.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/showblocks/images/block_h6.png']}"},{i: "plugins/showblocks/images/block_p.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/showblocks/images/block_p.png']}"},{i: "plugins/showblocks/images/block_pre.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/showblocks/images/block_pre.png']}"},{i: "plugins/smiley/images/angel_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/angel_smile.gif']}"},{i: "plugins/smiley/images/angry_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/angry_smile.gif']}"},{i: "plugins/smiley/images/broken_heart.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/broken_heart.gif']}"},{i: "plugins/smiley/images/confused_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/confused_smile.gif']}"},{i: "plugins/smiley/images/cry_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/cry_smile.gif']}"},{i: "plugins/smiley/images/devil_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/devil_smile.gif']}"},{i: "plugins/smiley/images/embaressed_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/embaressed_smile.gif']}"},{i: "plugins/smiley/images/envelope.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/envelope.gif']}"},{i: "plugins/smiley/images/heart.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/heart.gif']}"},{i: "plugins/smiley/images/kiss.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/kiss.gif']}"},{i: "plugins/smiley/images/lightbulb.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/lightbulb.gif']}"},{i: "plugins/smiley/images/omg_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/omg_smile.gif']}"},{i: "plugins/smiley/images/regular_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/regular_smile.gif']}"},{i: "plugins/smiley/images/sad_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/sad_smile.gif']}"},{i: "plugins/smiley/images/shades_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/shades_smile.gif']}"},{i: "plugins/smiley/images/teeth_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/teeth_smile.gif']}"},{i: "plugins/smiley/images/thumbs_down.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/thumbs_down.gif']}"},{i: "plugins/smiley/images/thumbs_up.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/thumbs_up.gif']}"},{i: "plugins/smiley/images/tounge_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/tounge_smile.gif']}"},{i: "plugins/smiley/images/whatchutalkingabout_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/whatchutalkingabout_smile.gif']}"},{i: "plugins/smiley/images/wink_smile.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/smiley/images/wink_smile.gif']}"},{i: "plugins/templates/templates/images/template1.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/templates/templates/images/template1.gif']}"},{i: "plugins/templates/templates/images/template2.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/templates/templates/images/template2.gif']}"},{i: "plugins/templates/templates/images/template3.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/templates/templates/images/template3.gif']}"},{i: "plugins/uicolor/uicolor.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/uicolor/uicolor.gif']}"},{i: "plugins/uicolor/yui/assets/hue_bg.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/uicolor/yui/assets/hue_bg.png']}"},{i: "plugins/uicolor/yui/assets/hue_thumb.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/uicolor/yui/assets/hue_thumb.png']}"},{i: "plugins/uicolor/yui/assets/picker_mask.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/uicolor/yui/assets/picker_mask.png']}"},{i: "plugins/uicolor/yui/assets/picker_thumb.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/plugins/uicolor/yui/assets/picker_thumb.png']}"},{i: "skins/kama/icons.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/icons.png']}"},{i: "skins/kama/icons_rtl.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/icons_rtl.png']}"},{i: "skins/kama/images/dialog_sides.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/images/dialog_sides.gif']}"},{i: "skins/kama/images/dialog_sides.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/images/dialog_sides.png']}"},{i: "skins/kama/images/dialog_sides_rtl.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/images/dialog_sides_rtl.png']}"},{i: "skins/kama/images/mini.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/images/mini.gif']}"},{i: "skins/kama/images/noimage.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/images/noimage.png']}"},{i: "skins/kama/images/sprites.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/images/sprites.png']}"},{i: "skins/kama/images/sprites_ie6.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/images/sprites_ie6.png']}"},{i: "skins/kama/images/toolbar_start.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/kama/images/toolbar_start.gif']}"},{i: "skins/office2003/icons.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/office2003/icons.png']}"},{i: "skins/office2003/icons_rtl.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/office2003/icons_rtl.png']}"},{i: "skins/office2003/images/dialog_sides.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/office2003/images/dialog_sides.gif']}"},{i: "skins/office2003/images/dialog_sides.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/office2003/images/dialog_sides.png']}"},{i: "skins/office2003/images/dialog_sides_rtl.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/office2003/images/dialog_sides_rtl.png']}"},{i: "skins/office2003/images/mini.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/office2003/images/mini.gif']}"},{i: "skins/office2003/images/noimage.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/office2003/images/noimage.png']}"},{i: "skins/office2003/images/sprites.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/office2003/images/sprites.png']}"},{i: "skins/office2003/images/sprites_ie6.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/office2003/images/sprites_ie6.png']}"},{i: "skins/v2/icons.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/icons.png']}"},{i: "skins/v2/icons_rtl.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/icons_rtl.png']}"},{i: "skins/v2/images/dialog_sides.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/images/dialog_sides.gif']}"},{i: "skins/v2/images/dialog_sides.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/images/dialog_sides.png']}"},{i: "skins/v2/images/dialog_sides_rtl.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/images/dialog_sides_rtl.png']}"},{i: "skins/v2/images/mini.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/images/mini.gif']}"},{i: "skins/v2/images/noimage.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/images/noimage.png']}"},{i: "skins/v2/images/sprites.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/images/sprites.png']}"},{i: "skins/v2/images/sprites_ie6.png", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/images/sprites_ie6.png']}"},{i: "skins/v2/images/toolbar_start.gif", o: "#{resource['icefaces.ace:richtextentry/ckeditor/skins/v2/images/toolbar_start.gif']}"}]; if (r.indexOf('://') > -1) { var i = document.location.href.lastIndexOf('/'); r = r.substring(i + 1); }; for (var i = 0, l = mappings.length; i < l; i++) { var m = mappings[i]; if (m.i == r) { return m.o;} } return false; };