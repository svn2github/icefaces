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

package org.icefaces.impl.event;

import org.icefaces.util.EnvUtils;
import org.icefaces.util.JavaScriptRunner;

import javax.faces.component.UIOutput;
import javax.faces.component.UIViewRoot;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import javax.faces.event.SystemEvent;
import javax.faces.event.SystemEventListener;
import java.io.IOException;

public class JavaScriptRunnerSetup implements SystemEventListener {

    public JavaScriptRunnerSetup() {
    }

    public boolean isListenerForSource(Object source) {
        return true;
    }

    public void processEvent(SystemEvent event) {
        FacesContext facesContext = FacesContext.getCurrentInstance();
        if (!EnvUtils.isICEfacesView(facesContext)) {
            return;
        }

        UIOutput jsOutput = new UIOutputWriter() {
            public void encode(ResponseWriter writer, FacesContext context) throws IOException {
                writer.startElement("span", this);
                writer.writeAttribute("id", "dynamic-code", null);
                if (!context.getPartialViewContext().isPartialRequest()) {
                    writer.startElement("script", this);
                    writer.writeAttribute("type", "text/javascript", null);
                    writer.write(JavaScriptRunner.collateScripts(context));
                    writer.endElement("script");
                }
                writer.endElement("span");
            }
        };

        UIViewRoot root = facesContext.getViewRoot();
        jsOutput.setTransient(true);
        root.addComponentResource(facesContext, jsOutput, "body");
    }
}
