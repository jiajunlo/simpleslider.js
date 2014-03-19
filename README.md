simpleslider.js
=========

A plugin to slider the pictures.

Firstly, you should include the css and js files.

###
    <link rel="stylesheet" href="css/simpleslider.css">
    <script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="js/simpleslider/simpleslider.js"></script>

Then you can set the config as you like

###
    <script type="text/javascript">
        $.slider({
            id: "demo",       //the id of the slider container
            width: 1000,      //the width of the slider image, default: the width of the slider container's parent
            arrow: true,      //the operation by the arrows(prev and next), default: false
            dot: true,        //the operation by the dots, default: false
            speed: 3000,      //the scroll speed of the slider, default: 3000(ms);
            folder: "images", //the folder of the images, default: ""
            images: ["cf_1.jpg", "cf_2.jpg", "cf_3.jpg", "cf_4.jpg", "cf_5.jpg", "cf_6.jpg"]
                              //the images in the slider
        }); 
    </script>
    
Note: cuz depending on the jquery 2.1, so this plugin can not support IE6-8.

Click here to see the [Demo](http://www.jiajunlo.com/demo/simpleslider.js).
