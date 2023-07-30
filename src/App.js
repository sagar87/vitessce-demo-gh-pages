import React, { Component } from "react";
import { Route } from "react-router-dom";
import _ from "lodash";
import NavBar from "./components/navbar";
import Viewer from "./components/viewer";
import ListGroup from "./components/listGroup";
import Pagination from "./components/common/pagination";
import SampleTable from "./components/sampleTable";
import { paginate } from "./utils/paginate";
import { getSamples } from "./services/sampleService";
import { getEntities } from "./services/entityService";

class App extends Component {
  state = {
    samples: [],
    entities: [],
    selectedEntity: {},
    pageSize: 12,
    currentPage: 1,
    sortColumn: { path: "histo", order: "asc" },
    showTable: false,
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
    this.setState({ selectedEntity: entity, currentPage: 1, showTable: true });
  };

  handlePageChange = (page) => {
    console.log("Page change", page);
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      samples: allSamples,
      selectedEntity,
    } = this.state;

    const filtered =
      selectedEntity && selectedEntity.id
        ? allSamples.filter((s) => s.entity === selectedEntity.name)
        : allSamples;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const count = sorted.length;
    const samples = paginate(sorted, currentPage, pageSize);

    return { count, samples };
  };

  handleTableToggle = () => {
    const showTable = !this.state.showTable;
    this.setState({ showTable });
  };

  render() {
    const {
      entities,
      selectedEntity,
      pageSize,
      currentPage,
      sortColumn,
      showTable,
    } = this.state;

    const { count, samples } = this.getPagedData();

    return (
      <React.Fragment>
        <NavBar onToggle={this.handleTableToggle} />
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
              <div
                className={
                  showTable
                    ? "row table-container"
                    : "row table-container collapse"
                }
              >
                {/* <Sample samples={samples} selectedEntity={selectedEntity} />*/}
                <p>Showing {count} samples.</p>
                <SampleTable
                  samples={samples}
                  sortColumn={sortColumn}
                  onSort={this.handleSort}
                />
                <Pagination
                  itemsCount={count}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChage={this.handlePageChange}
                />
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
