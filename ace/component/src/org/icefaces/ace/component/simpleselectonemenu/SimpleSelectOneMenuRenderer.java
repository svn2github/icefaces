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

package org.icefaces.ace.component.simpleselectonemenu;

import org.icefaces.ace.renderkit.InputRenderer;
import org.icefaces.render.MandatoryResourceComponent;
import org.icefaces.ace.util.JSONBuilder;
import org.icefaces.util.EnvUtils;
import org.icefaces.ace.event.TextChangeEvent;

import javax.faces.component.UIComponent;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import javax.faces.event.ActionEvent;
import javax.faces.model.SelectItem;
import javax.faces.convert.Converter;
import javax.faces.convert.ConverterException;
import javax.el.ELContext;
import javax.el.ValueExpression;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.io.IOException;

@MandatoryResourceComponent(tagName="simpleSelectOneMenu", value="org.icefaces.ace.component.simpleselectonemenu.SimpleSelectOneMenu")
public class SimpleSelectOneMenuRenderer extends InputRenderer {

    public boolean getRendersChildren() {
        return true;
    }

	public void decode(FacesContext facesContext, UIComponent uiComponent) {
		SimpleSelectOneMenu simpleSelectOneMenu = (SimpleSelectOneMenu) uiComponent;
		simpleSelectOneMenu.setItemList(null);
        Map requestMap = facesContext.getExternalContext().getRequestParameterMap();
        String clientId = simpleSelectOneMenu.getClientId(facesContext);
        String value = (String) requestMap.get(clientId + "_input");

		simpleSelectOneMenu.setSubmittedValue(value);
		
		decodeBehaviors(facesContext, simpleSelectOneMenu);
	}
	
    public void encodeBegin(FacesContext facesContext, UIComponent uiComponent) throws IOException {
		ResponseWriter writer = facesContext.getResponseWriter();
        String clientId = uiComponent.getClientId(facesContext);
        SimpleSelectOneMenu simpleSelectOneMenu = (SimpleSelectOneMenu) uiComponent;
        boolean ariaEnabled = EnvUtils.isAriaEnabled(facesContext);
        Map paramMap = facesContext.getExternalContext().getRequestParameterMap();
        Map<String, Object> labelAttributes = getLabelAttributes(uiComponent);
        String inFieldLabel = (String) labelAttributes.get("inFieldLabel");
        String inFieldLabelStyleClass = "";
        String iceFocus = (String) paramMap.get("ice.focus");
        String mousedownScript = (String) uiComponent.getAttributes().get("onmousedown");
        String onfocusCombinedValue = "setFocus(this.id);";
        String onblurCombinedValue = "";
        Object onfocusAppValue = uiComponent.getAttributes().get("onfocus");
        Object onblurAppValue = uiComponent.getAttributes().get("onblur");
        Object onchangeAppValue = uiComponent.getAttributes().get("onchange");

		String inputClientId = clientId + "_input";

		// root
        writer.startElement("div", null);
		writer.writeAttribute("id", clientId, null);
		writer.writeAttribute("class", "ui-select-simple " + simpleSelectOneMenu.getStyleClass(), null);

		writeLabelAndIndicatorBefore(labelAttributes);
		
		// select field
		writer.startElement("select", null);
		writer.writeAttribute("name", inputClientId, null);
		String stateClass = simpleSelectOneMenu.isDisabled() ? "ui-state-disabled" : "ui-state-default";
		writer.writeAttribute("class", "ui-widget ui-corner-all " + stateClass + getStateStyleClasses(simpleSelectOneMenu) + inFieldLabelStyleClass, null);
		writer.writeAttribute("style", simpleSelectOneMenu.getStyle(), null);
		if (ariaEnabled) {
			writer.writeAttribute("role", "select", null);
            Map<String, Object> ariaAttributes = new HashMap<String, Object>();
			ariaAttributes.put("required", simpleSelectOneMenu.isRequired());
			ariaAttributes.put("disabled", simpleSelectOneMenu.isDisabled());
			ariaAttributes.put("invalid", !simpleSelectOneMenu.isValid());
            writeAriaAttributes(ariaAttributes, labelAttributes);
        }
		if (simpleSelectOneMenu.isDisabled()) writer.writeAttribute("disabled", "disabled", null);
		
		populateList(facesContext, simpleSelectOneMenu);
		
		writer.endElement("select");
		
		writeLabelAndIndicatorAfter(labelAttributes);

		// script
		JSONBuilder jb = JSONBuilder.create();
		jb.beginMap()
		.entry("p", ""); // dummy property
		encodeClientBehaviors(facesContext, simpleSelectOneMenu, jb);
		jb.endMap();
		
        writer.startElement("script", null);
        writer.writeAttribute("type", "text/javascript", null);
        writer.writeText("(function() {", null);
		writer.writeText("var $select = ice.ace.jq(ice.ace.escapeClientId('" + clientId + "')).find('select');", null);
		// dynamically set id to cause full markup updates that include this script when the select element changes
		writer.writeText("$select.attr('id', '" + inputClientId + "');", null);
		writer.writeText("var b = " + jb.toString() + ";", null);
		writer.writeText("if (b.behaviors) {", null);
		writer.writeText("if (b.behaviors.change) {", null);
		writer.writeText("$select.off('change').on('change', function(){ ice.ace.ab(b.behaviors.change); });", null);
		writer.writeText("}", null);
		writer.writeText("if (b.behaviors.blur) {", null);
		writer.writeText("$select.off('blur').on('blur', function(){ ice.ace.ab(b.behaviors.blur); });", null);
		writer.writeText("}", null);
		writer.writeText("}", null);
        writer.writeText("})();", null);
        writer.endElement("script");
		
		writer.endElement("div");
    }

