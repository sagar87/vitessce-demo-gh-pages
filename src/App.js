import React, { Component } from "react";

import NavBar from "./components/navbar";
import Sample from "./components/sample";
import Viewer from "./components/viewer";
import ListGroup from "./components/listGroup";

import { Route } from "react-router-dom";

import { getSamples } from "./services/sampleService";
import { getEntities } from "./services/entityService";

class App extends Component {
  state = {
    samples: [],
    entities: [],
    selectedEntity: {},
  };

  componentDidMount() {
    const entities = [{ id: "", name: "All Entities" }, ...getEntities()];
    this.setState({
      samples: getSamples(),
      entities,
      selectedEntity: { name: "All Entities" },
    });
  }

  handleEntitySelect = (entity) => {
    console.log(entity);
    this.setState({ selectedEntity: entity });
  };

  render() {
    const { entities, samples, selectedEntity } = this.state;
    return (
      <React.Fragment>
        <NavBar />
        <main role="main" className="container-fluid">
          <div className="row">
            <div className="col-2 list-group-container">
              <ListGroup
                items={entities}
                selectedItem={selectedEntity}
                onItemSelect={this.handleEntitySelect}
              />
            </div>
            <div className="col">
              <div className="row table-container">
                {/* <Sample samples={samples} selectedEntity={selectedEntity} />*/}
                
              </div>
              <div className="row vitessce-container">
                <Route path="/:sample" component={Viewer} />
                {/* <Route path="/counter" component={Counters} /> */}
                {/* <Route path="/movies" component={Movies} /> */}
              </div>
              {/* <Viewer sample={this.state.selectedSample} theme="light" /> */}

              {/* <Vitessce
                // onConfigChange={this.handleConfigChange}
                config={this.state.config}
                theme="light"
                debug={true}
              /> */}
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
