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

package com.icesoft.icefaces.tutorial.component.panelPopup.advanced;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ApplicationScoped;
/**
 * Class used to allow the dynamic opening and closing of panelPopups
 * That means the visibility status is tracked, as well as supporting
 *  methods for button clicks on the page
 */ 
@ApplicationScoped
@ManagedBean(name="popup")
public class PopupBean
{
    private boolean visible = true;
    
    public boolean isVisible() { return visible; }
    
    public void setVisible(boolean visible) { this.visible = visible; }
    
    public void closePopup() {
        visible = false;
    }
    
    public void openPopup() {
        visible = true;
    }
}