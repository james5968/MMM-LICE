/* Magic Mirror
 * Module: MMM-LICE
 *
 * By Mykle1 added to by JamesAshford
 *
 */
Module.register("MMM-LICE-MK2", {

    // Module config defaults.
    defaults: {
        useHeader: false, // true if you want a header      
        header: "", // Any text you want. useHeader must be true
        maxWidth: "300px",
        animationSpeed: 3000,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 500 * 60 * 1000, // 45 min = 992 in a 31 day month (1000 free per month)

    },

    getStyles: function() {
        return ["MMM-LICE-MK2.css"];
    },

    getScripts: function() {
        return ["moment.js"];
    },


    start: function() {
        Log.info("Starting module: " + this.name);


        //  Set locale.
        this.LICE = {};
        this.scheduleUpdate();
    },


    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = this.translate("Show me the money . . .");
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("small", "bright", "light", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

        var script = document.createElement('script');
        script.src = '//code.jquery.com/jquery-1.11.0.min.js';
        document.getElementsByTagName('head')[0].appendChild(script);

        $.getJSON("https://api.ratesapi.io/api/latest?base=GBP&symbols=EUR", function(data) {
            var items = [];
            $.each(data.rates, function(key, val) {
                items.push(key + "," + val);
            });
        });


        var top = document.createElement("div");
        top.classList.add("list-row");


        // timestamp
        var timestamp = document.createElement("div");
        timestamp.classList.add("small", "bright", "timestamp");
        timestamp.innerHTML = "Rate as of " + moment.unix(LICE.date).format('h:mm a');
        wrapper.appendChild(timestamp);


        // source currency
        var base = document.createElement("div");
        base.classList.add("small", "bright", "base");
        base.innerHTML = "Base Currency = GBP";
        wrapper.appendChild(base);


        // create table
        var Table = document.createElement("table");

        // create row and column for Currency
        var Row = document.createElement("tr");
        var Column = document.createElement("th");
        Column.classList.add("align-left", "small", "bright", "Euro");
        Column.innerHTML = "Currency";
        Row.appendChild(Column);

        // create row and column for Rate
        var Rates = document.createElement("th");
        Rates.classList.add("align-left", "small", "bright", "Rates");
        Rates.innerHTML = "Rates" + items[0];
        Row.appendChild(Rates);


        Table.appendChild(Row);
        wrapper.appendChild(Table);



        // this gets the key from the key/pair of the element (hasOwnProperty)
        for (var Key in LICE.quotes) {
            if (LICE.quotes.hasOwnProperty(Key)) {


                //// Learned this on jsfiddle. HOORAY!
                //// This dynamically creates the div/tags for each element of LICE.quotes
                var symbols = LICE.quotes;
                for (var c in symbols) {

                    var newElement = document.createElement("div");
                    newElement.classList.add("align-left", "xsmall", "bright", "symbol");
                    newElement.innerHTML += Key + ' &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp ' + LICE.quotes[Key]; // + " = " + symbols[c];
                }
            }

            wrapper.appendChild(newElement);

        } // <-- closes key/pair loop

        return wrapper;

    }, // closes getDom




    /////  Add this function to the modules you want to control with voice //////


});