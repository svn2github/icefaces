package org.icefaces.ace.component.gmap;
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

import com.icesoft.faces.component.InputHiddenTag;
import org.icefaces.ace.util.JSONBuilder;
import org.icefaces.ace.renderkit.CoreRenderer;
import org.icefaces.render.MandatoryResourceComponent;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;

@MandatoryResourceComponent(tagName = "gMap", value = "org.icefaces.ace.component.gmap.GMap")
public class GMapAutocompleteRenderer extends CoreRenderer {

    public GMapAutocompleteRenderer(){
        super();
    }

    public void decode(FacesContext context, UIComponent component) {
        Map requestParameterMap = context.getExternalContext().getRequestParameterMap();
        GMapAutocomplete autocomplete = (GMapAutocomplete) component;
        String clientId = autocomplete.getClientId(context);
        String address = String.valueOf(requestParameterMap.get(clientId + "_address"));
        String url = String.valueOf(requestParameterMap.get(clientId+"_address"));
        String latLng = String.valueOf(requestParameterMap.get(clientId+"_address"));
        String types = String.valueOf(requestParameterMap.get(clientId+"_address"));
        System.out.println("Map is:" + requestParameterMap.toString());
        if(address != null && !address.equals(null))
            autocomplete.setAddress(address);
        if(url != null && !url.equals(null))
            autocomplete.setUrl(url);
        if(latLng != null && !latLng.equals(null))
            autocomplete.setLatLng(latLng);
        if(types != null && !types.equals(null))
            autocomplete.setTypes(types);
    }

    public void encodeBegin(FacesContext context, UIComponent component) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        GMapAutocomplete autocomplete = (GMapAutocomplete) component;
        String clientId = autocomplete.getClientId(context);
        writer.startElement("form", null);
        writer.writeAttribute("id", clientId, null);
        writer.startElement("input", null);
        writer.writeAttribute("type", "text", null);
        writer.writeAttribute("size", autocomplete.getSize(), null);
        writer.writeAttribute("style", autocomplete.getStyle(), null);
        writer.writeAttribute("id", "autocomplete_input", null);
        writer.endElement("input");
        makeFields(writer,clientId,"address");
        makeFields(writer,clientId,"latLng");
        makeFields(writer,clientId,"types");
        makeFields(writer,clientId,"url");
        writer.startElement("span", null);
        writer.writeAttribute("id", clientId + "_autocomplete", null);
        writer.startElement("script", null);
        writer.writeAttribute("type", "text/javascript", null);
        writer.write("ice.ace.jq(function() {");
        JSONBuilder jb = JSONBuilder.create();
        jb.beginFunction("ice.ace.gMap.addAutoComplete")
                .item(autocomplete.getParent().getClientId(context))
                .item(clientId)
                .beginMap();
        encodeClientBehaviors(context, autocomplete, jb);
        jb.endMap().endFunction();
        writer.write(jb.toString());
        writer.write("});");
        writer.endElement("script");
        writer.endElement("span");
        writer.endElement("form");
    }

    public void makeFields(ResponseWriter writer, String clientId, String fieldName) throws IOException {
        writer.startElement("input", null);
        writer.writeAttribute("type", "hidden", null);
        writer.writeAttribute("id", clientId+"_"+fieldName, null);
        writer.writeAttribute("name", clientId+"_"+fieldName, null);
        writer.endElement("input");
    }
}