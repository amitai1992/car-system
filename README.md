# car-system
a car system web app using angular and node js

to run the app run at the commend line: npm start

server side:
the server side use mysql driver for nodejs so, make sure to add 
the carsystem database to your local mysql server and update the password and user 
at the connection at the top of server.js.

![Alt text](https://github.com/amitai1992/car-system/blob/main/system-images/serversql.png?raw=true "Title")

front:

entry page: when connecting, the entry page will show the list of all the viacles in database autometicly:

![Alt text](https://github.com/amitai1992/car-system/blob/main/system-images/home.png?raw=true "Title")

you can also search viacle by:4X4/licence plate/viacle type:

![Alt text](https://github.com/amitai1992/car-system/blob/main/system-images/search.png?raw=true "Title")


and the result:


![Alt text](https://github.com/amitai1992/car-system/blob/main/system-images/searchresult.png?raw=true "Title")


as you can see, for each viacle you can press delete and edit, after press delete the system will ask you to confirm
the procces after click ok the viacle will be delete from the database and from the list of the viacles.

![Alt text](https://github.com/amitai1992/car-system/blob/main/system-images/delete.png?raw=true "Title")

![Alt text](https://github.com/amitai1992/car-system/blob/main/system-images/deleteResult.png?raw=true "Title").

when press edit you will be move to edit page(component) which will show you all the detailes of the selected viacle

![Alt text](https://github.com/amitai1992/car-system/blob/main/system-images/click%20edit.png?raw=true "Title").

![Alt text](https://github.com/amitai1992/car-system/blob/main/system-images/edit%20page.png?raw=true "Title").

there you can edit the detailes of the viacle, notice that for both;edit page and add page the format for licence plate is: dd-ddd-dd.

![Alt text](https://github.com/amitai1992/car-system/blob/main/system-images/edit%20work.png?raw=true "Title").


add page:
at the add page you can add a new viacle to database, notice that in exeption of comments all other fileds need to be fill.

![Alt text](https://github.com/amitai1992/car-system/blob/main/system-images/addCar.png?raw=true "Title").


![Alt text](https://github.com/amitai1992/car-system/blob/main/system-images/add%20car%20licence%20pattern.png?raw=true "Title").


![Alt text](https://github.com/amitai1992/car-system/blob/main/system-images/add%20confirm.png?raw=true "Title").

