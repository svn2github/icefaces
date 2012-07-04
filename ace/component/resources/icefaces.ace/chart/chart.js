if (!window.ice['ace']) {
    window.ice.ace = {};
}
ice.ace.Charts = {};
ice.ace.Chart = function (id, data, cfg) {
    var self = this;
    this.id = id;
    this.jqId = ice.ace.escapeClientId(this.id);
    this.cfg  = cfg;
    this.behaviors = cfg.behaviors;
    this.chart_region = ice.ace.jq(this.jqId+'_chart');


    // Clear existing ace plot instance.
    if (ice.ace.Charts[id]) {
        if (ice.ace.Charts[id].plot)
            ice.ace.Charts[id].plot.destroy();
        else // clean up error message that is probably present if plot is not present
            this.chart_region.html('');
    }

    ice.ace.jq.jqplot.config.catchErrors = true;
    ice.ace.jq.jqplot.config.errorBorder = '1px solid #aaaaaa';
    this.plot = ice.ace.jq.jqplot(this.jqId.substring(1)+'_chart', data, cfg);
    ice.ace.Charts[id] = self;

    if (cfg.handlePointClick)
        ice.ace.jq(this.jqId).off("jqplotDataClick").on(
                "jqplotDataClick",
                function(e, seriesIndex, pointIndex, data) {
                    self.handlePointClick.call(self, e, seriesIndex, pointIndex, data);
                }
    );

    ice.ace.jq(this.jqId).off("jqplotDragStart").on(
            "jqplotDragStart",
            function(e, seriesIndex, pointIndex, data) {
                self.handleDragStart.call(self, e, seriesIndex, pointIndex, data);
            }
    );

    ice.ace.jq(this.jqId).off("jqplotDragStop").on(
            "jqplotDragStop",
            function(e, seriesIndex, pointIndex, data) {
                self.handleDragStop.call(self, e, seriesIndex, pointIndex, data);
            }
    );

    if (this.chart_region.is(':hidden')) {
        if (!this.cfg.disableHiddenInit) {
            var _self = this;
            setTimeout(function () { _self.plot.replot(); }, 100);
        }
    }
};


ice.ace.Chart.prototype.handleDragStart = function(e, seriesIndex, pointIndex, data) {
    var toCategoryValue = function(indexVal, axis) { return (axis.ticks[Math.round(indexVal) - 1]); };

    var options = {
        source: this.id,
        execute: '@this',
        render: (this.behaviors && this.behaviors.dragStart && this.behaviors.dragStart.render) ? '' : '@none'
    };

    var params = {};
    // Persist point drag info for stop event.
    this.dragXAxis = this.plot.series[seriesIndex]._xaxis;
    this.dragYAxis = this.plot.series[seriesIndex]._yaxis;
    this.dragSeriesIndex = seriesIndex;
    this.dragPointIndex = pointIndex;

    options.params = params;

    var pointData = this.plot.series[seriesIndex]._plotData[pointIndex].slice(),
        xValueIsCategory = this.dragXAxis.renderer instanceof ice.ace.jq.jqplot.CategoryAxisRenderer,
        yValueIsCategory = this.dragYAxis.renderer instanceof ice.ace.jq.jqplot.CategoryAxisRenderer;

    if (xValueIsCategory)
        pointData[0] = toCategoryValue(pointData[0], this.dragXAxis);

    if (yValueIsCategory)
        pointData[1] = toCategoryValue(pointData[1], this.dragYAxis);

    // Record start value
    this.dragStartValue = pointData;

    // Call behaviours
    if (this.behaviors)
        if (this.behaviors.dragStart) {
            ice.ace.ab(ice.ace.extendAjaxArguments(this.behaviors.dragStart,options));
            return;
        }
};

ice.ace.Chart.prototype.handleDragStop = function(e, seriesIndex, pointIndex, data) {
    var toCategoryValue = function(indexVal, axis) { return (axis.ticks[Math.round(indexVal) - 1]); };

    var options = {
        source: this.id,
        execute: '@this',
        render: (this.behaviors && this.behaviors.dragStop && this.behaviors.dragStop.render) ? '' : '@none' };

    var params = {};

    var pointData = [pointIndex[this.dragXAxis.name],pointIndex[this.dragYAxis.name]],
        xValueIsCategory = this.dragXAxis.renderer instanceof ice.ace.jq.jqplot.CategoryAxisRenderer,
        yValueIsCategory = this.dragYAxis.renderer instanceof ice.ace.jq.jqplot.CategoryAxisRenderer;

    if (xValueIsCategory)
        pointData[0] = toCategoryValue(pointData[0], this.dragXAxis);

    if (yValueIsCategory)
        pointData[1] = toCategoryValue(pointData[1], this.dragYAxis);

    var pointDataDiffers = pointData[0] != this.dragStartValue[0] ||
            pointData[1] != this.dragStartValue[1];

    if (pointDataDiffers) {
       var dragRecord = [];
       dragRecord.push([[pointData[0], pointData[1]], this.dragSeriesIndex, this.dragPointIndex]);
       params[this.id+"_drag"] = JSON.stringify(dragRecord);
    }

    options.params = params;

    if (this.behaviors)
        if (this.behaviors.dragStop) {
            ice.ace.ab(ice.ace.extendAjaxArguments(this.behaviors.dragStop,options));
            return;
        }

    if (pointDataDiffers)
        ice.ace.AjaxRequest(options);
};

ice.ace.Chart.prototype.handlePointClick = function(e, seriesIndex, pointIndex, data) {
    var options = {
            source: this.id,
            execute: '@this',
            render: '@this'
        };

    var params = {};
    params[this.id+'_selection'] = data;
    options.params = params;

    options.onsuccess = function(responseXML) {
        ice.ace.selectCustomUpdates(responseXML, function(id, content) {
            ice.ace.AjaxUtils.updateElement(id, content);
        });
        return true;
    };

    if (this.behaviors)
        if (this.behaviors.click) {
            ice.ace.ab(ice.ace.extendAjaxArguments(this.behaviors.click, options));
            return;
        }

    ice.ace.AjaxRequest(options);
}

ice.ace.Chart.prototype.downloadAsImage = function() {
    this.chart_region.jqplotSaveImage();
}

ice.ace.Chart.prototype.exportToImage = function(img) {
    ice.ace.jq(img).attr('src',
        this.chart_region.jqplotToImageStr());
}
