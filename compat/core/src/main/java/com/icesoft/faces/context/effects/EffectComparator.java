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

package com.icesoft.faces.context.effects;

import java.util.Comparator;


public class EffectComparator implements Comparator {


    /**
     * Sort in Descending order
     *
     * @param o1
     * @param o2
     * @return
     */
    public int compare(Object o1, Object o2) {
        Effect e1 = (Effect) o1;
        Effect e2 = (Effect) o2;
        if (e1.getSequenceId() == e2.getSequenceId()) {
            return 0;
        }
        if (e1.getSequenceId() > e2.getSequenceId()) {
            return -1;
        } else {
            return 1;
        }
    }
}
