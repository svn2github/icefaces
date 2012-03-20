/*
 * Copyright 2004-2012 ICEsoft Technologies Canada Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

//fix for ICE-6481, effective only when the document found in the DOM update is not valid XML
(function() {
    function globalEval(src) {
        if (window.execScript) {
            window.execScript(src);
        } else {
            (function() {
                window.eval.call(window, src);
            })();
        }
    }

    function extractTagContent(tag, html) {
        var start = new RegExp('\<' + tag + '[^\<]*\>', 'g').exec(html);
        var end = new RegExp('\<\/' + tag + '\>', 'g').exec(html);
        if (start && end && start.index && end.index) {
            var tagWithContent = html.substring(start.index, end.index + end[0].length);
            return tagWithContent.substring(tagWithContent.indexOf('>') + 1, tagWithContent.lastIndexOf('<'));
        } else {
            return '';
        }
    }

    function extractSrcAttribute(html) {
        var result = html.match(/src="([\S]*?)"/im);
        return result ? result[1] : null;
    }

    function unescapeHtml(text) {
        if (text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var result = temp.firstChild.data;
            temp.removeChild(temp.firstChild);
            return result;
        } else {
            return text;
        }
    }

    var scriptElementMatcher = /<script[^>]*>([\S\s]*?)<\/script>/igm;
    var client = Client();
    //remember loaded script references
    document.scriptRefs = document.scriptRefs ? document.scriptRefs : [];
    onLoad(window, function() {
        var scriptElements = document.documentElement.getElementsByTagName('script');
        inject(scriptElements, document.scriptRefs, function(result, s) {
            var src = s.getAttribute('src');
            if (src) {
                append(result, src);
            }
            return result;
        });
    });

    function findViewRootUpdate(content) {
        return detect(content.getElementsByTagName('update'), function(update) {
            return update.getAttribute('id') == 'javax.faces.ViewRoot';
        });
    }

    onLoad(window, function() {
        //clear the flag, only DOM updates are supposed to update it
        document.documentElement.isHeadUpdateSuccessful = null;
    });

    namespace.onAfterUpdate(function(content) {
        var rootUpdate = findViewRootUpdate(content);

        //isHeadUpdateSuccessful property is set when a script element rendered in the head is properly evaluated
        if (rootUpdate && !document.documentElement.isHeadUpdateSuccessful) {
            var headContent = extractTagContent('head', rootUpdate.firstChild.data);
            var scriptTags = headContent.match(scriptElementMatcher);
            var scripts = collect(scriptTags, function(script) {
                var src = extractSrcAttribute(script);
                var code;
                if (src) {
                    if (contains(document.scriptRefs, unescapeHtml(src))) {
                        code = '';
                    } else {
                        getSynchronously(client, src, noop, noop, function(response) {
                            code = contentAsText(response);
                        });
                        append(document.scriptRefs, src);
                    }
                } else {
                    code = unescapeHtml(extractTagContent('script', script));
                }
                return code;
            });

            //select only non empty scripts
            each(select(scripts, identity), globalEval);
        } else {
            //clear the flag for the next update
            document.documentElement.isHeadUpdateSuccessful = null;
        }

        //fix for ICE-6916
        if (rootUpdate) {
            document.title = extractTagContent('title', rootUpdate.firstChild.data);
        }
    });

    //ICE-7129 -- remove included iframes before updating the element to avoid a hard crash in IE8
    namespace.onBeforeUpdate(function(updates) {
        each(updates.getElementsByTagName('update'), function(update) {
            var id = update.getAttribute('id');
            var updatedElement = lookupElementById(id);
            if (updatedElement) {
                each(updatedElement.getElementsByTagName('iframe'), function(iframe) {
                    if( iframe && iframe.parentNode ) {
                    	iframe.parentNode.removeChild(iframe);
                    }
                });
            }
        });
    });


    if (!/MSIE/.test(navigator.userAgent)) {
        namespace.onBeforeUpdate(function(content) {
            var rootUpdate = findViewRootUpdate(content);
            //move configuration to the 'html' element to allow the rest of the callbacks to find it once the update is applied
            if (rootUpdate) {
                var configuration = document.body.configuration;
                if (configuration) {
                    document.documentElement.configuration = configuration;
                }
            }
        });
    }

    //ICE-7916 -- fix IE6 flicker
    try {
        document.execCommand("BackgroundImageCache", false, true);
    } catch(err) {
    }
})();