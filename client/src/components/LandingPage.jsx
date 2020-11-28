import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchBeers, fetchBeerImages} from '../actions';

class LandingPage extends Component {
    constructor() {
        super();

        this.state = {filteredBeers: [], page: 1};
        this.hasBeerListSet = false;
        this.searchTimer = null;
    }

    render() {
        let {beers, beerImages} = this.props;
        let {filteredBeers, page} = this.state;

        if (beers)
            return (
                <div>
                    <div style={{padding: '50px'}}>
                        <span style={{fontSize: '20px', fontWeight: 600, marginRight: '30px'}}>
                            BeerDB
                        </span>
                        <input type="text" style={{height: '40px', borderRadius: '40px', width: '300px', paddingLeft: '15px', boxShadow: 'none', outline: 'none'}} placeholder="type a brand name here ...." onChange={(e) => {
                            if (this.searchTimer) clearTimeout(this.searchTimer);
                            let value = e.target.value;

                            this.searchTimer = setTimeout(() => {
                                let newFilteredBeers = beers.filter(f => f.name.toLowerCase().includes(value.toLowerCase()));
                                this.setState({filteredBeers: newFilteredBeers});
                            }, 100);
                        }} />
                    </div>
                    <div style={{padding: '0 0 0 50px', margin: '0 0 50px'}}>
                        <button style={{marginRight: '20px'}} onClick={() => {
                            if (page > 1) 
                                this.setState({page: page-1});
                        }}>Prev</button>
                        {page}
                        <button style={{marginLeft: '20px'}} onClick={() => {
                            let totalPages = Math.ceil(filteredBeers.length/20);
                            if (page < totalPages)
                                this.setState({page: page+1});
                        }}>Next</button>
                    </div>
                    <div style={{padding: '0 0 0 50px'}}>
                        {
                            (() => {
                                let output = [];
                                for (let i = (page-1)*20; i < (page*20) && i < filteredBeers.length; i++) {
                                    output.push(
                                        <div style={{display: 'flex'}}>
                                            <img src={beerImages[output.length%5].image} style={{height: '150px', width: 'auto', marginRight: '20px'}} />
                                            <div>
                                                {
                                                    [
                                                        {text: 'Product ID', value: filteredBeers[i].id},
                                                        {text: 'Name', value: filteredBeers[i].name},
                                                        {text: 'Style', value: filteredBeers[i].style},
                                                        {text: 'Volume', value: filteredBeers[i].ounces + ' ounces'},
                                                        {text: 'Alocohol Percentage', value: `${filteredBeers[i].abv*100}%`}
                                                    ].map(v => (
                                                        <p>{v.text} : {v.value}</p>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                                return output;
                            })()
                        }
                    </div>
                </div>
            )
        else 
            return (
                <div>
                    Loading....
                </div>
            )
    }

    componentDidMount() {
        let {fetchBeers, fetchBeerImages} = this.props;

        fetchBeers();
        fetchBeerImages();
    }

    componentDidUpdate() {
        let {beers} = this.props;

        if (beers && !this.hasBeerListSet) {
            let newFilteredBeers = JSON.parse(JSON.stringify(beers));
            this.hasBeerListSet = true;
            this.setState({filteredBeers: newFilteredBeers});
        }
    }
}

function mapStateToProps({beers, beerImages}) {
    return {beers, beerImages}
}

export default connect(mapStateToProps, {fetchBeers, fetchBeerImages})(LandingPage);