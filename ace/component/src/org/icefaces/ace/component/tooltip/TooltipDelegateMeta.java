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

package org.icefaces.ace.component.tooltip;

import org.icefaces.ace.meta.annotation.Component;
import org.icefaces.ace.meta.baseMeta.UIComponentBaseMeta;

@Component(
        tagName         = "tooltipDelegate",
        componentClass  = "org.icefaces.ace.component.tooltip.TooltipDelegate",
        rendererClass   = "org.icefaces.ace.component.tooltip.TooltipDelegateRenderer",
        generatedClass  = "org.icefaces.ace.component.tooltip.TooltipDelegateBase",
        extendsClass    = "javax.faces.component.UIComponentBase",
        componentType   = "org.icefaces.ace.component.TooltipDelegate",
        rendererType    = "org.icefaces.ace.component.TooltipDelegateRenderer",
		componentFamily = "org.icefaces.ace.Tooltip",
		tlddoc = "The Tooltip Delegate is a container component that will receive the tooltip functionality on behalf of some other inner component. This is useful in cases where such inner component is prone to be completely replaced from the DOM during dynmic updates, where it could lose the tooltip functionality." +
                "<p>For more information, see the <a href=\"http://wiki.icefaces.org/display/ICE/TooltipDelegate\">TooltipDelegate Wiki Documentation</a>."
        )

public class TooltipDelegateMeta extends UIComponentBaseMeta {

}
