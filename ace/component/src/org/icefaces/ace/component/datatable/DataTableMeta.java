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

package org.icefaces.ace.component.datatable;

import org.icefaces.ace.meta.annotation.*;
import org.icefaces.ace.meta.baseMeta.UIDataMeta;
import org.icefaces.ace.model.table.RowStateMap;
import org.icefaces.ace.model.table.TreeDataModel;

import javax.el.MethodExpression;
import javax.faces.application.ResourceDependencies;
import javax.faces.application.ResourceDependency;
import javax.faces.component.UIComponent;
import javax.faces.model.DataModel;
import java.util.ArrayList;
import java.util.List;
import org.icefaces.ace.api.IceClientBehaviorHolder;


@Component(
        tagName = "dataTable",
        componentClass = "org.icefaces.ace.component.datatable.DataTable",
        generatedClass = "org.icefaces.ace.component.datatable.DataTableBase",
        rendererClass = "org.icefaces.ace.component.datatable.DataTableRenderer",
        extendsClass = "javax.faces.component.UIData",
        componentType = "org.icefaces.ace.component.DataTable",
        rendererType = "org.icefaces.ace.component.DataTableRenderer",
        componentFamily = "org.icefaces.ace.DataTable",
        tlddoc = "Renders an HTML table element. Rows are created from the List" +
                " or DataModel object bound by the value property. The " +
                "header/footer is rendered by the header/footer facet of Column" +
                " component children or a child ColumnGroup component definition."
)
@ResourceDependencies({
		@ResourceDependency(library="icefaces.ace", name="util/combined.css"),
        @ResourceDependency(library="icefaces.ace", name="util/ace-jquery.js"),
        @ResourceDependency(library="icefaces.ace", name="util/ace-datatable.js")
})
@ClientBehaviorHolder(events = {
        @ClientEvent(name="page", javadoc="Fired when the page is changed on the DataTable.",
                tlddoc="Fired when the page is changed on the DataTable.", defaultRender="@all", defaultExecute="@this"),
        @ClientEvent(name="select", javadoc="Fired when a row or cell is selected on the DataTable.",
                tlddoc="Fired when a row or cell is selected on the DataTable.", defaultRender="@all", defaultExecute="@this"),
        @ClientEvent(name="deselect", javadoc="Fired when a row or cell is deselected on the DataTable.",
                tlddoc="Fired when a row or cell is deselected on the DataTable.", defaultRender="@all", defaultExecute="@this"),
        @ClientEvent(name="sort", javadoc="Fired when a change to the current sort occurs on the DataTable.",
                tlddoc="Fired when a change to the current sort occurs on the DataTable.", defaultRender="@all", defaultExecute="@this"),
        @ClientEvent(name="filter", javadoc="Fired when a change to the current filters occurs on the DataTable.",
                tlddoc="Fired when a change to the current filters occurs on the DataTable.", defaultRender="@all", defaultExecute="@this"),
        @ClientEvent(name="reorder", javadoc="Fired when a column is dragged and dropped into a new ordering.",
                tlddoc="Fired when a column is dragged and dropped into a new ordering.", defaultRender="@all", defaultExecute="@this"),
        // Edit has custom render and execute, @none is just a null placeholder for additional update/execute fields
        @ClientEvent(name="editStart", javadoc="Fired when a row is enabled for editing.",
                tlddoc="Fired when a row is enabled for editing.", defaultRender="@none", defaultExecute="@none"),
        @ClientEvent(name="editSubmit", javadoc="Fired when a row is submits its edits.",
                tlddoc="Fired when a row is submits its edits.", defaultRender="@none", defaultExecute="@none"),
        @ClientEvent(name="editCancel", javadoc="Fired when a row cancels an in-progress edit.",
                tlddoc="Fired when a row cancels an in-progress edit.", defaultRender="@none", defaultExecute="@none"),
        @ClientEvent(name="expand", javadoc="Fired when a child ExpansionToggler component is clicked to expand.",
                tlddoc="Fired when a child ExpansionToggler component is clicked to expand.", defaultRender="@all", defaultExecute="@this"),
        @ClientEvent(name="contract", javadoc="Fired when a child ExpansionToggler component is clicked to contract.",
                tlddoc="Fired when a child ExpansionToggler component is clicked to contract.", defaultRender="@all", defaultExecute="@this")} ,
        defaultEvent = "select"
)
public class DataTableMeta extends UIDataMeta {
    /* ##################################################################### */
    /* ############################ Misc. Prop. ############################ */
    /* ##################################################################### */
    @Property(tlddoc = "The JavaScript global component instance name. " +
            "Must be unique among components on a page. ")
    private String widgetVar;

