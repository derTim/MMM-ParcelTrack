/* Magic Mirror
 * Module: MMM-ParcelTrack
 *
 * By derTim https://github.com/derTim/MMM-ParcelTrack
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const request = require("request");

module.exports = NodeHelper.create({

    overviewUrl: "https://parceltrack.de/api/v3/parcels",
    detailUrl: "https://parceltrack.de/api/v3/parcels",
    hideDeliveredAfter: 0,


    socketNotificationReceived: function(notification, payload){
        if(notification === "CONFIG"){
            this.config = payload;
            this.getData();
            setInterval(() => {
                this.getData();
            }, this.config.updateInterval);
        }
    },
    getData: function() {
        var options = {
            url: this.overviewUrl + "?" +
            "user_id=" + this.config.user_id
        };
        console.log('Fetching ParcelTrack Data for user ' + this.config.user_id + ' interval: ' + this.config.updateInterval + ' URL: ' + options.url);
        request(options, (error, response, body) => {
            if (response.statusCode === 200) {
                body = JSON.parse(body);
                //if(typeof body.response!== 'undefined' && body.response) {
                    this.handleData(body);
                //} else {
                //    console.log("Error no ParcelTrack data");
                //}
            } else {
                console.log("Error getting ParcelTrack data " + response.statusCode);
            }
        });
    },

    handleData: function(data){
    
      var parcels = data;
    

      for(var parcel in parcels){
        if(parcels[parcel].status == 'delivered'){
            var laststatus = Date.parse(parcels[parcel].status_timestamp);
            var now = Date.now();
            var age = Math.ceil(Math.abs(laststatus - now)/ (1000 * 3600 * 24));
            if (age>this.config.hideDeliveredAfter) {
                delete parcels[parcel];
            }
        }
      }

      //console.log(parcels);
      this.sendSocketNotification("DATA", parcels);

    }
});
