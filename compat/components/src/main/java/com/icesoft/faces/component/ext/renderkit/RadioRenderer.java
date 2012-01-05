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

package com.icesoft.faces.component.ext.renderkit;

import com.icesoft.faces.context.DOMContext;
import com.icesoft.faces.renderkit.dom_html_basic.HTML;

import org.w3c.dom.Element;



public class RadioRenderer
        extends com.icesoft.faces.renderkit.dom_html_basic.RadioRenderer {

    protected Element getTableElement(DOMContext domContext) {
        return (Element) domContext.getRootNode().getFirstChild();
    }
    
    protected Element createRootNode(DOMContext domContext) {
        Element rootElement = domContext.createRootElement(HTML.FIELDSET_ELEM);
        Element tableElement = domContext.createElement(HTML.TABLE_ELEM);
        tableElement.setAttribute("cellpadding", "0");
        tableElement.setAttribute("cellspacing", "0");
        rootElement.appendChild(tableElement);
        return rootElement;
    }
}
