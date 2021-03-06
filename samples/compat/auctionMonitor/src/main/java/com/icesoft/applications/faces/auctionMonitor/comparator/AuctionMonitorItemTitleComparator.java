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

package com.icesoft.applications.faces.auctionMonitor.comparator;

import com.icesoft.applications.faces.auctionMonitor.beans.AuctionMonitorItemBean;

/**
 * Class used to compare the titles of two auction items
 */
public class AuctionMonitorItemTitleComparator
        extends AuctionMonitorItemComparator {
    public int compare(AuctionMonitorItemBean bean1,
                       AuctionMonitorItemBean bean2) {
        return bean1.getTitle().compareTo(bean2.getTitle());
    }
}
