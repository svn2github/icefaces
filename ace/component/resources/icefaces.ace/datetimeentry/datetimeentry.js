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
/**
 *  Calendar Widget
 */
(function($) {
ice.ace.Calendar = function(id, cfg) {
    var behavior, altFieldVal;
    this.id = id;
    this.cfg = cfg;
    this.jqId = ice.ace.escapeClientId(id);
    this.jqElId = this.cfg.popup ? this.jqId + '_input' : this.jqId + '_inline';
    this.jq = $(this.jqElId);
    this.cfg.formId = this.jq.parents('form:first').attr('id');

    //i18n and l7n
    this.configureLocale();

    //Override locale pattern with user pattern
    if(this.cfg.pattern) {
        this.cfg.dateFormat = this.cfg.pattern;
    }

    //Select listener
    this.bindDateSelectListener();

    //Form field to use in inline mode
    if(!this.cfg.popup) {
        this.cfg.altField = $(this.jqId + '_input');
        altFieldVal = this.cfg.altField.val();
    }

    var hasTimePicker = this.hasTimePicker();

    //Setup timepicker
    if(hasTimePicker) {
        this.configureTimePicker();
    }

    if (this.cfg.withinSingleSubmit) {
        ice.cancelSingleSubmit(this.cfg.clientId);
    }

    //Initialize calendar
    if(!this.cfg.disabled) {
        if(hasTimePicker) {
            if(this.cfg.timeOnly)
                this.jq.timepicker(this.cfg);
            else {
                this.cfg.altFieldTimeOnly = false;
                this.jq.datetimepicker(this.cfg);
                if (!this.cfg.popup && $.type(altFieldVal) === "string") {
                    this.cfg.altField.val(altFieldVal);
                }
            }
        }
        else {
            this.jq.datepicker(this.cfg);
        }
    }

    //Client behaviors and input skinning
    if(this.cfg.popup) {
        if(this.cfg.behaviors) {
            ice.ace.attachBehaviors(this.jq, this.cfg.behaviors);
        }

        //Visuals
        if(this.cfg.popup && this.cfg.theme != false) {
            ice.ace.skinInput(this.jq);
        }
        behavior = this.cfg && this.cfg.behaviors && this.cfg.behaviors.dateTextChange;
        if (behavior) {
            this.jq.change(function() {
                setFocus();
                ice.ace.ab(behavior);
            });
        } else if (this.cfg.singleSubmit) {
            this.jq.change(function(event) {
                setFocus();
                ice.se(event, cfg.clientId);
            });
        }
    }
};

ice.ace.Calendar.prototype.configureLocale = function() {
    var localeSettings = ice.ace.locales[this.cfg.locale];
	
    if(localeSettings) {
        for(var setting in localeSettings) {
            this.cfg[setting] = localeSettings[setting];
        }
    }
}

ice.ace.Calendar.prototype.bindDateSelectListener = function() {
    var _self = this;
    var behavior = this.cfg && this.cfg.behaviors && this.cfg.behaviors.dateSelect;

    if(this.cfg.behaviors) {
        this.cfg.onSelect = function(dateText, input) {
            var dateSelectBehavior = _self.cfg.behaviors['dateSelect'];

            if (dateSelectBehavior)
                ice.ace.ab.call(_self, dateSelectBehavior);
        };
    }
    if (!behavior && this.cfg.singleSubmit) {
        this.cfg.onSelect = function(dateText, inst) {
            ice.se(null, _self.cfg.clientId, function(){}, function(onBeforeSubmit, onBeforeUpdate, onAfterUpdate) {
                //collect the IDs of the input elements found in the page to later look up the newly DOM elements
                var inputs = [];
                for (var i = 0, l = inst.input.length; i < l; i++) {
                    inputs[i] = inst.input[i].id;
                }
                onBeforeUpdate(function() {
                    //erase focus so that ice.applyFocus will actually focus the element
                    //(ice.applyFocus won't invoke Element.focus() on an element that is already assumed to be focused)
                    ice.setFocus('');
                });
                onAfterUpdate(function() {
                    //re-wire the 'onfocus' callbacks with the new elements (after the update was applied)
                    //todo: add 'onfocus' callbacks only if latest calendar configuration require it
                    setTimeout(function() {
                        var addFocusCallback = document.addEventListener ?
                            function(element, callback) {
                                element.addEventListener('focus', callback, false);
                            } :
                            function(element, callback) {
                                element.attachEvent('onfocus', callback);
                            };
                        for (var i = 0, l = inputs.length; i < l; i++) {
                            var input = document.getElementById(inputs[i]);
                            if (input) {
                                addFocusCallback(input, function() {
                                    $.datepicker._showDatepicker(input);
                                });
                            }
                        }
                    }, 500);
                });
            });
        };
    }

};

ice.ace.Calendar.prototype.configureTimePicker = function() {
    var pattern = this.cfg.dateFormat,
    timeSeparatorIndex = pattern.indexOf('h');
    
    this.cfg.dateFormat = pattern.substring(0, timeSeparatorIndex - 1);
    this.cfg.timeFormat = pattern.substring(timeSeparatorIndex, pattern.length);

    //second
    if(this.cfg.timeFormat.indexOf('ss') != -1) {
        this.cfg.showSecond = true;
    }

    //ampm
    if(this.cfg.timeFormat.indexOf('TT') != -1) {
        this.cfg.ampm = true;
    }
}

ice.ace.Calendar.prototype.hasTimePicker = function() {
    return this.cfg.dateFormat.indexOf('h') != -1;
}

ice.ace.Calendar.prototype.setDate = function(date) {
    this.jq.datetimepicker('setDate', date);
}

ice.ace.Calendar.prototype.getDate = function() {
    return this.jq.datetimepicker('getDate');
}

ice.ace.Calendar.prototype.enable = function() {
    this.jq.datetimepicker('enable');
}

ice.ace.Calendar.prototype.disable = function() {
    this.jq.datetimepicker('disable');
}
}(ice.ace.jq));
