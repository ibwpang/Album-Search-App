# Album-Search-App
This album search app is built for users to search the albums of their favorite artists! You can open it using browser and type the name of your favorite artist in the textbox and click search button. This app will send a request to iTunes and fetch the data and display the data in your browser. 

# User Interface
![UI](https://github.com/ibwpang/AlbumSearchApp/blob/master/img/1.png)

![UI](https://github.com/ibwpang/AlbumSearchApp/blob/master/img/2.png)

![UI](https://github.com/ibwpang/AlbumSearchApp/blob/master/img/3.png)

# How I build this app
This app is built using React, Bootstrap. Thanks to the iTunes API, I can get the data of albums easily. When users type the name of the artist in the textbox and click search button, React will send a GET request to iTunes with a query: 
```
https://itunes.apple.com/search?term="+query+"&entity=album

``` 
the "query" in this URL is the content that the user typed in the textbox, for example, "Bob Dylan":
```
https://itunes.apple.com/search?term=Bob%20Dylan&entity=album

``` 
I used Ajax to send a request to iTunes, and receive a response from iTunes which contains all of the data about the albums of this artist. The fetched data is stored and then displayed in the webpage. 

What you fetched from iTunes:
```
{
 "resultCount":50,
 "results": [
{"wrapperType":"collection", "collectionType":"Album", "artistId":462006, "collectionId":834450798, "amgArtistId":4147, "artistName":"Bob Dylan", "collectionName":"The Essential Bob Dylan (Revised Edition)", "collectionCensoredName":"The Essential Bob Dylan (Revised Edition)", "artistViewUrl":"https://itunes.apple.com/us/artist/bob-dylan/id462006?uo=4", "collectionViewUrl":"https://itunes.apple.com/us/album/the-essential-bob-dylan-revised-edition/id834450798?uo=4", "artworkUrl60":"http://is2.mzstatic.com/image/thumb/Music3/v4/3c/b5/17/3cb51796-17b5-dc1b-9070-a4f30c2b642f/source/60x60bb.jpg", "artworkUrl100":"http://is2.mzstatic.com/image/thumb/Music3/v4/3c/b5/17/3cb51796-17b5-dc1b-9070-a4f30c2b642f/source/100x100bb.jpg", "collectionPrice":14.99, "collectionExplicitness":"notExplicit", "trackCount":32, "copyright":"℗ This compilation (P) 2000 Sony Music Entertainment", "country":"USA", "currency":"USD", "releaseDate":"2014-03-21T07:00:00Z", "primaryGenreName":"Rock"}, 
{"wrapperType":"collection", "collectionType":"Album", "artistId":462006, "collectionId":192688369, "amgArtistId":4147, "artistName":"Bob Dylan", "collectionName":"Bob Dylan's Greatest Hits", "collectionCensoredName":"Bob Dylan's Greatest Hits", "artistViewUrl":"https://itunes.apple.com/us/artist/bob-dylan/id462006?uo=4", "collectionViewUrl":"https://itunes.apple.com/us/album/bob-dylans-greatest-hits/id192688369?uo=4", "artworkUrl60":"http://is5.mzstatic.com/image/thumb/Music/v4/66/dd/dd/66dddda6-a9fd-6fcb-8007-d8e8c84adef0/source/60x60bb.jpg", "artworkUrl100":"http://is5.mzstatic.com/image/thumb/Music/v4/66/dd/dd/66dddda6-a9fd-6fcb-8007-d8e8c84adef0/source/100x100bb.jpg", "collectionPrice":9.99, "collectionExplicitness":"notExplicit", "trackCount":10, "copyright":"℗ Originally Released 1963, 1964, 1965, 1966 Sony Music Entertainment Inc.", "country":"USA", "currency":"USD", "releaseDate":"1983-09-06T07:00:00Z", "primaryGenreName":"Rock"}, 
{"wrapperType":"collection", "collectionType":"Album", "artistId":462006, "collectionId":158320766, "amgArtistId":4147, "artistName":"Bob Dylan", "collectionName":"Blood On the Tracks", "collectionCensoredName":"Blood On the Tracks", "artistViewUrl":"https://itunes.apple.com/us/artist/bob-dylan/id462006?uo=4", "collectionViewUrl":"https://itunes.apple.com/us/album/blood-on-the-tracks/id158320766?uo=4", "artworkUrl60":"http://is4.mzstatic.com/image/thumb/Music5/v4/69/99/42/69994248-ac5c-23fa-22f5-b1f1b5d55cb1/source/60x60bb.jpg", "artworkUrl100":"http://is4.mzstatic.com/image/thumb/Music5/v4/69/99/42/69994248-ac5c-23fa-22f5-b1f1b5d55cb1/source/100x100bb.jpg", "collectionPrice":9.99, "collectionExplicitness":"notExplicit", "trackCount":10, "copyright":"℗ 1974 Sony Music Entertainment Inc.", "country":"USA", "currency":"USD", "releaseDate":"1975-01-17T08:00:00Z", "primaryGenreName":"Rock"}
 ...
 ]
}
```

The outermost component of this React app is called App, and there are two inner components called SearchBox and Results nested in it. The fetched data will be stored as an array in App component. 

```
var App = React.createClass({
                getInitialState: function() {
                    return {
                        searchResults: []
                    }
                },
                showResults: function(response){
                    this.setState({
                        searchResults: response.results
                    })
                },
                search: function(URL){
                    $.ajax({
                        type: "GET",
                        dataType: 'jsonp',
                        url: URL,
                        success: function(response){
                            this.showResults(response);
                        }.bind(this)
                    });
                },
                render: function(){
                    return (
                        <div>
                            <SearchBox search={this.search} searchResults={this.state.searchResults}/>
                            <Results searchResults={this.state.searchResults} />
                        </div>
                    );
                },
            });

``` 

The SearchBox component will render a textbox and a button which will be used to send requests.
```
var SearchBox = React.createClass({
                render: function(){
                    return (
                        <div id="searchBar" style={searchBar}>
                            <input type="text" ref="query" style={text} placeholder="Artist name..." />
                            <input type="submit" value="Search" onClick={this.createAjax} style={button} />
                            <p style={msg}>Found {this.props.searchResults.length} results</p>
                        </div>
                    );
                },
                createAjax: function(){
                    var query = ReactDOM.findDOMNode(this.refs.query).value;
                    var URL = "https://itunes.apple.com/search?term="+query+"&entity=album";
                    this.props.search(URL)
                }
            });

``` 

The Results components contains many inner components called ResultItem, which will render the information for each album of this artist.
```
var Results = React.createClass({
                render: function(){
                    var resultItems = this.props.searchResults.map(function(result) {
                        return <ResultItem key={result.collectionId} album={result} />
                    });
                    return(
                        <div id="resultsArea" style={resultArea}>
                           {resultItems}
                        </div>
                    );
                }
            });

``` 


```
var ResultItem = React.createClass({
                render: function(){
                    return(
                        <div class="square" style={square}>
                            <div>
                                <img src={this.props.album.artworkUrl100} style={img}></img>
                                <div>
                                    <h4>{this.props.album.collectionName}</h4>
                                </div>
                                <div>
                                    <p>{this.props.album.artistName}</p>
                                    <p>{this.props.album.releaseDate.substring(0,10)}</p>
                                    <a href={this.props.album.collectionViewUrl} target="_blank">see more details</a>
                                </div>
                            </div>
                        </div>
                    );
                }
            });

``` 

Thank you!
