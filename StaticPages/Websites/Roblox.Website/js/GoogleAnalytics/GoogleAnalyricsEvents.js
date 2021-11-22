var GoogleAnalyticsEvents = new function () {
    this.FireEvent = function (args) {
        if (typeof (_gaq) != typeof (undefined)) {
            var eventsArray = ["_trackEvent"];
            var eventsArrayB = ["b._trackEvent"];
            _gaq.push(eventsArray.concat(args));
            _gaq.push(eventsArrayB.concat(args));
        }
    }
}

}
