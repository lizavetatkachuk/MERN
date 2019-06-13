import React, { Component } from 'react';
import axios from 'axios';
import "../public/index.css"
import {Map,Marker, TileLayer,Popup} from 'react-leaflet';
class App extends Component {
    state = {
        marker:null,
        markers:[],
        name: null,
        address: null,
        markerIsSet:false,
        intervalIsSet: false,
        center: [52.4345016, 30.9754009],
        zoom: 15,
    };

    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }
    getDataFromDb = () => {
        fetch("http://localhost:3001/location/getData")
            .then(res=> res.json())
            .then(res => this.setState({ markers: res.markers }));
            console.log(this.state.markers);
    };
    handleClick=(e)=>{
        this.setState({marker:e.latlng});
        this.setState({markerIsSet:true});
        return <Popup position={this.state.marker}>A pretty CSS3 popup.<br/>Easily customizable.</Popup>;
}
    putDataToDB = () => {

        axios.post("http://localhost:3001/location/putData", {
            marker:this.state.marker,
            name: this.state.name,
            address: this.state.address
        });

    };
    render()
    {
        let markerIsSet=this.state.markerIsSet;
        return (

    <div>
        <div style={{ padding: "10px" }}>
            <input
                type="text"
                onChange={e => this.setState({ address: e.target.value })}
                placeholder="Type the name of the location here"
                style={{ width: "200px" }}
            />
            <input
                type="text"
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="Type the address of the location here"
                style={{ width: "200px" }}
            />
            <button onClick={() => this.putDataToDB()}>
                ADD
            </button>
        </div>
        <Map center={this.state.center} zoom={this.state.zoom} onClick={(e)=>this.handleClick(e)}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {
                this.state.markers.map((el)=>{
                    let position=[el.lat,el.lng];
                        <Marker position={position}>
                            <Popup >This is your location</Popup>
                        </Marker>
                }
                )
            }
            {
                markerIsSet &&
                    <Marker position={this.state.marker}>
                <Popup >This is your location</Popup>
                    </Marker>
            }
        </Map>

    </div>

);
}
}

export default App;
