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

import javax.faces.context.FacesContext;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;
import java.util.logging.Level;

/**
 * Store values of Draggable and Droppables between requests
 *
 */
public class DragCache {
    private static Logger log = Logger.getLogger(DragCache.class.getName());

    private static final String CACHE_CLEARED =
            "ICESOFT_DRAG_CACHE_CLEARED_FLAG";
    private static final String CACHE_KEY = "ICESOFT_DRAG_CACHE_RGDM_FLAG";
    private static final String KEY_START = "ICEDRAGKEY[";
    private static final String KEY_END = "]ICEDRAGKEY";


    /**
     * Add a value to the cache
     * @param value
     * @param context
     * @return
     */
    public static String put(Object value, FacesContext context) {
        Map sessionMap = context.getExternalContext().getSessionMap();
        //TODO: Clear out when values are no longer needed. How can this be detected?
        if (sessionMap.get(CACHE_KEY) == null) {
            sessionMap.put(CACHE_KEY, new HashMap());
        }
        Map cache = (Map) sessionMap.get(CACHE_KEY);
        String key = KEY_START + cache.size() + KEY_END;
        cache.put(key, value);

        return key;
    }



    /**
     * Get a value from the cache
     * @param key
     * @param context
     * @return
     */
    public static Object get(String key, FacesContext context) {
        if (key == null) {
            throw new NullPointerException("Key can't be null");
        }
        key = key.trim();
        Map sessionMap = context.getExternalContext().getSessionMap();
        Map cache = (Map) sessionMap.get(CACHE_KEY);
        if (cache == null) {
            throw new IllegalStateException(
                    "No Drag component placed a value in the cache.");
        }
        Object o = cache.get(key);
        if (o == null) {
            log.log(Level.SEVERE, "DragCache: No value found for key [" + key + "]");
        }
        return cache.get(key);
    }

}
