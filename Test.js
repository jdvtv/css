
// Let's create a "real-time search" component

var SearchExample = React.createClass({

    getInitialState: function(){
        return { searchString: '' };
    },

    handleChange: function(e){

        // If you comment out this line, the text box will not change its value.
        // This is because in React, an input cannot change independently of the value
        // that was assigned to it. In our case this is this.state.searchString.

        this.setState({searchString:e.target.value});
    },

    render: function() {

        var libraries = this.props.items,
            searchString = this.state.searchString.trim().toLowerCase();


        if(searchString.length > 0){

            // We are searching. Filter the results.

            libraries = libraries.filter(function(l){
                return l.name.toLowerCase().match( searchString );
            });

        }

        return <div>
                    <input id="searchbj" type="search" value={this.state.searchString} onChange={this.handleChange} placeholder="Digite uma palavra">

                    <td> 

                        { libraries.map(function(l){
                            return <th><a href={l.url}><img src={l.src}/><h2>{l.name}</h2><p>{l.description}</p></a></th>
                        }) }

                    </td>

                </div>;

    }
});

                                                                                                                                                             
var libraries = [

    {src:'https://d1di2lzuh97fh2.cloudfront.net/files/3w/3wg/3wgtbx.jpg?ph=762228e942', name: 'Backbone.js', description:'essa é a descricao de cada card', url: 'https://documentcloud.github.io/backbone/'},
    {src:'https://762228e942.cbaul-cdnwnd.com/a39c552995a62183d70e3480929e57d4/200000010-8b6328b634/circulo-cruzado.svg?ph=762228e942', name: 'AngularJS', url: 'https://angularjs.org/'},
    { name: 'jQuery', url: 'https://jquery.com/'},
    { name: 'Prototype', url: 'https://www.prototypejs.org/'},
    { name: 'React', url: 'https://facebook.github.io/react/'},
    { name: 'Ember', url: 'https://emberjs.com/'},
    { name: 'Knockout.js', url: 'https://knockoutjs.com/'},
    { name: 'Dojo', url: 'https://dojotoolkit.org/'},
    { name: 'Mootools', url: 'https://mootools.net/'},
    { name: 'Underscore', url: 'https://documentcloud.github.io/underscore/'},
    { name: 'Lodash', url: 'https://lodash.com/'},
    { name: 'Moment', url: 'https://momentjs.com/'},
    { name: 'Express', url: 'https://expressjs.com/'},
    { name: 'Koa', url: 'https://koajs.com/'},

];

// Render the SearchExample component on the page

ReactDOM.render(
    <SearchExample items={ libraries } />,
    document.getElementById('resultados')
);
