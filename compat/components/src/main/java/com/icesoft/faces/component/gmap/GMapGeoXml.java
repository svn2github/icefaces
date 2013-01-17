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

package com.icesoft.faces.component.gmap;

import java.io.IOException;

import javax.faces.component.UIPanel;
import javax.faces.context.FacesContext;
import javax.faces.el.ValueBinding;

import com.icesoft.faces.context.effects.JavascriptContext;

public class GMapGeoXml extends UIPanel{
	public static final String COMPONENT_TYPE = "com.icesoft.faces.GMapGeoXml";
    public static final String COMPONENT_FAMILY = "com.icesoft.faces.GMapGeoXml";
	private String url;
	
	public GMapGeoXml() {
		setRendererType(null);
	}

    public String getFamily() {
        return COMPONENT_FAMILY;
    }

    public String getComponentType() {
        return COMPONENT_TYPE;
    }
    
    public void encodeBegin(FacesContext context) throws IOException {
        setRendererType(null);
        super.encodeBegin(context);        
        if (isRendered()) {
            JavascriptContext.addJavascriptCall(context, "Ice.GoogleMap.removeKML('"+ this.getParent().getClientId(context)+"', '"+ this.getClientId(context) +"');");
        }
        JavascriptContext.addJavascriptCall(context, "Ice.GoogleMap.addKML('"+ this.getParent().getClientId(context)+"', '"+ this.getClientId(context) +"', '"+ getUrl() +"');");
        
    }

	public String getUrl() {
       if (url != null) {
            return url;
        }
        ValueBinding vb = getValueBinding("url");
        return vb != null ? (String) vb.getValue(getFacesContext()) : null;
	}

	public void setUrl(String url) {
		this.url = url;
	}

    private transient Object values[];
    public void restoreState(FacesContext context, Object state) {
        values = (Object[])state;
        super.restoreState(context, values[0]);
        url = (String)values[1];
    }

    public Object saveState(FacesContext context) {

        if(values == null){
            values = new Object[2];
        }
        values[0] = super.saveState(context);
        values[1] = url;
        return values;
    }
        
        
    
}
