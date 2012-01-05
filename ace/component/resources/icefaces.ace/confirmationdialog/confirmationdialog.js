/* 
* Original Code developed and contributed by Prime Technology. 
* Subsequent Code Modifications Copyright 2011-2012 ICEsoft Technologies Canada Corp. (c)
* 
* Licensed under the Apache License, Version 2.0 (the "License"); 
* you may not use this file except in compliance with the License. 
* You may obtain a copy of the License at 
* 
* http://www.apache.org/licenses/LICENSE-2.0 
* 
* Unless required by applicable law or agreed to in writing, software 
* distributed under the License is distributed on an "AS IS" BASIS, 
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
* See the License for the specific language governing permissions and 
* limitations under the License. 
* 
* NOTE THIS CODE HAS BEEN MODIFIED FROM ORIGINAL FORM 
* 
* Subsequent Code Modifications have been made and contributed by ICEsoft Technologies Canada Corp. (c). 
* 
* Code Modification 1: Integrated with ICEfaces Advanced Component Environment. 
* Contributors: ICEsoft Technologies Canada Corp. (c) 
* 
* Code Modification 2: [ADD BRIEF DESCRIPTION HERE] 
* Contributors: ______________________ 
* Contributors: ______________________ 
* 
*/

/**
 *  ConfirmDialog Widget
 */
ice.ace.ConfirmDialog = function(id, cfg) {
    this.id = id;
    this.cfg = cfg;
    this.jqId = ice.ace.escapeClientId(id);
    this.jq = jQuery(this.jqId);
    this.cfg.resizable = false;
    this.cfg.autoOpen = false;

    //Remove scripts to prevent duplicate widget issues
    this.jq.find("script").remove();

    //Create dialog
    this.jq.dialog(this.cfg);

    //Setup button pane
    var buttons = jQuery(this.jqId + '_buttons');
    buttons.addClass('ui-dialog-buttonpane ui-widget-content ui-helper-clearfix');
//    buttons.appendTo(buttons.parent().parent()).addClass('ui-dialog-buttonpane ui-widget-content ui-helper-clearfix');

    //Close icon
    if(this.cfg.closable == false) {
        jQuery(this.jqId).parent().find('.ui-dialog-titlebar-close').hide();
    }

//    if(this.cfg.appendToBody) {
//        this.jq.parent().appendTo(document.body);
//    }

};

ice.ace.ConfirmDialog.prototype.show = function() {
    this.jq.dialog('open');
};

ice.ace.ConfirmDialog.prototype.hide = function() {
    this.jq.dialog('close');
};