    public void populateList(FacesContext facesContext, SimpleSelectOneMenu simpleSelectOneMenu) throws IOException {
		ResponseWriter writer = facesContext.getResponseWriter();
		String value = (String) simpleSelectOneMenu.getValue();
		String clientId = simpleSelectOneMenu.getClientId(facesContext);
		boolean ariaEnabled = EnvUtils.isAriaEnabled(facesContext);
        simpleSelectOneMenu.populateItemList();
        Iterator matches = simpleSelectOneMenu.getItemListIterator();
		if (matches.hasNext()) {
			StringBuffer sb = new StringBuffer();
			SelectItem item = null;
			boolean selectedFound = false;
			String role = "";
			if (ariaEnabled) role = " role=\"option\"";
			while (matches.hasNext()) {
				item = (SelectItem) matches.next();
				String itemLabel = item.getLabel();
				String itemValue = (String) item.getValue();
				if (itemValue == null) {
					try {
						itemValue = (String) getConvertedValue(facesContext, simpleSelectOneMenu, item.getValue(), true);
					} catch (Exception e) {
						itemValue = item.getValue().toString();
					}
				}
				String selected = "";
				if (!selectedFound && value != null && value.toString().equals(itemValue)) {
					selected = " selected=\"selected\"";
					selectedFound = true;
				}
				itemLabel = itemLabel == null ? itemValue : itemLabel;
				if (item.isDisabled()) {
					sb.append("<option disabled=\"disabled\" value=\"" + itemValue + "\"" + selected + role + ">").append(itemLabel).append("</option>");
				} else {
					sb.append("<option value=\"" + itemValue + "\"" + selected + role + ">").append(itemLabel).append("</option>");
				}
			}
			writer.write(sb.toString());
		}
    }
		
	public void encodeEnd(FacesContext facesContext, UIComponent uiComponent) throws IOException {

	}
	
	@Override
	public Object getConvertedValue(FacesContext context, UIComponent component, Object submittedValue) throws ConverterException {
		return getConvertedValue(context, component, submittedValue, false);
	}
	
	private Object getConvertedValue(FacesContext context, UIComponent component, Object submittedValue, boolean force) throws ConverterException {
		SimpleSelectOneMenu simpleSelectOneMenu = (SimpleSelectOneMenu) component;
		String value = (String) submittedValue;
		Converter converter = simpleSelectOneMenu.getConverter();
		
			if(converter != null) {
				return converter.getAsObject(context, simpleSelectOneMenu, value);
			}
			else {
				ValueExpression ve = simpleSelectOneMenu.getValueExpression("value");

				if(ve != null) {
					Class<?> valueType = ve.getType(context.getELContext());
					Converter converterForType = context.getApplication().createConverter(valueType);

					if(converterForType != null) {
						return converterForType.getAsObject(context, simpleSelectOneMenu, value);
					}
				}
			}
		
		return value;	
	}
}