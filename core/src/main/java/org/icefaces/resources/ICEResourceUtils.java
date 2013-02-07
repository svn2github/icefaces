package org.icefaces.resources;

import org.icefaces.util.UserAgentInfo;

/**
 * Created with IntelliJ IDEA.
 * User: Nils
 * Date: 1/25/13
 * Time: 2:39 PM
 * To change this template use File | Settings | File Templates.
 */
public class ICEResourceUtils {
    public static final ResourceInfo BLANK_INFO = new ResourceInfo();

    public static ResourceInfo getResourceInfos(UserAgentInfo uaInfo,
                                                ICEResourceDependency inputDep,
                                                ICEResourceLibrary library) {
        ResourceInfo returnDep = null;

        if (inputDep != null) {
            if (inputDep.browserOverride().length > 0) {
                returnDep = new ResourceInfo(inputDep, library);

                for (ICEBrowserDependency override : inputDep.browserOverride()) {
                    if (uaInfo.isBrowserType(override.browser())) {
                        returnDep = new ResourceInfo(override, library);
                        break;
                    }
                }
            } else if (uaInfo.isBrowserType(inputDep.browser())) {
                returnDep = new ResourceInfo(inputDep, library);
            }

            // If indicated by blank info, skip adding a dependency for this annotation
            if (returnDep != null && returnDep.equals(BLANK_INFO)) returnDep = null;
        }

        return returnDep;
    }
}
