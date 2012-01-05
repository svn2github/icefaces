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

package org.icefaces.ace.component.roweditor;

import org.icefaces.ace.meta.annotation.Component;
import org.icefaces.ace.meta.annotation.Expression;
import org.icefaces.ace.meta.annotation.Property;
import org.icefaces.ace.meta.baseMeta.UIComponentBaseMeta;

import javax.el.MethodExpression;

@Component(
        tagName = "rowEditor",
        componentClass = "org.icefaces.ace.component.roweditor.RowEditor",
        generatedClass = "org.icefaces.ace.component.roweditor.RowEditorBase",
        rendererClass = "org.icefaces.ace.component.roweditor.RowEditorRenderer",
        extendsClass = "javax.faces.component.UIComponentBase",
        componentType = "org.icefaces.ace.component.RowEditor",
        rendererType = "org.icefaces.ace.component.RowEditorRenderer",
        componentFamily = "org.icefaces.ace.RowEditor",
        tlddoc = ""
)
public class RowEditorMeta extends UIComponentBaseMeta {
    @Property(expression = Expression.METHOD_EXPRESSION,
            methodExpressionArgument = "org.icefaces.ace.event.RowEditEvent",
            tlddoc = "MethodExpression reference called whenever a table row " +
                    "is edited. The method receives a single argument, RowEditEvent.")
    private MethodExpression rowEditListener;

    @Property(expression = Expression.METHOD_EXPRESSION,
            methodExpressionArgument = "org.icefaces.ace.event.RowEditCancelEvent",
            tlddoc = "MethodExpression reference called whenever a table row " +
                    "editing is canceled. The method receives a single argument, RowEditCancelEvent.")
    private MethodExpression rowEditCancelListener;
}
