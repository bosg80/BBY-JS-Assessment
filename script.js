    /****************************************************/
    // This function creates a script tag with a link to the appropriate JSON feed
    /****************************************************/
    function createJSONscript(url){
        // create script element
        var script = document.createElement('script');

        // assign src with callback name
        script.src = url;

        // insert script to document and load content
        document.body.appendChild(script);    
    }

    /****************************************************/
    // This function cycles through the array of subcategories
    /****************************************************/

    function getCategory(content) {
        var listGroup = document.getElementById('list-group');
        var prodCat = content.subCategories;
        prodCat.sort;
        for(var a = 0; a < prodCat.length; a++ ){
            var catId = prodCat[a].id;
            var anchor = document.createElement('a');
            anchor.id = catId;
            anchor.className += "list-group-item";
            anchor.innerHTML = prodCat[a].name;
            var catName = document.getElementById('lead');

            anchor.setAttribute('data-product', a);
            anchor.addEventListener('click', function() {
                var x = this.getAttribute('data-product');
                catId = this.id;
                removeLastScript();
                var category = document.getElementById('products');
                category.innerHTML = '';
                getProducts(catId);
                catName.innerHTML = prodCat[x].name;
            });
            listGroup.appendChild(anchor);
        }
    }

    /****************************************************/
    //Remove the last script from body element
    /****************************************************/

    function removeLastScript() {
        var scripts = document.getElementsByTagName('script');
        var scriptsNum = scripts.length;
        var lastScript = scriptsNum - 1; 
        lastScript = scripts[lastScript];
        lastScript.remove();
    };


    /****************************************************/
    //This function creates the url for retrieving the JSON data
    /****************************************************/

    function getProducts(id){
        var jsonURL = "http://www.bestbuy.ca/api/v2/json/search?"
        var prodId = id;
        var fullURL = jsonURL + "categoryid=" + id + "&callback=displayProducts";
        createJSONscript(fullURL);
    }


    /****************************************************/
    //This function gets all products from specified category
    /****************************************************/

    function displayProducts(bby)
    {
        // get the table to add items to
        var table = document.getElementById('products');
        var prodlist = bby.products;

        // cycle through the array for each of the products
        for (var a = 0; a < prodlist.length; ++a)
        {
            // keep a reference to an individual products object
            var products = prodlist[a];
            var prodName = products.name;

            // create a DIV element to append to ID products
            var item = document.createElement('div');
            item.className += "col-sm-4 col-lg-4 col-md-4";

            //var item = document.createElement('div');
            item.setAttribute('data-product', a);
            item.addEventListener('click', function() {
                var x = this.getAttribute('data-product');

                //Create modal elements
                var prodName = prodlist[x].name;
                var modalName = document.createElement('h2');
                modalName.className += "modal-name";
                modalName.innerHTML = prodName;

                var prodImg = '<img src="'+prodlist[x].highResImage+'" width="300"/>';
                var modalImg = document.createElement('div');
                modalImg.className += "modal-img";
                modalImg.innerHTML = prodImg;

                var prodDesc = prodlist[x].shortDescription;
                var modalDesc = document.createElement('p');
                modalDesc.className += "modal-description";
                modalDesc.innerHTML = prodDesc;

                var prodDesc = prodlist[x].shortDescription;
                var prodSale = "$"+prodlist[x].salePrice;
                var prodPrice = "$"+prodlist[x].regularPrice;

                var myArray = [modalName, modalImg];
                getModal();
                var modalWrapper = document.getElementById('modal-wrapper');
                //modalWrapper.innerHTML= myArray;

                modalWrapper.appendChild(modalName);
                modalWrapper.appendChild(modalImg);
                modalWrapper.appendChild(modalDesc);

            });
            table.appendChild(item);


            // create a DIV element to append to CLASS  "col-sm-4 col-lg-4 col-md-4"
            var thumbnail = document.createElement('div');
            thumbnail.className += "thumbnail";
            item.appendChild(thumbnail);


            // create an image element to append to CLASS "thumbnail"
            var imgElem = document.createElement('img');
            imgElem.src = products.thumbnailImage;
            thumbnail.appendChild(imgElem);


            // create a DIV element to append to CLASS "thumbnail"
            var caption = document.createElement('div');
            caption.className += "caption";
            thumbnail.appendChild(caption);


            // create a H4 element to append to CLASS "caption"
            var price = document.createElement('h4');
            price.className += "pull-right sale-price";
            caption.appendChild(price);
            price.innerHTML = "$"+products.salePrice;


            // create another H4 element to append to CLASS "caption"
            var name = document.createElement('h4');
            name.className += "name";
            caption.appendChild(name);
            name.innerHTML = products.name;


        }
    }


    /****************************************************/
    //Get category for side menu and initial products
    /****************************************************/

    createJSONscript('http://www.bestbuy.ca/api/v2/json/category/?callback=getCategory');
    createJSONscript('http://www.bestbuy.ca/api/v2/json/search?categoryid=departments&callback=displayProducts');


