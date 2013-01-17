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

package org.icefaces.samples.showcase.example.compat.popup;

import java.io.Serializable;

import javax.annotation.PostConstruct;
import javax.faces.bean.CustomScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.event.ActionEvent;

import org.icefaces.samples.showcase.metadata.annotation.ComponentExample;
import org.icefaces.samples.showcase.metadata.annotation.ExampleResource;
import org.icefaces.samples.showcase.metadata.annotation.ExampleResources;
import org.icefaces.samples.showcase.metadata.annotation.ResourceType;
import org.icefaces.samples.showcase.metadata.context.ComponentExampleImpl;

@ComponentExample(
        parent = PopupBean.BEAN_NAME,
        title = "example.compat.popup.client.title",
        description = "example.compat.popup.client.description",
        example = "/resources/examples/compat/popup/popupClient.xhtml"
)
@ExampleResources(
        resources ={
            // xhtml
            @ExampleResource(type = ResourceType.xhtml,
                    title="popupClient.xhtml",
                    resource = "/resources/examples/compat/"+
                               "popup/popupClient.xhtml"),
            // Java Source
            @ExampleResource(type = ResourceType.java,
                    title="PopupClient.java",
                    resource = "/WEB-INF/classes/org/icefaces/samples/"+
                               "showcase/example/compat/popup/PopupClient.java")
        }
)
@ManagedBean(name= PopupClient.BEAN_NAME)
@CustomScoped(value = "#{window}")
public class PopupClient extends ComponentExampleImpl<PopupClient> implements Serializable {
	
	public static final String BEAN_NAME = "popupClient";
	
	private boolean opened = false;
	private boolean clientOnly = true;
	
	public PopupClient() {
		super(PopupClient.class);
	}
	
    @PostConstruct
    public void initMetaData() {
        super.initMetaData();
    }

	public boolean isOpened() { return opened; }
	public boolean getClientOnly() { return clientOnly; }
	
	public void setOpened(boolean opened) { this.opened = opened; }
	public void setClientOnly(boolean clientOnly) { this.clientOnly = clientOnly; }
	
	public void toggleOpened(ActionEvent event) {
	    opened = !opened;
	}
	
	public void openEvent(ActionEvent event) {
	    opened = true;
	}
	
	public void closeEvent(ActionEvent event) {
	    opened = false;
	}
}
