"use strict";

var mockBreweries = {
    "status": "success",
    "data": [
        {
            "type": "brewery",
            "updateDate": "2015-07-09 17:58:32",
            "createDate": "2012-01-03 02:41:57",
            "statusDisplay": "Verified",
            "id": "RzvedX",
            "name": "Harpoon Brewery",
            "description": "We started the Harpoon Brewery in 1986 because—like today—we loved beer and wanted more quality choices.  \r\n\r\nThere was only one problem: we were beer lovers, not brewers. We knew what we wanted to drink, but we needed some help actually brewing it. So we enlisted our first brewer, took over some warehouse space on the Boston waterfront, and began introducing fresh, local craft beer to Boston drinkers. We tried to do it in a way that captured the spirit of fun that had brought us to beer in the first place. From that warehouse, surrounded by fish companies on the docks of South Boston (neighboring what is now the Seaport District), we couldn’t imagine that craft brewing would become what it has today.  \r\n\r\nWe still remember our days on the other side of the bar, and have spent as much time spreading the joy of beer drinking as we have focusing on recipes, ingredients, and brewing equipment. Hopefully our sense of gratitude is reflected in both the quality of the beer and the spirit of fun and enjoyment surrounding our beer and breweries. We invite all of you to visit our Boston brewery, where it all began, and our beautiful brewery in Windsor, Vermont.",
            "website": "http://www.harpoonbrewery.com/",
            "established": "1986",
            "isOrganic": "N",
            "images": {
                "large": "https://s3.amazonaws.com/brewerydbapi/brewery/RzvedX/upload_6ztnSI-large.png",
                "medium": "https://s3.amazonaws.com/brewerydbapi/brewery/RzvedX/upload_6ztnSI-medium.png",
                "icon": "https://s3.amazonaws.com/brewerydbapi/brewery/RzvedX/upload_6ztnSI-icon.png"
            },
            "status": "verified"
        },{
            "type": "brewery",
            "updateDate": "2014-07-15 20:03:29",
            "createDate": "2012-01-03 02:42:00",
            "statusDisplay": "Verified",
            "id": "nLsoQ9",
            "name": "Lagunitas Brewing Company",
            "description": "From our earliest days of striving to make consistently good beer, and instead making beer that ranged from vile, to barely drinkable, to wonderful, to elegant, to questionable-at-best. From being castigated by our West Marin neighbors to finally suffering an 'eviction' by our West Marin septic system. From landing in the welcoming arms of Petaluma, and actually getting our beer into bottles, onto the streets, and into the hands of sympathatic beer geeks, to steadily losing less money each month. From all this and more, Lagunitas Brewing Company is emerging as a battle-tested brewery capable of making great beer out of goat's milk, brambles, and asphalt on the surface of the Moon, if need be.\r\n\r\nAs the poet once said, 'Where, but for the grace of God and the kindness of strangers, go I'. Where go we indeed, whatever that means.",
            "website": "http://www.lagunitas.com/",
            "established": "1993",
            "isOrganic": "N",
            "images": {
                "large": "https://s3.amazonaws.com/brewerydbapi/brewery/nLsoQ9/upload_GfxgCC-large.png",
                "medium": "https://s3.amazonaws.com/brewerydbapi/brewery/nLsoQ9/upload_GfxgCC-medium.png",
                "icon": "https://s3.amazonaws.com/brewerydbapi/brewery/nLsoQ9/upload_GfxgCC-icon.png"
            },
            "status": "verified"
        },{
            "type": "brewery",
            "updateDate": "2015-07-09 18:44:08",
            "createDate": "2012-01-03 02:41:58",
            "statusDisplay": "Verified",
            "id": "bZCYqk",
            "name": "Jack's Abby Brewing",
            "description": "Jack's Abby Brewing was formally founded in January of 2011 by three brothers, Jack, Eric and Sam Hendler, who grew up in a family business. The ideas behind it, however, date back over ten years to when Jack was still in college experimenting with home brews. After graduating, Jack became the head brewer of one of the largest brewpubs in the eastern US. He earned joint diplomas in Brewing Technology from Siebel Institute of Chicago and Doemans Academy of Munich. Currently he is a member of the Master Brewers Association.",
            "website": "http://jacksabbybrewing.com/",
            "established": "2011",
            "isOrganic": "N",
            "images": {
                "large": "https://s3.amazonaws.com/brewerydbapi/brewery/bZCYqk/upload_ZopDbd-large.png",
                "medium": "https://s3.amazonaws.com/brewerydbapi/brewery/bZCYqk/upload_ZopDbd-medium.png",
                "icon": "https://s3.amazonaws.com/brewerydbapi/brewery/bZCYqk/upload_ZopDbd-icon.png"
            },
            "status": "verified"
        },{
            "type": "brewery",
            "updateDate": "2014-11-17 19:32:26",
            "createDate": "2013-10-14 23:21:33",
            "id": "gZYGbL",
            "name": "Downeast Cider House",
            "description": "Downeast Cider House was founded by Ross Brockman and Tyler Mosher during their senior year of college. Through their travels abroad, they took notice of the large presence of hard cider in bars, restaurants, and liquor stores. Upon evaluating the disappointing landscape of hard cider in the United States, Ross and Tyler have made it their goal to build New England's first and largest craft hard cider company, and restore hard cider to its rightful place in American culture.\r\n\r\nDowneast Cider House currently produces one type of cider, Original Blend. The Original Blend is made from freshly pressed Maine apples because we believe in making the best product we possibly can, while also supporting local agriculture. We use Red Delicious, McIntosh, Cortland, and Gala apples in our cider. The Original Blend, currently packaged in kegs, is distributed through Pine State Trading Company (Northern Maine), Nappi Distributors.(Portland and Southern Maine), L. Knife & Sons (South Shore Mass), Seaboard Products (North Shore Mass), and Craft Brewers Guild (Mass minus north and south shores)",
            "website": "http://www.downeastcider.com",
            "isOrganic": "N",
            "images": {
                "large": "https://s3.amazonaws.com/brewerydbapi/brewery/gZYGbL/upload_l715pj-large.png",
                "medium": "https://s3.amazonaws.com/brewerydbapi/brewery/gZYGbL/upload_l715pj-medium.png",
                "icon": "https://s3.amazonaws.com/brewerydbapi/brewery/gZYGbL/upload_l715pj-icon.png"
            },
            "status": "verified",
            "statusDisplay": "Verified"
        },{
            "type": "brewery",
            "updateDate": "2015-11-17 15:48:03",
            "createDate": "2012-01-03 02:42:01",
            "statusDisplay": "Verified",
            "id": "qIqpZc",
            "name": "Magic Hat Brewing Company",
            "description": "The Saturnalian Saga of Magic Hat began in 1994 when our first batch of beer was brewed in a funky little space on Flynn Avenue, in Burlington, Vermont.  Dozens of beers and a brewery later, the Vermont brewery finds itself reaching more than 30 states with its unique take on classic styles.  Magic Hat continues to be a leader in craft beer and is currently the only craft brewer putting a performance in every bottle.",
            "website": "http://www.magichat.net/",
            "established": "1994",
            "isOrganic": "N",
            "images": {
                "large": "https://s3.amazonaws.com/brewerydbapi/brewery/qIqpZc/upload_rtve34-large.png",
                "medium": "https://s3.amazonaws.com/brewerydbapi/brewery/qIqpZc/upload_rtve34-medium.png",
                "icon": "https://s3.amazonaws.com/brewerydbapi/brewery/qIqpZc/upload_rtve34-icon.png"
            },
            "status": "verified"
        },{
            "type": "brewery",
            "updateDate": "2015-07-09 17:26:43",
            "createDate": "2012-01-03 02:41:50",
            "statusDisplay": "Verified",
            "id": "nvfMg1",
            "name": "Cambridge Brewing Company",
            "description": "CBC blends a passion for fresh, flavorful beer and delicious, imaginative cuisine to create a one-of-a-kind dining experience for greater Boston. Since opening in 1989, CBC has been the destination for diners with adventurous palates and a thirst for both authentic flavors and unique interpretations of classic beer styles. To satisfy these appetites, CBC’s brewmaster and chef routinely collaborate on investigating beer-food pairings and ways in which beer—even brewing ingredients—can transform traditional dishes and inspire new ones. This eagerness to ask ourselves “what if?” has earned us a slew of accolades, a shelf full of awards and devoted customers who are always eager to try what CBC comes up with next.",
            "website": "http://www.cambrew.com/",
            "established": "1989",
            "isOrganic": "N",
            "images": {
                "large": "https://s3.amazonaws.com/brewerydbapi/brewery/nvfMg1/upload_INXAIP-large.png",
                "medium": "https://s3.amazonaws.com/brewerydbapi/brewery/nvfMg1/upload_INXAIP-medium.png",
                "icon": "https://s3.amazonaws.com/brewerydbapi/brewery/nvfMg1/upload_INXAIP-icon.png"
            },
            "status": "verified"
        }
    ],
    "totalResults": 1,
    "numberOfPages": 1,
    "currentPage": 1
};

module.exports = function(app, brewerydbModel) {
    app.get("/api/project/brewery/:breweryid", getBreweryById);
    app.get("/api/project/beer/:beerid/brewery", getBreweryForBeer);
    app.get("/api/project/trendingBreweries", getTrendingBreweries);

    // send back the brewery object that matches the breweryid
    function getBreweryById(req, res) {
        brewerydbModel
            .getBreweryById(req.params.breweryid)
            .then(function(breweryData) {
                res.json(breweryData);
            });
    }

    // send back the brewery object that brews the beer
    function getBreweryForBeer(req, res) {
        brewerydbModel
            .getBreweryForBeer(req.params.beerid)
            .then(function(breweryData) {
                res.json(breweryData);
            });
    }

    // send back a list of breweries that are popular amongst users
    function getTrendingBreweries(req, res) {
        res.json(mockBreweries);
    }
};