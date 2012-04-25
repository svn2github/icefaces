package org.icefaces.samples.showcase.example.ace.list;

import org.icefaces.samples.showcase.dataGenerators.utilityClasses.DataTableData;
import org.icefaces.samples.showcase.example.compat.dataTable.Car;
import org.icefaces.samples.showcase.metadata.annotation.*;
import org.icefaces.samples.showcase.metadata.context.ComponentExampleImpl;

import javax.faces.bean.CustomScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.model.SelectItem;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@ComponentExample(
    parent = ListBean.BEAN_NAME,
    title = "example.ace.list.drag.title",
    description = "example.ace.list.drag.description",
    example = "/resources/examples/ace/list/listDrag.xhtml"
)
@ExampleResources(
    resources ={
        // xhtml
        @ExampleResource(type = ResourceType.xhtml,
                title="ListDrag.xhtml",
                resource = "/resources/examples/ace/"+
                        "list/listDrag.xhtml"),
        // Java Source
        @ExampleResource(type = ResourceType.java,
                title="ListDragBean.java",
                resource = "/WEB-INF/classes/org/icefaces/samples/"+
                        "showcase/example/ace/list/ListDragBean.java")
    }
)
@ManagedBean(name= ListDragBean.BEAN_NAME)
@CustomScoped(value = "#{window}")
public class ListDragBean extends ComponentExampleImpl<ListDragBean> implements Serializable {
    public static final String BEAN_NAME = "listDragBean";

    public ListDragBean() {
        super(ListDragBean.class);
    }

    List<SelectItem> stringList = new ArrayList<SelectItem>() {{
        for (String s : DataTableData.CHASSIS_ALL) {
            add(new SelectItem(s));
        }
    }};

    List<SelectItem> twoWaySourceList = new ArrayList<SelectItem>() {{
        for (String s : DataTableData.CHASSIS_ALL) {
            add(new SelectItem(s));
        }
    }};

    List<SelectItem> twoWayDestList = new ArrayList<SelectItem>();

    List<SelectItem> oneWaySourceList = new ArrayList<SelectItem>() {{
        for (String s : DataTableData.CHASSIS_ALL) {
            add(new SelectItem(s));
        }
    }};

    List<SelectItem> oneWayDestList = new ArrayList<SelectItem>();

    public List<SelectItem> getStringList() {
        return stringList;
    }

    public void setStringList(List<SelectItem> stringList) {
        this.stringList = stringList;
    }

    public List<SelectItem> getTwoWaySourceList() {
        return twoWaySourceList;
    }

    public void setTwoWaySourceList(List<SelectItem> twoWaySourceList) {
        this.twoWaySourceList = twoWaySourceList;
    }

    public List<SelectItem> getTwoWayDestList() {
        return twoWayDestList;
    }

    public void setTwoWayDestList(List<SelectItem> twoWayDestList) {
        this.twoWayDestList = twoWayDestList;
    }

    public List<SelectItem> getOneWaySourceList() {
        return oneWaySourceList;
    }

    public void setOneWaySourceList(List<SelectItem> oneWaySourceList) {
        this.oneWaySourceList = oneWaySourceList;
    }

    public List<SelectItem> getOneWayDestList() {
        return oneWayDestList;
    }

    public void setOneWayDestList(List<SelectItem> oneWayDestList) {
        this.oneWayDestList = oneWayDestList;
    }
}