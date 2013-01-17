/*
 * Copyright 2004-2013 ICEsoft Technologies Canada Corp.
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

package com.icesoft.faces.renderkit.dom_html_basic;

import com.icesoft.faces.component.AttributeConstants;
import com.icesoft.faces.context.DOMContext;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.Text;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import java.io.IOException;

/*
* Renderer class for a label element.
*
* This label can be associated with another component. The component that
* this label is associated with is known as the 'for' component.
* At the time of rendering of this label, its for component may not have
* been created yet and thus it's impossible to get the client id from the
* for component. This class provides a method for fabricating the client id
* of the for component
*
* An assumption found within this class is that the for component and
* the label component are within the same form.
*
*/

public class LabelRenderer extends DomBasicInputRenderer {

    private static final String[] passThruAttributes = AttributeConstants.getAttributes(AttributeConstants.H_OUTPUTLABEL);
    public void encodeBegin(FacesContext facesContext, UIComponent uiComponent)
            throws IOException {

        validateParameters(facesContext, uiComponent, null);

        DOMContext domContext =
                DOMContext.attachDOMContext(facesContext, uiComponent);

        if (!domContext.isInitialized()) {
            Element root = domContext.createElement("label");
            domContext.setRootNode(root);
            setRootElementId(facesContext, root, uiComponent);
            PassThruAttributeRenderer.renderHtmlAttributes(
                    facesContext, uiComponent, passThruAttributes);
        }
        Element root = (Element) domContext.getRootNode();

        // Obtain the client id of the 'for' component. If the component
        // already exists then query the object for its client id.
        // If the for component does not yet exist then fabricate
        // its client id.
        // Note that the value of the "for" attribute is the id of the 
        // for component
        UIComponent forComponent = null;
        String forComponentClientId = null;
        String forAttribute = (String) uiComponent.getAttributes().get("for");
        if (forAttribute != null) {
            forComponent = findForComponent(facesContext, uiComponent);
            if (forComponent != null) {
                forComponentClientId = forComponent.getClientId(facesContext);
            } else {
                forComponentClientId = fabricateClientId(uiComponent,
                                                         facesContext,
                                                         forAttribute);
            }
        }
        // if the forAttribute exists then we queried or constructed the 
        // for component's client id; render it as the value of the for attribute
        if (forComponentClientId != null) {
            root.setAttribute("for", forComponentClientId);
        }
        String styleClass =
                (String) uiComponent.getAttributes().get("styleClass");
        if (styleClass != null) {
            root.setAttribute("class", styleClass);
        }
        String currentValue = getValue(facesContext, uiComponent);
        if (currentValue != null && currentValue.length() != 0) {
            Node firstChild = root.getFirstChild();
            if (firstChild != null && firstChild instanceof Text) {
                ((Text) firstChild).setData(currentValue);
            } else {
                root.appendChild(
                        domContext.createTextNode(currentValue));
            }
        }

        domContext.stepInto(uiComponent);
    }

    public void encodeChildren(FacesContext facesContext,
                               UIComponent uiComponent)
            throws IOException {
        validateParameters(facesContext, uiComponent, null);
        super.encodeChildren(facesContext, uiComponent);
    }

    public void encodeEnd(FacesContext facesContext, UIComponent uiComponent)
            throws IOException {
        validateParameters(facesContext, uiComponent, null);
        DOMContext domContext =
                DOMContext.getDOMContext(facesContext, uiComponent);
        domContext.stepOver();
    }


} 
