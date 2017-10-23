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
I used Ajax to send a request to iTunes, and receive a response which contains all of the data about the albums of this artist. The fetched data is stored in React and then displayed in the webpage. 

The outermost component of React is call App, and there are two inner components called SearchBox and Results nested in it. The fetched data will be stored as an array in App component. 

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
