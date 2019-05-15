import React, { Component } from 'react';
import axios from 'axios';
import "../public/index.css"
class App extends Component {
    state = {
        data: [],
        id: 0,
        name: null,
        message: null,
        address: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null
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
            .then(data => data.json())
            .then(res => this.setState({ data: res.data }));
    };
    putDataToDB = (name, address) => {

        axios.post("http://localhost:3001/location/putData", {
            name: name,
            address: address
        });

    };
    deleteFromDB = name => {
        let objIdToDelete = null;
        this.state.data.forEach(dat => {
            if (dat.name == name) {
                objIdToDelete = dat._id;
            }
        });

        axios.delete("http://localhost:3001/location/deleteData", {
            data: {
                name: name
            }
        });
    };
    updateDB = (name, updateToApply) => {
        let objIdToUpdate = null;
        this.state.data.forEach(dat => {
            if (dat.name == name) {
                objIdToUpdate = dat._id;
            }
        });

        axios.post("http://localhost:3001/location/updateData", {
            name: objIdToUpdate,
            update: { message: updateToApply }
        });
    };
    render()
    {
        const { data } = this.state;
        return (

    <div>
        <ul>
            {data.length <= 0
                ? "NO Locations YET"
                : data.map(dat => (
                    <li style={{ padding: "10px" }} key={data.message}>
                        <span style={{ color: "gray" }}> place: </span> {dat.name} <br />
                        <span style={{ color: "gray" }}> address : </span>
                        {dat.address}
                    </li>
                ))}
        </ul>
        <div style={{ padding: "10px" }}>
            <input
                type="text"
                onChange={e => this.setState({ address: e.target.value })}
                placeholder="you can propose a location"
                style={{ width: "200px" }}
            />
            <input
                type="text"
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="type the name of the location here"
                style={{ width: "200px" }}
            />
            <button onClick={() => this.putDataToDB(this.state.name, this.state.address)}>
                ADD
            </button>
        </div>
        <div style={{ padding: "10px" }}>
            <input
                type="text"
                style={{ width: "200px" }}
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="put the name the location to delete here"
            />
            <button onClick={() => this.deleteFromDB(this.state.name)}>
                DELETE
            </button>
        </div>
        <div style={{ padding: "10px" }}>
            <input
                type="text"
                style={{ width: "200px" }}
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="name of the location to update here"
            />
            <input
                type="text"
                style={{ width: "200px" }}
                onChange={e => this.setState({ updateToApply: e.target.value })}
                placeholder="put new address here"
            />
            <button
                onClick={() =>
                    this.updateDB(this.state.name, this.state.updateToApply)
                }
            >
                UPDATE
            </button>
        </div>
            <div id="mapid"></div>
    </div>

);
}
}

export default App;
