/* Magic Mirror
 * Module: MMM-ParcelTrack
 *
 * By derTim https://github.com/derTim/MMM-ParcelTrack
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const request = require("request");

module.exports = NodeHelper.create({

    overviewUrl: "https://uberblic.com/api/parceltrack/parcels",
    detailUrl: "https://uberblic.com/api/parceltrack/parcels/",

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
        console.log('Fetching ParcelTrack Data for user ' + this.config.user_id + ' interval: ' + this.config.updateInterval);
        request(options, (error, response, body) => {
            if (response.statusCode === 200) {
                body = JSON.parse(body);
                if(typeof body.response!== 'undefined' && body.response) {
                    this.handleData(body);
                } else {
                    console.log("Error no ParcelTrack data");
                }
            } else {
                console.log("Error getting ParcelTrack data " + response.statusCode);
            }
        });
    },

    handleData: function(data){

      var parcels = data.response.parcels;


      for(var parcel in data.response.parcels){
      	//console.log(data.response.parcels[parcel]);
      }

      this.sendSocketNotification("DATA", parcels);

    }
});
