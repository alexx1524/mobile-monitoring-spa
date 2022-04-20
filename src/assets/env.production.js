(function (window) {
  window['env'] = window['env'] || {};

  // Environment variables
  window['env']['baseUrl'] = '${BASE_URL}';
  window['env']['nodeEventsFetchingInterval'] = '${NODE_EVENTS_FETCH_INTERVAL}';
})(this);
