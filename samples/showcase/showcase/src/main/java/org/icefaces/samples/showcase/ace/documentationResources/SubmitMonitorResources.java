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

package org.icefaces.samples.showcase.ace.documentationResources;

import org.icefaces.samples.showcase.metadata.annotation.ExampleResource;
import org.icefaces.samples.showcase.metadata.annotation.ExampleResources;
import org.icefaces.samples.showcase.metadata.annotation.ResourceType;
import org.icefaces.samples.showcase.metadata.context.ComponentExampleImpl;
import org.icefaces.samples.showcase.metadata.context.ResourceRootPath;

import javax.annotation.PostConstruct;
import javax.faces.bean.CustomScoped;
import javax.faces.bean.ManagedBean;
import java.io.Serializable;

@ExampleResources(
        resources ={
                
                // WIKI Resources
                @ExampleResource(type = ResourceType.wiki,
                    title="ace:submitMonitor",
                    resource = ResourceRootPath.FOR_WIKI + "SubmitMonitor"),

                // TLD Resources
                @ExampleResource(type = ResourceType.tld,
                    title="ace:submitMonitor",
                    resource = ResourceRootPath.FOR_ACE_TLD + "submitMonitor.html")
                
        }
)
@ManagedBean(name= SubmitMonitorResources.BEAN_NAME)
@CustomScoped(value = "#{window}")
public class SubmitMonitorResources extends ComponentExampleImpl<SubmitMonitorResources> implements Serializable {
    public static final String BEAN_NAME = "submitMonitorResources";
    public SubmitMonitorResources()
    {
        super(SubmitMonitorResources.class);
    }

    @PostConstruct
    public void initMetaData() {
        super.initMetaData();
    }
}
