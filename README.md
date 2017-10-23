# Album-Search-App
This album search app is built for users to search the albums of their favorite artists! You can open it using browser and type the name of your favorite artist in the textbox and click search button. This app will send a request to iTunes and fetch the data and display the data in your browser. 

# User Interface
![UI](https://github.com/ibwpang/AlbumSearchApp/blob/master/img/1.png)

![UI](https://github.com/ibwpang/AlbumSearchApp/blob/master/img/2.png)

![UI](https://github.com/ibwpang/AlbumSearchApp/blob/master/img/3.png)

# How I build this app
This app is built using React and Bootstrap. When users type the name of the artist in the textbox and click search button, React will send a GET request to iTunes with a query: 
```
https://itunes.apple.com/search?term="+query+"&entity=album

``` 
the "query" in this URL is the content that the user typed in the textbox, for example, "Bob Dylan":
```
https://itunes.apple.com/search?term=Bob%20Dylan&entity=album

``` 
I used Ajax in React to send a request to iTunes, and receive a response which contains all of the data about the albums of this artist. The fetched data is stored in React and then displayed in the webpage. 
