/*
 * Original Code Copyright Prime Technology.
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
 * Code Modification 2: (ICE-6978) Used JSONBuilder to add the functionality of escaping JS output.
 * Contributors: ICEsoft Technologies Canada Corp. (c)
 */
package org.icefaces.ace.component.dialog;

import java.io.IOException;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;

import org.icefaces.ace.renderkit.CoreRenderer;
import org.icefaces.ace.util.JSONBuilder;
import org.icefaces.render.MandatoryResourceComponent;
import org.icefaces.util.EnvUtils;

@MandatoryResourceComponent(tagName="dialog", value="org.icefaces.ace.component.dialog.Dialog")
public class DialogRenderer extends CoreRenderer {

    @Override
    public void decode(FacesContext context, UIComponent component) {
        super.decodeBehaviors(context, component);
    }

    @Override
    public void encodeEnd(FacesContext context, UIComponent component) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        Dialog dialog = (Dialog) component;
        String clientId = dialog.getClientId(context);

        writer.startElement("div", null);
        writer.writeAttribute("id", clientId, null);

        encodeMarkup(context, dialog);
        encodeScript(context, dialog);

        writer.endElement("div");
    }

    protected void encodeScript(FacesContext context, Dialog dialog) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        String clientId = dialog.getClientId(context);
        boolean ariaEnabled = EnvUtils.isAriaEnabled(context);

        writer.startElement("script", null);
        writer.writeAttribute("type", "text/javascript", null);

        writer.write("ice.ace.jq(function() {");

        JSONBuilder jb = JSONBuilder.create();
        jb.initialiseVar(resolveWidgetVar(dialog))
          .beginFunction("ice.ace.create")
          .item("Dialog")
          .beginArray()
          .item(clientId + "_main")
          .beginMap()
          .entry("isVisible", dialog.isVisible())
          .entry("minHeight", dialog.getMinHeight());

        String styleClass = dialog.getStyleClass();
        String showEffect = dialog.getShowEffect();
        String hideEffect = dialog.getHideEffect();
        String headerText = dialog.getHeader();
        String position = dialog.getPosition();
        int width = dialog.getWidth();
        int height = dialog.getHeight();
        int zIndex = dialog.getZindex();
        int minWidth = dialog.getMinWidth();
        String onShow = dialog.getOnShow();
        String onHide = dialog.getOnHide();

        if (styleClass != null) jb.entry("dialogClass", styleClass);
        if (width > 0) jb.entry("width", width);
        if (height > 0) jb.entry("height", height);
        if (!dialog.isDraggable()) jb.entry("draggable", false);
        if (dialog.isModal()) jb.entry("modal", true);
        if (zIndex != 1000) jb.entry("zIndex", zIndex);
        if (!dialog.isResizable()) jb.entry("resizable", false);
        if (minWidth != 150) jb.entry("minWidth", minWidth);
        if (showEffect != null) jb.entry("show", showEffect);
        if (hideEffect != null) jb.entry("hide", hideEffect);
        if (!dialog.isCloseOnEscape()) jb.entry("closeOnEscape", false);
        if (!dialog.isClosable()) jb.entry("closable", false);
        if (!dialog.isShowHeader()) jb.entry("showHeader", false);
        if (onShow != null) jb.entry("onShow", "function(event, ui) {" + onShow + "}", true);
        if (onHide != null) jb.entry("onHide", "function(event, ui) {" + onHide + "}", true);

        //Position
        if (position != null) {
            if (position.contains(",")) {
				jb.entry("position", "[" + position + "]", true);
            } else {
                jb.entry("position", position);
            }
        }

        jb.entryNonNullValue("title", headerText);
		jb.entry("ariaEnabled", ariaEnabled);

        //Behaviors
        encodeClientBehaviors(context, dialog, jb);

        jb.endMap().endArray().endFunction();
		writer.write(jb.toString());
		writer.write("});");

        writer.endElement("script");
    }

    protected void encodeMarkup(FacesContext facesContext, Dialog dialog) throws IOException {
        ResponseWriter writer = facesContext.getResponseWriter();
        String clientId = dialog.getClientId(facesContext);
        String headerText = dialog.getHeader();

        writer.startElement("div", null);
        writer.writeAttribute("id", clientId + "_main", null);
        writer.writeAttribute("style", "display:none", null);
        if (headerText != null) {
//            writer.writeAttribute("title", headerText, null);
        }

        renderChildren(facesContext, dialog);

        writer.endElement("div");
    }

    @Override
    public void encodeChildren(FacesContext facesContext, UIComponent component) throws IOException {
        //Rendering happens on encodeEnd
    }

    @Override
    public boolean getRendersChildren() {
        return true;
    }
}