    @Property(tlddoc = "Disable all features of the data table.", defaultValue = "false",
            defaultValueType= DefaultValueType.EXPRESSION)
    private boolean disabled;

    @Property(tlddoc = "The request-scope attribute (if any) under which the data " +
        "object index for the current row will be exposed when iterating.")
    private String rowIndexVar;

    @Property(tlddoc = "The request-scope attribute (if any) under which the table" +
            " state object for the current row will be exposed when iterating.", defaultValue = "rowState")
    private String rowStateVar;

    @Property(tlddoc = "Enables lazy loading. Lazy loading expects the 'value' property to reference " +
            "an instance of LazyDataModel, an interface to support incremental fetching of " +
            "table entities.")
    private boolean lazy;

    @Property(defaultValue="0",
            defaultValueType= DefaultValueType.EXPRESSION,
            implementation=Implementation.GENERATE,
            tlddoc="The number of rows to be displayed, or zero to display the entire " +
                    "set of available rows.")
    private int rows;

    @Property(tlddoc = "Define a string to render when there are no records to display.")
    private String emptyMessage;
    
    @Property(tlddoc = "Disables sorting for multiple columns at once. Sorting " +
            "is enabled by the use of sortBy on ace:column components.",
            defaultValue = "false", defaultValueType = DefaultValueType.EXPRESSION)
    private boolean singleSort;

    @Property(tlddoc = "Defines a map of your row data objects to UI states. Row-level " +
            "features (selection, expansion, etc.) are manipulable through this repository.")
    private RowStateMap stateMap;

    @Property(tlddoc = "Enable the decoding of child components during table feature " +
            "requests. The table attempts to decode children whenever it is executed, " +
            "meaning whenever a parent region is submitted, or the table submits itself " +
            "to paginate, make a selection, reorder columns, or any other feature. " +
            "Decoding children during feature requests can result in unwanted input " +
            "submission (during pagination for example), so by default this component " +
            "suppresses child decoding whenever submitting itself. To decode the " +
            "children of the table, use the row editing feature for row-scoped input " +
            "decoding, submit the form (or other table parent) for broad submission " +
            "or enable this option to submit during all table operations.",
            defaultValue = "false", defaultValueType = DefaultValueType.EXPRESSION)
    private Boolean alwaysExecuteContents;

    // ID of the configPanel that has been associated with this table, used for
    // component lookups during decodes.
    @Field(defaultValue = "null", defaultValueIsStringLiteral = false)
    protected String tableConfigPanel;
    @Field(defaultValue = "null", defaultValueIsStringLiteral = false)
    protected List filteredData;
    @Field(defaultValue = "null", defaultValueIsStringLiteral = false)
    protected Integer valueHashCode;
    @Field(defaultValue = "true", defaultValueIsStringLiteral = false)
    protected Boolean sortOrderChanged;
    @Field(defaultValue = "true", defaultValueIsStringLiteral = false)
    protected Boolean filterValueChanged;





    /* ##################################################################### */
    /* ########################## Style Properties ######################### */
    /* ##################################################################### */
    @Property(tlddoc = "Custom inline CSS styles to use for this component. These styles are generally applied to the root DOM element of the component. This is intended for per-component basic style customizations. Note that due to browser CSS precedence rules, CSS rendered on a DOM element will take precedence over the external stylesheets used to provide the ThemeRoller theme on this component. If the CSS properties applied with this attribute do not affect the DOM element you want to style, you may need to create a custom theme styleClass for the theme CSS class that targets the particular DOM elements you wish to customize.")
    private String style;

    @Property(tlddoc = "Custom CSS style class(es) to use for this component. These style classes can be defined in your page or in a theme CSS file.")
    private String styleClass;

    @Property(tlddoc = "Define css classes for each row of the dataTable. " +
            "EL can be used in this attribute to produce conditional row styling.")
    private String rowStyleClass;





    /* ##################################################################### */
    /* ############################# Listeners ############################# */
    /* ##################################################################### */
    @Property(expression = Expression.METHOD_EXPRESSION,
            methodExpressionArgument = "org.icefaces.ace.event.SelectEvent",
            tlddoc = "MethodExpression reference called whenever a table " +
                    "element is selected. The method receives a single " +
                    "argument, RowSelectEvent.")
    private MethodExpression rowSelectListener;

    @Property(expression = Expression.METHOD_EXPRESSION,
            methodExpressionArgument = "org.icefaces.ace.event.UnselectEvent",
            tlddoc = "MethodExpression reference called whenever a table " +
                    "element is deselected. The method receives a single " +
                    "argument, RowUnselectEvent.")
    private MethodExpression rowUnselectListener;

