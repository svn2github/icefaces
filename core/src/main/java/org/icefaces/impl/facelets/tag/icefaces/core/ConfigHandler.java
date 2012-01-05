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

package org.icefaces.impl.facelets.tag.icefaces.core;

import java.io.IOException;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.faces.component.UIComponent;
import javax.faces.component.UIOutput;
import javax.faces.component.UIViewRoot;
import javax.faces.context.FacesContext;
import javax.faces.view.facelets.FaceletContext;
import javax.faces.view.facelets.TagAttribute;
import javax.faces.view.facelets.TagConfig;
import javax.faces.view.facelets.TagHandler;

import org.icefaces.util.EnvUtils;

public class ConfigHandler extends TagHandler {
    private static final Logger LOGGER = Logger.getLogger(ConfigHandler.class.getName());

    private final TagAttribute render;
    private final TagAttribute ariaEnabled;
    private final TagAttribute blockUIOnSubmit;
    private final TagAttribute lazyPush;
    private final TagAttribute subtreeDiff;
    private final TagAttribute mandatoryResource;
    private final TagAttribute messagePersistence;

    public ConfigHandler(TagConfig config) {
        super(config);
        this.render = this.getAttribute("render");
        this.ariaEnabled = this.getAttribute("ariaEnabled");
        this.blockUIOnSubmit = this.getAttribute("blockUIOnSubmit");
        this.lazyPush = this.getAttribute("lazyPush");
        this.subtreeDiff = this.getAttribute("subtreeDiff");
        this.mandatoryResource = this.getAttribute("mandatoryResource");
        this.messagePersistence = this.getAttribute("messagePersistence");
    }

    public void apply(FaceletContext ctx, UIComponent parent) throws IOException {
        FacesContext fc = ctx.getFacesContext();
        UIViewRoot root = fc.getViewRoot();
        Map viewMap = root.getViewMap();

        String renderValue = "true";
        if (render != null) {
            renderValue = render.getValue();
        }
        viewMap.put(EnvUtils.ICEFACES_RENDER,
                new Boolean("true".equalsIgnoreCase(renderValue)));

        if (ariaEnabled != null) {
            viewMap.put(EnvUtils.ARIA_ENABLED,
                    new Boolean(ariaEnabled.getValue()));
        }
        if (blockUIOnSubmit != null) {
            viewMap.put(EnvUtils.BLOCK_UI_ON_SUBMIT,
                    new Boolean(blockUIOnSubmit.getValue()));
        }

        if (lazyPush != null) {
            viewMap.put(EnvUtils.LAZY_PUSH,
                    new Boolean(lazyPush.getValue()));
        }

        if (subtreeDiff != null) {
            viewMap.put(EnvUtils.SUBTREE_DIFF,
                    new Boolean(subtreeDiff.getValue()));
        }

        if (null != mandatoryResource) {
            viewMap.put(EnvUtils.MANDATORY_RESOURCE_CONFIG,
                    mandatoryResource.getValue());
        }

        if (messagePersistence != null) {
            viewMap.put(EnvUtils.MESSAGE_PERSISTENCE,
                    new Boolean(messagePersistence.getValue()));
        }

        //TODO: ICE-5675 remove when JSF 2.0 Partial State Saving fixed
        //Touch the head and the body to ensure the state
        //saving strategy is chosen correctly.
        root.addComponentResource(fc, new UIOutput(), "head");
        root.addComponentResource(fc, new UIOutput(), "body");
    }
}
