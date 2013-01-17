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

package org.icefaces.ace.generator.context;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.regex.Matcher;


import org.icefaces.ace.generator.behavior.ActionSourceBehavior;
import org.icefaces.ace.generator.behavior.Behavior;
import org.icefaces.ace.generator.behavior.ClientBehaviorHolder;
import org.icefaces.ace.generator.utils.FileWriter;
import org.icefaces.ace.generator.xmlbuilder.FaceletTagLibBuilder;
import org.icefaces.ace.generator.xmlbuilder.FacesConfigBuilder;
import org.icefaces.ace.generator.xmlbuilder.TLDBuilder;

import org.icefaces.ace.meta.annotation.Component;
import org.icefaces.ace.meta.annotation.TagHandler;

public class GeneratorContext{
	private static GeneratorContext generatorContext = null;
    public static final Map<String,String> WrapperTypes= new HashMap<String, String>();
    public static final Map<String,String> InvWrapperTypes= new HashMap<String, String>();
	private TLDBuilder tldBuilder = new TLDBuilder();
    private FacesConfigBuilder facesConfigBuilder = new FacesConfigBuilder(); 
    private FaceletTagLibBuilder faceletTagLibBuilder = new FaceletTagLibBuilder();
	private List<Class> components;
    private MetaContext activeMetaContext;
    public static String shortName = "";    
    public static String namespace = "";
    private List<Behavior> behaviors = new ArrayList<Behavior>();
     public static final Map<String,String> SpecialReturnSignatures = new HashMap<String,String>();
     public static final Map<String,String> PrimitiveDefaults = new HashMap<String,String>();

     public static String getDisplayName() {
        String ret = System.getProperty("generator.tld.doc.display.name");
        if (ret == null) {
            ret = "";
        }
        return ret;
    }
    
    public static String getVersion() {
        String ret = System.getProperty("generator.tld.doc.version");
        if (ret == null) {
            ret = "";
        }
        Pattern evalPattern = Pattern.compile( "([\\d\\.]*\\d)" );
        Matcher searchMatcher = evalPattern.matcher( ret  );
        if (searchMatcher.find() )  {
            ret = searchMatcher.group();
            System.out.println("Dewey build version = " + ret);
        }
        return ret;
    }
    
	public List<Behavior> getBehaviors() {     
		return behaviors;
	}

	static {
        WrapperTypes.put("java.lang.Boolean", "boolean");
        WrapperTypes.put("java.lang.Byte", "byte");
        WrapperTypes.put("java.lang.Character", "char");
        WrapperTypes.put("java.lang.Double", "double");
        WrapperTypes.put("java.lang.Float", "float");
        WrapperTypes.put("java.lang.Integer", "int");
        WrapperTypes.put("java.lang.Long", "long");
        WrapperTypes.put("java.lang.Short", "short");

        // Inverse return types for when someone uses a wrapper class when defining a must-be primitive method
        InvWrapperTypes.put("boolean", "java.lang.Boolean");
        InvWrapperTypes.put("byte", "java.lang.Byte");
        InvWrapperTypes.put("char", "java.lang.Character");
        InvWrapperTypes.put("double", "java.lang.Double");
        InvWrapperTypes.put("float", "java.lang.Float");
        InvWrapperTypes.put("int", "java.lang.Integer");
        InvWrapperTypes.put("long", "java.lang.Long");
        InvWrapperTypes.put("short", "java.lang.Short");

        // getters that cannot override superclass signatures
        SpecialReturnSignatures.put("immediate","immediate");
        SpecialReturnSignatures.put("valid", "valid");
        SpecialReturnSignatures.put("required", "required");
        SpecialReturnSignatures.put("localValueSet", "localValueSet");

        // Default values for primitive constants where null wont do
        PrimitiveDefaults.put("boolean", "false");
        PrimitiveDefaults.put("byte", "0");
        PrimitiveDefaults.put("char", "");
        PrimitiveDefaults.put("double", "0");
        PrimitiveDefaults.put("float", "0f");
        PrimitiveDefaults.put("int", "0");
        PrimitiveDefaults.put("long", "0l");
        PrimitiveDefaults.put("short", "0");

    }

	private GeneratorContext() {
		getBehaviors().add(new ActionSourceBehavior());
		getBehaviors().add(new ClientBehaviorHolder());
		components = FileWriter.getAnnotatedCompsList();
	}
	
    public TLDBuilder getTldBuilder() {
		return tldBuilder;
	}

	public void setTldBuilder(TLDBuilder tldBuilder) {
		this.tldBuilder = tldBuilder;
	}

	public FacesConfigBuilder getFacesConfigBuilder() {
		return facesConfigBuilder;
	}

	public void setFacesConfigBuilder(FacesConfigBuilder facesConfigBuilder) {
		this.facesConfigBuilder = facesConfigBuilder;
	}

	public FaceletTagLibBuilder getFaceletTagLibBuilder() {
		return faceletTagLibBuilder;
	}

	public void setFaceletTagLibBuilder(FaceletTagLibBuilder faceletTagLibBuilder) {
		this.faceletTagLibBuilder = faceletTagLibBuilder;
	}
    
	public MetaContext getActiveMetaContext() {
		return activeMetaContext;
	}

	public MetaContext createMetaContext(Class clazz) {
		if (clazz.isAnnotationPresent(Component.class)) {
			return new ComponentContext(clazz);
		} else if (clazz.isAnnotationPresent(TagHandler.class)) {
			return new TagHandlerContext(clazz);
		} else {
			return null;
		}
	}
	
	public void setActiveMetaContext(MetaContext activeMetaContext) {
		this.activeMetaContext = activeMetaContext;
	}
	
	public static GeneratorContext getInstance() {
		if (generatorContext == null) {
			generatorContext = new GeneratorContext();
		}
		return generatorContext;
	}
    
    public List<Class> getComponents() {
    	return this.components;
    }
	
    public void release() {
        getTldBuilder().write();
        getFacesConfigBuilder().write();
        getFaceletTagLibBuilder().write();
    }    
}
