            // Components
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

            var SearchBox = React.createClass({
                render: function(){
                    return (
                        <div id="searchBar" style={searchBar}>
                            <input type="text" ref="query" style={text} placeholder="Artist name..." />
                            <input type="submit" onClick={this.createAjax} style={button} />
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
            
            // CSS
            var searchBar = {
                "padding-left": 35
            }
            
            var text = {
                width: "20%",
                padding: "7px 20px",
                margin: "8px 0",
                display: "inline-block",
                border: "1px solid #ccc",
                "border-radius": "4px",
                "box-sizing": "border-box"
            }
            
            var button = {
                width: "15%",
                "background-color": "#5bc0de",
                color: "white",
                padding: "8px 20px",
                margin: "8px 10px",
                border: "none",
                "border-radius": "4px",
                cursor: "pointer"
            }
            
            var msg = {
                "padding-left":"500",
                color: "gray",
                display: "inline-block"
            }

            var resultArea = {
                display: "flex",
                "flex-wrap": "wrap",
                "padding": 30
            }

            var square = {
                "padding-bottom": 40,
	            width: 200,
	            float: 'left',
                margin: 4,
                "border-width": 2,
                "border-style": "outset",
                "text-align": "center"
            };

            var img = {
                width: "100%"
            }
            
            // Render
            ReactDOM.render(<App />,  document.getElementById("reactcontent"));



