if (!window['ice']) window.ice = {};
if (!window.ice['ace']) window.ice.ace = {};
ice.ace.Autocompleters = {};

ice.ace.Autocompleter = function(id, updateId, options, rowClass, selectedRowClass, partialSubmit) {
	rowClass = 'iceSelInpTxtRow';
	selectedRowClass = 'iceSelInpTxtSelRow';
	this.id = id;
	ice.ace.Autocompleters[this.id] = this;
	this.partialSubmit = partialSubmit;
	//var existing = Autocompleter.Finder.list[id];
	//if (!Prototype.Browser.IE && existing && !existing.monitor.changeDetected()) { //@ custom detection
	//	return;
	//}

	if (options)
		options.minChars = 0;
	else
		options = {minChars:0};
	var element = ice.ace.jq(ice.ace.escapeClientId(id)).get(0); //@ ice.ace.jq #
	var ue = ice.ace.jq(ice.ace.escapeClientId(updateId)).get(0); //@ ice.ace.jq #
	this.baseInitialize(element, ue, options, rowClass, selectedRowClass);

	var self = this;
	this.options.onComplete = function() { self.onComplete() }; //@ self technique #
	this.options.defaultParams = this.options.parameters || null;
	//this.monitor = new Ice.AutocompleterMonitor(element, ue, options, rowClass, selectedRowClass);
	//this.monitor.object = this;
	//if (!Prototype.Browser.IE) { //@ custom detection
	//	Ice.StateMon.add(this.monitor);
	//}
	//Autocompleter.Finder.add(this.element, this);
};

ice.ace.Autocompleter.keys = {
KEY_BACKSPACE: 8,
KEY_TAB:       9,
KEY_RETURN:   13,
KEY_ESC:      27,
KEY_LEFT:     37,
KEY_UP:       38,
KEY_RIGHT:    39,
KEY_DOWN:     40,
KEY_DELETE:   46,
KEY_HOME:     36,
KEY_END:      35,
KEY_PAGEUP:   33,
KEY_PAGEDOWN: 34,
KEY_INSERT:   45
};

ice.ace.Autocompleter.Browser = (function() {
        var ua = navigator.userAgent;
        var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
        return {
            IE:             !!window.attachEvent && !isOpera,
            Opera:          isOpera,
            WebKit:         ua.indexOf('AppleWebKit/') > -1,
            Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
            MobileSafari:   /Apple.*Mobile/.test(ua)
        }
    })();

ice.ace.Autocompleter.collectTextNodes = function(element) {
	var children = element.childNodes;
	var str = '';
	for (var i = 0; i < children.length; i++) {
		var node = children[i];
		str += node.nodeType == 3 ? node.nodeValue : ( node.childNodes.length > 0 ? ice.ace.Autocompleter.collectTextNodes(node) : '');
	}
	return str;
};

ice.ace.Autocompleter.collectTextNodesIgnoreClass = function(element, className) {
	var children = element.childNodes;
	var str = '';
	for (var i = 0; i < children.length; i++) {
		var node = children[i];
		str += node.nodeType == 3 ? node.nodeValue : ( node.childNodes.length > 0 && !ice.ace.jq(node).hasClass(className) ? ice.ace.Autocompleter.collectTextNodesIgnoreClass(node, className) : '' );
	}
	return str;
};

ice.ace.Autocompleter.cleanWhitespace = function(element) {
	var node = element.firstChild;
	while (node) {
		var nextNode = node.nextSibling;
		if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
			element.removeChild(node);
		node = nextNode;
	}
	return element;
};