    @Property(expression = Expression.METHOD_EXPRESSION,
            methodExpressionArgument = "org.icefaces.ace.event.TableFilterEvent",
            tlddoc = "MethodExpression reference called whenever the table row " +
                    "is filtered. The method receives a single argument, TableFilterEvent.")
    private MethodExpression filterListener;





    /* ##################################################################### */
    /* ############################# Pagination ############################ */
    /* ##################################################################### */
    @Property(tlddoc = "Defines a list of comma separated integer values that represent the options " +
            "for \"number of items per page\" presented to the user.")
    private String rowsPerPageTemplate;

    @Property(tlddoc = "Defines a coded string representing the layout of the text displaying" +
            " the current page. Default is: \"{currentPage} of {totalPages}\".")
    private String currentPageReportTemplate;

    @Property(tlddoc = "Defines a coded string representing the controls available as part of" +
            " the paginator. Default is: \"{FirstPageLink} {PrevgetSEliousPageLink} " +
            "{PageLinks} {NextPageLink} {LastPageLink}\".")
    private String paginatorTemplate;

    @Property(tlddoc = "Defines the location of the paginator if enabled. Available " +
            "options are top, bottom, or the default, both.", defaultValue = "both")
    private String paginatorPosition;

    @Property(tlddoc = "Defines whether the paginator always displays, even when fewer then 1 page " +
            "full of items are displayed.")
    private boolean paginatorAlwaysVisible;

    @Property(tlddoc = "Defines the maximum number of individual page links to display in paginator.",
            defaultValue = "10", defaultValueType = DefaultValueType.EXPRESSION)
    private Integer pageCount;

    @Property(tlddoc = "Defines the index of the current page, beginning at 1.")
    private int page;

    @Property(tlddoc = "Enables pagination on the table.")
    private boolean paginator;





    /* ##################################################################### */
    /* ########################## Scrolling Prop. ########################## */
    /* ##################################################################### */
    @Property(tlddoc = "Defines a fixed height for the table in pixels. Must be set to " +
            "use vertical scrolling.")
    private Integer height;

    @Property(tlddoc = "Enabling renders a table that overflows the fixed height and adds " +
            "a scrollbar. Note, used in combination with multi-row headers defined by a ColumnGroup" +
            "component, it is assumed that every body column of the table will have a associated " +
            "single column spanning header column on the bottom row of the multi-row header. This is " +
            "to allow for appropriate sizing of the scrollable column and the associated header td.")
    private boolean scrollable;

    @Property(tlddoc = "Enables the table to insert additional rows as " +
            "scrolling reaches the bottom of the table. The 'rows' property" +
            " configures the number of new rows to be loaded")
    private boolean liveScroll;





    /* ##################################################################### */
    /* ########################## Selection Prop. ########################## */
    /* ##################################################################### */
    @Property(tlddoc = "Defines a code word indicating method of table element selection." +
            " Available values include: \"multiple\", \"single\"," +
            " \"cellblock\", \"cellrange\" and \"singlecell\".")
    private String selectionMode;

    @Property(tlddoc = "Enable to require a double-click to fire row/cell selection events.")
    private boolean doubleClickSelect;

    @Property(tlddoc = "Defines an object to be populated with the backing object " +
            "representing selected table cells. In the case of multiple " +
            "element selection, it's expected that this object will be an implementer" +
            " of the List interface.")
    private Object cellSelection;





    /* ##################################################################### */
    /* ########################## Filtering Prop. ########################## */
    /* ##################################################################### */
    @Property(tlddoc = "Enable to force creation of the filtered data set from the bound " +
            "value every render. Alternately attempt to use hashCodes of the " +
            "value property to detect changes and prompt refiltering.",
            defaultValue = "false", defaultValueType = DefaultValueType.EXPRESSION)
    private boolean constantRefilter;

    @Property(tlddoc="Defines the Javascript event on which to trigger filter event, ex. " +
            "\'keyup\', \'blur\', \'change\' and \'enter\'.", defaultValue="change")
    private String filterEvent;

    @Property(tlddoc="Defines the input to the column non-specific filter, coming from the client, or " +
            "from the app via a value binding.")
    private String filterValue;





    /* ##################################################################### */
    /* ########################## Column Features ########################## */
    /* ##################################################################### */
    @Property(tlddoc = "Enable resizing of the table columns via handles on " +
            "the column headers.")
    private boolean resizableColumns;

    @Property(tlddoc = "Enable reordering of the table columns via header " +
            "dragging.")
    private boolean reorderableColumns;

    @Property(tlddoc = "Defines a list of integers representing a rendering order for " +
            "the Column children of the table.")
    private List<Integer> columnOrdering;
}
