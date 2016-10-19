/* Magic Mirror
 * Module: MMM-ShipmentTracking
 *
 * By fewieden https://github.com/fewieden/MMM-ShipmentTracking
 * MIT Licensed.
 */

Module.register("MMM-ParcelTrack",{

    tracking: [],

    defaults: {
        user_id: "",
        format: false,
        updateInterval: 60 * 60 * 1000
    },

    start: function(){
        Log.log(this.name + ' is started!');
        this.config.language = config.language;
        moment.locale(config.language);
        this.sendSocketNotification("CONFIG", this.config);
    },

    getStyles: function() {
        return ["font-awesome.css", "MMM-ParcelTrack.css"];
    },

    getScripts: function() {
        return ["moment.js"];
    },

    getTranslations: function() {
        return {
            en: "translations/en.json",
            de: "translations/de.json"
        };
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.classList.add('small', 'align-left');
        var header = document.createElement("header");
        var i = document.createElement("i");
        i.classList.add('fa', 'fa-truck', 'icon');
        var text = document.createElement("span");
        text.innerHTML = this.translate('SHIPMENT_TRACKING');
        header.appendChild(i);
        header.appendChild(text);
        wrapper.appendChild(header);

        var table = document.createElement("table");
        table.classList.add('table');
        table.appendChild(this.createLabelRow());
        var keys = Object.keys(this.tracking);
        if(keys.length) {
	        for(var n = 0; n < keys.length; n++){
	            this.appendData(this.tracking[keys[n]], table);
            }
        } else {
            var row = document.createElement("tr");
	        var status = document.createElement("td");
            status.setAttribute('colspan', 3);
	        status.innerHTML = this.translate("NO_DATA");
	        row.appendChild(status);
	        table.appendChild(row);
        }
        wrapper.appendChild(table);

        return wrapper;
    },

    socketNotificationReceived: function(notification, payload){
        if(notification === 'DATA'){
            this.tracking = payload;
            this.updateDom(300);
        } else if(notification === 'ERROR'){
            Log.error(payload.error);
        }
    },

    createLabelRow: function(){
        var labelRow = document.createElement("tr");

        var carrierLabel = document.createElement("th");
        var carrierIcon = document.createElement("i");
        carrierIcon.classList.add("fa", "fa-truck");
        carrierLabel.appendChild(carrierIcon);
        labelRow.appendChild(carrierLabel);

        var dateLabel = document.createElement("th");
        var dateIcon = document.createElement("i");
        dateIcon.classList.add("fa", "fa-calendar");
        dateLabel.appendChild(dateIcon);
        labelRow.appendChild(dateLabel);

        var idLabel = document.createElement("th");
        var idIcon = document.createElement("i");
        idIcon.classList.add("fa", "fa-tags");
        idLabel.appendChild(idIcon);
        labelRow.appendChild(idLabel);

        return labelRow;
    },

    appendData: function(data, table){
        var row = document.createElement("tr");
        console.log(data);
        var carrierName = document.createElement("td");
        carrierName.innerHTML = data.courier;
        row.appendChild(carrierName);

        var date = document.createElement("td");
        if(this.config.format){
            date.innerHTML = moment(data.timestamp).format(this.config.format);
        } else {
            date.innerHTML = moment(data.timestamp).fromNow();
        }
        row.appendChild(date);

        var id = document.createElement("td");
        id.innerHTML = data.content;
        row.appendChild(id);

        table.appendChild(row);

        var subRow = document.createElement("tr");

        var status = document.createElement("td");
        status.setAttribute('colspan', 3);
        status.innerHTML = data.status; //data.status === 'NO_DATA_ID' ? this.translate(data.status) : data.status;
        subRow.appendChild(status);

	table.appendChild(subRow);
    }
});
