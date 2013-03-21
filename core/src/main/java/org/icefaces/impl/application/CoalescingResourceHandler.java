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

package org.icefaces.impl.application;

import org.icefaces.util.EnvUtils;

import javax.faces.application.Resource;
import javax.faces.application.ResourceHandler;
import javax.faces.application.ResourceHandlerWrapper;
import javax.faces.component.UIComponent;
import javax.faces.component.UIOutput;
import javax.faces.component.UIViewRoot;
import javax.faces.context.FacesContext;
import javax.faces.event.AbortProcessingException;
import javax.faces.event.PreRenderComponentEvent;
import javax.faces.event.SystemEvent;
import javax.faces.event.SystemEventListener;
import java.util.*;

public class CoalescingResourceHandler extends ResourceHandlerWrapper {
    public static final String COALESCED = "coalesced";
    public static final String CSS_EXTENSION = ".css";
    public static final String JS_EXTENSION = ".js";
    public static final String ICE_CORE_LIBRARY = "ice.core";
    private ResourceHandler handler;

    public CoalescingResourceHandler(ResourceHandler handler) {
        this.handler = handler;
    }

    public ResourceHandler getWrapped() {
        return handler;
    }

    public Resource createResource(String resourceName, String libraryName, String contentType) {
        FacesContext context = FacesContext.getCurrentInstance();
        if (EnvUtils.isCoallesceResources(context)) {
            if (resourceName.equals(COALESCED + CSS_EXTENSION) && libraryName.equals(ICE_CORE_LIBRARY)) {
                CoalescingResource.Infos resourceInfos = (CoalescingResource.Infos) context.getExternalContext().getSessionMap().get(CoalescingResourceHandler.class.getName() + CSS_EXTENSION);
                return new CoalescingResource(COALESCED + CSS_EXTENSION, ICE_CORE_LIBRARY, getMapping(), isExtensionMapping(), resourceInfos);
            } else if (resourceName.equals(COALESCED + JS_EXTENSION) && libraryName.equals(ICE_CORE_LIBRARY)) {
                CoalescingResource.Infos resourceInfos = (CoalescingResource.Infos) context.getExternalContext().getSessionMap().get(CoalescingResourceHandler.class.getName() + JS_EXTENSION);
                return new CoalescingResource(COALESCED + JS_EXTENSION, ICE_CORE_LIBRARY, getMapping(), isExtensionMapping(), resourceInfos);
            } else {
                return super.createResource(resourceName, libraryName, contentType);
            }
        } else {
            return super.createResource(resourceName, libraryName, contentType);
        }
    }

    public Resource createResource(String resourceName) {
        return this.createResource(resourceName, null);
    }

    public Resource createResource(String resourceName, String libraryName) {
        return this.createResource(resourceName, libraryName, null);
    }

    public static class ResourceCollector implements SystemEventListener {
        public boolean isListenerForSource(Object source) {
            return EnvUtils.isICEfacesView(FacesContext.getCurrentInstance()) && (source instanceof UIViewRoot);
        }

        public void processEvent(SystemEvent event) {
            FacesContext context = FacesContext.getCurrentInstance();
            UIViewRoot root = (UIViewRoot) event.getSource();
            replaceResources(context, root, CSS_EXTENSION);
            replaceResources(context, root, JS_EXTENSION);
        }

        private void replaceResources(FacesContext context, UIViewRoot root, String extension) {
            UIComponent resourceContainer = getHeadResourceContainer(root);
            resourceContainer.setInView(false);

            UIOutput coallescedResourceComponent = new UIOutput();
            Map attrs = coallescedResourceComponent.getAttributes();
            String name = COALESCED + extension;
            attrs.put("name", name);
            attrs.put("library", ICE_CORE_LIBRARY);
            String rendererType = context.getApplication().getResourceHandler().getRendererTypeForResourceName(name);
            coallescedResourceComponent.setRendererType(rendererType);
            coallescedResourceComponent.setTransient(true);

            CoalescingResource.Infos resourceInfos = new CoalescingResource.Infos();
            List children = resourceContainer.getChildren();
            for (UIComponent next : new ArrayList<UIComponent>(children)) {
                Map<String, Object> nextAttributes = next.getAttributes();
                String nextName = (String) nextAttributes.get("name");
                String nextLibrary = (String) nextAttributes.get("library");
                if (nextName.endsWith(extension) && !"jsf.js".equals(nextName)) {
                    resourceInfos.resources.add(new CoalescingResource.Info(nextName, nextLibrary));
                    root.removeComponentResource(context, next);
                }
            }

            root.addComponentResource(context, coallescedResourceComponent);

            Map<String, Object> sessionMap = context.getExternalContext().getSessionMap();
            CoalescingResource.Infos previousResourceInfos = (CoalescingResource.Infos) sessionMap.get(CoalescingResourceHandler.class.getName() + extension);
            if (previousResourceInfos == null) {
                sessionMap.put(CoalescingResourceHandler.class.getName() + extension, resourceInfos);
            } else {
                Collection newResourceInfos = new ArrayList(resourceInfos.resources);
                newResourceInfos.removeAll(previousResourceInfos.resources);
                //replace the resource infos only if there are new resources found in the new list
                if (newResourceInfos.isEmpty()) {
                    previousResourceInfos.modified = false;
                } else {
                    sessionMap.put(CoalescingResourceHandler.class.getName() + extension, resourceInfos);
                }
            }

            resourceContainer.setInView(true);
        }
    }

    private static UIComponent getHeadResourceContainer(UIViewRoot root) {
        String facetName = EnvUtils.isMojarra() ? "javax_faces_location_HEAD": "head";
        return root.getFacets().get(facetName);
    }


    private static String getMapping() {
        return ".jsf";
    }

    private static boolean isExtensionMapping() {
        return true;
    }

    //register ResourceCollector dynamically to make sure it is invoked last when PreRenderComponentEvent is fired
    public static class RegisterListener implements SystemEventListener {
        public void processEvent(SystemEvent event) throws AbortProcessingException {
            FacesContext context = FacesContext.getCurrentInstance();
            if (EnvUtils.isCoallesceResources(context)) {
                    context.getApplication().subscribeToEvent(PreRenderComponentEvent.class, new ResourceCollector());
            }
        }

        public boolean isListenerForSource(Object source) {
            return true;
        }
    }
}