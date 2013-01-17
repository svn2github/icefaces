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

package org.icefaces.application.showcase.view.bean.examples.component.setEventPhase;

import org.icefaces.application.showcase.util.MessageBundleLoader;
import org.icefaces.application.showcase.view.bean.BaseBean;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.event.ValueChangeEvent;
import javax.faces.model.SelectItem;

/**
 * <p>The SetEventPhaseBean class is the backing bean for the setEventPhase
 * component demonstration. It is derived from SelectionTagsBean, and shows
 * how the bean code may be simplified with use of the setEventPhase component.</p>
 *
 * @since 1.8
 */
@ManagedBean(name = "setEventPhaseBean")
@ViewScoped
public class SetEventPhaseBean extends BaseBean {
    // If the setEventPhase component should be disabled
    private String disabled = "false";
    // selectOneListbox example value
    private String selectedCountry;
    // selectManyListbox example value
    private String[] selectedCities;

    /**
     * @return If the setEventPhase event should be disabled
     */
    public String getDisabled() {
        return disabled;
    }
    
    /**
     * @param disabled If the setEventPhase event should be disabled
     */
    public void setDisabled(String disabled) {
        this.disabled = disabled;
    }
    
    /**
     * Value change listener for the country change event. Sets up the cities
     * listbox according to the country.
     *
     * @param event value change event
     */
    public void countryChanged(ValueChangeEvent event) {
        SelectItem[] cityItems = getCityItems();
        if (cityItems == null) {
            selectedCities = new String[0];
        }
        else {
            // Select the first city in the list, for that country
            selectedCities = new String[]{ cityItems[0].getValue().toString() };
        }

        // reset effect
        valueChangeEffect.setFired(false);
    }

    /**
     * Value change listener called when an new item is selected in the list of
     * cities.  No actual work is done for this method but it does show
     * what a ValueChange method signature should look like.
     *
     * @param event JSF value change event
     */
    public void cityChanged(ValueChangeEvent event) {
        valueChangeEffect.setFired(false);
    }

    /**
     * Gets the option items for countries.
     *
     * @return array of country items
     */
    public SelectItem[] getCountryItems() {
        SelectItem[] countryItems =
            buildSelectItemArray("bean.selection.country", ".value", 1, 5);
        return countryItems;
    }

    /**
     * Gets the option items of cities.
     *
     * @return array of city items
     */
    public SelectItem[] getCityItems() {
        SelectItem[] cityItems = null;
        if (selectedCountry != null && selectedCountry.length() > 0) {
            SelectItem[] countryItems = getCountryItems();            
            for(int i = 0; i < countryItems.length; i++) {
                if (selectedCountry.equals(countryItems[i].getValue())) {
                    cityItems = buildSelectItemArray(
                        "bean.selection.country"+Integer.toString(i+1)+".city",
                        ".value", 1, 5);
                    break;
                }
            }
        }
        return cityItems;
    }

    /**
     * Gets the selected country.
     *
     * @return the selected country
     */
    public String getSelectedCountry() {
        return selectedCountry;
    }

    public void setSelectedCountry(String selectedCountry) {
        this.selectedCountry = selectedCountry;
    }
    
    /**
     * Gets the selected cities.
     *
     * @return array of selected cities
     */
    public String[] getSelectedCities() {
        return selectedCities;
    }

    public void setSelectedCities(String[] selectedCities) {
        this.selectedCities = selectedCities;
    }
    
    /**
     * Returns selectedCountry, translated
     *
     * @return selected country.
     */
    public String getSelectedCountryString() {
        return convertToString(
            (selectedCountry == null) ? null :
            new String[]{selectedCountry});
    }
    
    /**
     * Returns the selectedCities array a comma seperated list
     *
     * @return comma seperated list of selected cities.
     */
    public String getSelectedCitiesStrings() {
        return convertToString(selectedCities);
    }
}