ice.ace.Autocompleter.prototype = {

    baseInitialize: function(element, update, options, rowC, selectedRowC) {
        this.element = element; //@ ice.ace.jq #
        this.update = update; //@ ice.ace.jq #
        this.hasFocus = false;
        this.changed = false;
        this.active = false;
        this.index = -1;
        this.entryCount = 0;
        this.rowClass = rowC;
        this.selectedRowClass = selectedRowC;

        if (this.setOptions)
            this.setOptions(options);
        else
            this.options = options || {};

        this.options.paramName = this.options.paramName || this.element.name;
        this.options.tokens = this.options.tokens || [];
        this.options.frequency = this.options.frequency || 0.4;
        this.options.minChars = this.options.minChars || 1;
        this.options.onShow = this.options.onShow ||
            function(element, update) {
                // Based on code from MSDN
                var ieEngine = null;
                if (window.navigator.appName == "Microsoft Internet Explorer") {
                    if (document.documentMode) {
                        ieEngine = document.documentMode;
                    } else if (document.compatMode && document.compatMode == "CSS1Compat") {
                        ieEngine = 7;
                    } else {
                        ieEngine = 5;
                    }
                }
                try {
                    if (update["style"] && (!update.style.position || update.style.position == 'absolute')) {
                        update.style.position = 'absolute';
                        //Position.clone(element, update, {setHeight: false, offsetTop: element.offsetHeight}); //@ jq position #
                        //update.clonePosition(element.parentNode, {setTop:false, setWidth:false, setHeight:false, //@ jq clone node #
                        //    offsetLeft: element.offsetLeft - element.parentNode.offsetLeft});
						var jqElement = ice.ace.jq(element);
						var pos = jqElement.offset();
						ice.ace.jq(update).css({ position: "absolute", top: pos.top + jqElement.height(), left: pos.left, marginTop: 0, marginLeft: 0, width: jqElement.width(), height: 'auto'});
                        if (ieEngine >= 7) {
                            var savedPos = element.style.position;
                            element.style.position = "relative";
                            update.style.left = element.offsetLeft + "px";
                            if (ieEngine == 7) {
                                update.style.top = (element.offsetTop + element.offsetHeight) + "px";
                            } else {
                                var scrollTop = pos.top - document.documentElement.scrollTop; //@ cumulativeScrollOffset #
                                update.style.top = (element.offsetTop - scrollTop + element.offsetHeight) + "px";
                            }
                            element.style.position = savedPos;
                        }
                    }
                    ice.ace.jq(update).fadeIn(150) //@ jq effects #
                } catch(e) {
                    //logger.info(e);
                }
            };
        this.options.onHide = this.options.onHide ||
            function(element, update) {
			ice.ace.jq(update).fadeOut(150) //@ jq effects #
            };

        if (typeof(this.options.tokens) == 'string')
            this.options.tokens = new Array(this.options.tokens);

        this.observer = null;
        this.element.setAttribute('autocomplete', 'off');
        ice.ace.jq(this.update).hide(); // @ jq hide #
        //Event.observe(this.element, "blur", this.onBlur.bindAsEventListener(this)); //@ jq event #
		var self = this;
		ice.ace.jq(this.element).on("blur", function(e) { self.onBlur.call(self, e); });
        var keyEvent = "keypress";
        if (ice.ace.Autocompleter.Browser.IE || ice.ace.Autocompleter.Browser.WebKit) { //@ custom detection #
            keyEvent = "keyup";
        }
        //Event.observe(this.element, keyEvent, this.onKeyPress.bindAsEventListener(this)); //@ jq event #
		ice.ace.jq(this.element).on(keyEvent, function(e) { self.onKeyPress.call(self, e); });
        // ICE-3830
        if (ice.ace.Autocompleter.Browser.IE || ice.ace.Autocompleter.Browser.WebKit) //@ custom detection #
            //Event.observe(this.element, "paste", this.onPaste.bindAsEventListener(this)); //@ jq event #
		ice.ace.jq(this.element).on("paste", function(e) { self.onPaste.call(self, e); });
    },

    show: function() {
        try {
            if (ice.ace.jq(this.update).css('display') == 'none')this.options.onShow(this.element, this.update); //@ jq css #
            if (!this.iefix &&
                (navigator.appVersion.indexOf('MSIE') > 0) &&
                (navigator.userAgent.indexOf('Opera') < 0) &&
                (ice.ace.jq(this.update).css('position') == 'absolute')) { //@ jq css #
                new Insertion.After(this.update, //@ jq insert
                    '<iframe id="' + this.update.id + '_iefix" title="IE6_Fix" ' +
                        'style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" ' +
                        'src="javascript:\'<html></html>\'" frameborder="0" scrolling="no"></iframe>');
                this.iefix = ice.ace.jq('#' + this.update.id + '_iefix').get(0); //@ ice.ace.jq #
            }
            if (this.iefix) setTimeout(this.fixIEOverlapping.bind(this), 50);
            this.element.focus();
        } catch (e) {
            //logger.info(e);
        }
    },

    fixIEOverlapping: function() {
        try {
		var pos = ice.ace.jq(this.update).offset();
            ice.ace.jq(this.iefix).css(pos); //@ jq position #
            this.iefix.style.zIndex = 1;
            this.update.style.zIndex = 2;
            ice.ace.jq(this.iefix).show(); //@ jq show #
        } catch(e) {
            //logger.info(e);
        }
    },

    hide: function() {
        this.stopIndicator();
        if (ice.ace.jq(this.update).css('display') != 'none') this.options.onHide(this.element, this.update); //@ jq css #
        if (this.iefix) ice.ace.jq(this.iefix).hide(); //@ jq hide #
    },

    startIndicator: function() {
        if (this.options.indicator) ice.ace.jq(this.options.indicator).show(); //@ jq show #
    },

    stopIndicator: function() {
        if (this.options.indicator) ice.ace.jq(this.options.indicator).hide();; //@ jq hide #
    },

    onKeyPress: function(event) {
        if (!this.active) {
            switch (event.keyCode) {
                case ice.ace.Autocompleter.keys.KEY_TAB: //@ replace key code #
                case ice.ace.Autocompleter.keys.KEY_RETURN: //@ replace key code #
                    this.getUpdatedChoices(true, event, -1);
                    return;
                case ice.ace.Autocompleter.keys.KEY_DOWN: //@ replace key code #
                    this.getUpdatedChoices(false, event, -1);
                    return;
            }
        }

        if (this.active) {
            switch (event.keyCode) {
                case ice.ace.Autocompleter.keys.KEY_TAB: //@ replace key code #
                case ice.ace.Autocompleter.keys.KEY_RETURN: //@ replace key code #
                    //this.selectEntry();
                    //Event.stop(event);

                    this.hidden = true; // Hack to fix before beta. Was popup up the list after a selection was made
                    var idx = this.selectEntry();
                    this.getUpdatedChoices(true, event, idx);
                    this.hide();
                    //Event.stop(event); //@ jq event #
					event.stopPropagation();
					event.preventDefault();
                    return;
                case ice.ace.Autocompleter.keys.KEY_ESC: //@ replace key code #
                    this.hide();
                    this.active = false;
                    //Event.stop(event);  //@ jq event #
					event.stopPropagation();
					event.preventDefault();
                    return;
                case ice.ace.Autocompleter.keys.KEY_LEFT: //@ replace key code #
                case ice.ace.Autocompleter.keys.KEY_RIGHT: //@ replace key code #
                    return;
                case ice.ace.Autocompleter.keys.KEY_UP: //@ replace key code #
                    this.markPrevious();
                    this.render();
                    //if(navigator.appVersion.indexOf('AppleWebKit')>0)
                    //Event.stop(event); //@ jq event #
					event.stopPropagation();
					event.preventDefault();
                    return;
                case ice.ace.Autocompleter.keys.KEY_DOWN: //@ replace key code #
                    this.markNext();
                    this.render();
                    //if(navigator.appVersion.indexOf('AppleWebKit')>0)
                    //Event.stop(event); //@ jq event #
					event.stopPropagation();
					event.preventDefault();
                    return;
            }
        }
        else {
            if (event.keyCode == ice.ace.Autocompleter.keys.KEY_TAB || event.keyCode == ice.ace.Autocompleter.keys.KEY_RETURN) return; //@ replace key code #
        }

        this.changed = true;
        this.hasFocus = true;
        this.index = -1;
        //This is to avoid an element being select because the mouse just happens to be over the element when the list pops up
        this.skip_mouse_hover = true;
        if (this.active) this.render();
        if (this.observer) clearTimeout(this.observer);
		var self = this;
        this.observer = setTimeout(function() { self.onObserverEvent() }, this.options.frequency * 1000); //@ self technique #
    },

    onKeyDown: function(event) {
        if (!this.active) {
            switch (event.keyCode) {
                case ice.ace.Autocompleter.keys.KEY_DOWN: //@ replace key code #
                    this.getUpdatedChoices(false, event, -1);
                    return;
                case ice.ace.Autocompleter.keys.KEY_BACKSPACE: //@ replace key code #
                case ice.ace.Autocompleter.keys.KEY_DELETE: //@ replace key code #
                    if (this.observer) clearTimeout(this.observer);
				var self = this;
                    this.observer = setTimeout( function() { self.onObserverEvent() }, this.options.frequency * 1000); //@ self technique #
                    return;
            }
        }
        else if (this.active) {
            switch (event.keyCode) {
                case ice.ace.Autocompleter.keys.KEY_UP: //@ replace key code #
                    this.markPrevious();
                    this.render();
                    //Event.stop(event); //@ jq event #
					event.stopPropagation();
					event.preventDefault();
                    return;
                case ice.ace.Autocompleter.keys.KEY_DOWN: //@ replace key code #
                    this.markNext();
                    this.render();
                    //Event.stop(event); //@ jq event #
					event.stopPropagation();
					event.preventDefault();
                    return;
                case ice.ace.Autocompleter.keys.KEY_ESC: //@ replace key code #
                    if (ice.ace.Autocompleter.Browser.WebKit) { //@ custom detection #
                        this.hide();
                        this.active = false;
                        //Event.stop(event); //@ jq event #
					event.stopPropagation();
					event.preventDefault();
                        return;
                    }
                case ice.ace.Autocompleter.keys.KEY_BACKSPACE: //@ replace key code #
                case ice.ace.Autocompleter.keys.KEY_DELETE: //@ replace key code #
                    if (this.observer) clearTimeout(this.observer);
					var self = this;
                    this.observer = setTimeout(function() { self.onObserverEvent() }, this.options.frequency * 1000); //@ self technique #
                    return;
            }
        }
    },

    activate: function() {
        this.changed = false;
        this.hasFocus = true;
    },

    onHover: function(event) {
        //var element = Event.findElement(event, 'DIV'); //@ jq event #
		var element = ice.ace.jq(event.currentTarget).closest('div').get(0);
        if (this.index != element.autocompleteIndex) {
            if (!this.skip_mouse_hover) this.index = element.autocompleteIndex;
            this.render();
        }
        //Event.stop(event); //@ jq event #
		event.stopPropagation();
		event.preventDefault();
    },

    onMove: function(event) {
        if (this.skip_mouse_hover) {
            this.skip_mouse_hover = false;
            this.onHover(event);
        }
    },

    onClick: function(event) {
        this.hidden = true;
        // Hack to fix before beta. Was popup up the list after a selection was made
        //var element = Event.findElement(event, 'DIV'); //@ jq event #
		var element = ice.ace.jq(event.currentTarget).closest('div').get(0);
        this.index = element.autocompleteIndex;
        var idx = element.autocompleteIndex;
        this.selectEntry();
        this.getUpdatedChoices(true, event, idx);
        this.hide();
    },

    onBlur: function(event) {
        if (navigator.userAgent.indexOf("MSIE") >= 0) { // ICE-2225
            var strictMode = document.compatMode && document.compatMode == "CSS1Compat";
            var docBody = strictMode ? document.documentElement : document.body;
            // Right or bottom border, if any, will be treated as scrollbar.
            // No way to determine their width or scrollbar width accurately.
            if (event.clientX > docBody.clientLeft + docBody.clientWidth || //@ jq event ?
                event.clientY > docBody.clientTop + docBody.clientHeight) { //@ jq event ?
                this.element.focus();
                return;
            }
        }
        // needed to make click events working
		var self = this;
        setTimeout(function () { self.hide(); }, 250); //@ self technique #
        this.hasFocus = false;
        this.active = false;
    },

    // ICE-3830
    onPaste: function(event) {
        this.changed = true;
        this.hasFocus = true;
        this.index = -1;
        this.skip_mouse_hover = true;
        if (this.active) this.render();
        if (this.observer) clearTimeout(this.observer);
		var self = this;
        this.observer = setTimeout(function() { self.onObserverEvent(); }, this.options.frequency * 1000); //@ self technique #
        return;
    },

    render: function() {
        if (this.entryCount > 0) {
            for (var i = 0; i < this.entryCount; i++)
                if (this.index == i) {
                    ar = this.rowClass.split(" ");
                    for (var ai = 0; ai < ar.length; ai++)
                        ice.ace.jq(this.getEntry(i)).removeClass(ar[ai]); //@ jq removeClass #
                    ar = this.selectedRowClass.split(" ");
                    for (var ai = 0; ai < ar.length; ai++)
                        ice.ace.jq(this.getEntry(i)).addClass(ar[ai]); //@ jq addClass #
                }
                else {
                    ar = this.selectedRowClass.split(" ");
                    for (var ai = 0; ai < ar.length; ai++)
                        ice.ace.jq(this.getEntry(i)).removeClass(ar[ai]); //@ jq removeClass #
                    ar = this.rowClass.split(" ");
                    for (var ai = 0; ai < ar.length; ai++)
                        ice.ace.jq(this.getEntry(i)).addClass(ar[ai]); //@ jq addClass #
                }
            if (this.hasFocus) {
                this.show();
                this.active = true;
            }
        } else {
            this.active = false;
            this.hide();
        }
    },

    markPrevious: function() {
        if (this.index > 0) this.index--
        else this.index = this.entryCount - 1;
    },

    markNext: function() {
        if (this.index == -1) {
            this.index++;
            return;
        }
        if (this.index < this.entryCount - 1) this.index++
        else this.index = 0;
    },

    getEntry: function(index) {
        try {
            return this.update.firstChild.childNodes[index];
        } catch(ee) {
            return null;
        }
    },

    getCurrentEntry: function() {
        return this.getEntry(this.index);
    },

    selectEntry: function() {
        var idx = -1;
        this.active = false;
        if (this.index >= 0) {
            idx = this.index;
            this.updateElement(this.getCurrentEntry());
            this.index = -1;
        }
        return idx;
    },

    updateElement: function(selectedElement) {
        if (this.options.updateElement) {
            this.options.updateElement(selectedElement);
            return;
        }
        var value = '';
        if (this.options.select) {
            var nodes = document.getElementsByClassName(this.options.select, selectedElement) || [];
            if (nodes.length > 0) value = ice.ace.Autocompleter.collectTextNodes(nodes[0], this.options.select); //@ jq custom fn #
        } else {
            value = ice.ace.Autocompleter.collectTextNodesIgnoreClass(selectedElement, 'informal'); //@ jq custom fn # TODO: collectTextNodesIgnoreClass
	}

        var lastTokenPos = this.findLastToken();
        if (lastTokenPos != -1) {
            var newValue = this.element.value.substr(0, lastTokenPos + 1);
            var whitespace = this.element.value.substr(lastTokenPos + 1).match(/^\s+/);
            if (whitespace)
                newValue += whitespace[0];
            this.element.value = newValue + value;
        } else {
            this.element.value = value;
        }
        this.element.focus();

        if (this.options.afterUpdateElement)
            this.options.afterUpdateElement(this.element, selectedElement);
    },

    updateChoices: function(choices) {
        if (!this.changed && this.hasFocus) {
            this.update.innerHTML = choices;
            ice.ace.Autocompleter.cleanWhitespace(this.update); //@ custom fn #
            ice.ace.Autocompleter.cleanWhitespace(this.update.firstChild); //@ custom fn #

            if (this.update.firstChild && this.update.firstChild.childNodes) {
                this.entryCount =
                    this.update.firstChild.childNodes.length;
                for (var i = 0; i < this.entryCount; i++) {
                    var entry = this.getEntry(i);
                    entry.autocompleteIndex = i;
                    this.addObservers(entry);
                }
            } else {
                this.entryCount = 0;
            }
            this.stopIndicator();
            this.index = -1;
            this.render();
        } else {

        }
    },

    addObservers: function(element) {
		var self = this;
        //Event.observe(element, "mouseover", this.onHover.bindAsEventListener(this)); //@ jq event #
		ice.ace.jq(element).on("mouseover", function(e) { self.onHover.call(self, e); });
        //Event.observe(element, "click", this.onClick.bindAsEventListener(this)); //@ jq event #
		ice.ace.jq(element).on("click", function(e) { self.onClick.call(self, e); });
        //Event.observe(element, "mousemove", this.onMove.bindAsEventListener(this)); //@ jq event #
		ice.ace.jq(element).on("mousemove", function(e) { self.onMove.call(self, e); });
    },

    dispose:function() {
        for (var i = 0; i < this.entryCount; i++) {
            var entry = this.getEntry(i);
            entry.autocompleteIndex = i;
            //Event.stopObserving(entry, "mouseover", this.onHover); //@ jq event #
			ice.ace.jq(entry).off('mouseover');
            //Event.stopObserving(entry, "click", this.onClick); //@ jq event #
			ice.ace.jq(entry).off('click');
            //Event.stopObserving(entry, "mousemove", this.onMove); //@ jq event #
			ice.ace.jq(entry).off('mousemove');
        }
        //Event.stopObserving(this.element, "mouseover", this.onHover); //@ jq event #
		ice.ace.jq(this.element).off('mouseover');
        //Event.stopObserving(this.element, "click", this.onClick); //@ jq event #
		ice.ace.jq(this.element).off('click');
        //Event.stopObserving(this.element, "mousemove", this.onMove); //@ jq event #
		ice.ace.jq(this.element).off('mousemove');
        //Event.stopObserving(this.element, "blur", this.onBlur); //@ jq event #
		ice.ace.jq(this.element).off('blur');
        //Event.stopObserving(this.element, "keypress", this.onKeyPress); //@ jq event #
		ice.ace.jq(this.element).off('keypress');
        if (ice.ace.Autocompleter.Browser.IE || ice.ace.Autocompleter.Browser.WebKit) //@ custom detection #
            //Event.stopObserving(this.element, "keydown", this.onKeyDown); //@ jq event #
			ice.ace.jq(this.element).off('keydown');
        //Autocompleter.Finder.list[this.element.id] = null;
    },

    onObserverEvent: function() {
        this.changed = false;
        if (this.getToken().length >= this.options.minChars) {
            this.startIndicator();
            this.getUpdatedChoices(false, undefined, -1);
        } else {
            this.active = false;
            this.hide();
            this.getUpdatedChoices(false, undefined, -1);
        }
    },

    getToken: function() {
        var tokenPos = this.findLastToken();
        if (tokenPos != -1)
            var ret = this.element.value.substr(tokenPos + 1).replace(/^\s+/, '').replace(/\s+$/, '');
        else
            var ret = this.element.value;

        return /\n/.test(ret) ? '' : ret;
    },

    findLastToken: function() {
        var lastTokenPos = -1;

        for (var i = 0; i < this.options.tokens.length; i++) {
            var thisTokenPos = this.element.value.lastIndexOf(this.options.tokens[i]);
            if (thisTokenPos > lastTokenPos)
                lastTokenPos = thisTokenPos;
        }
        return lastTokenPos;
    },

    getUpdatedChoices: function(isEnterKey, event, idx) {
        if (!event) {
            event = new Object();
        }
        entry = encodeURIComponent(this.options.paramName) + '=' +
            encodeURIComponent(this.getToken());

        this.options.parameters = this.options.callback ?
            this.options.callback(this.element, entry) : entry;

        if (this.options.defaultParams)
            this.options.parameters += '&' + this.options.defaultParams;

        var form = Ice.util.findForm(this.element);
        if (idx > -1) {
            var indexName = this.element.id + "_idx";
            form[indexName].value = idx;
        }

        //     form.focus_hidden_field.value=this.element.id;
        if (isEnterKey && !this.partialSubmit) {
            //iceSubmit(form, this.element, event);
			ice.s(event, this.element);
        }
        else {
            //iceSubmitPartial(form, this.element, event);
			ice.s(event, this.element);
        }

        var indexName = this.element.id + "_idx";
        form[indexName].value = "";
    },

    onComplete: function(request) {
        this.updateChoices(request.responseText);
    },

    updateNOW: function(text) {


        if (this.hidden) {
            this.hidden = false;
            return;
        }
        this.hasFocus = true;
        ice.ace.Autocompleter.cleanWhitespace(this.update); //@ custom fn #
        this.updateChoices(text);
        this.show();
        this.render();
    }
}
