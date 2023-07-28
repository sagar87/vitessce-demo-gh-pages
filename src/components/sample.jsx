import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import SampleTable from "./sampleTable";
import _ from "lodash";

class Sample extends Component {
  state = {
    pageSize: 12,
    currentPage: 1,
    sortColumn: { path: "histo", order: "asc" },
  };

  handlePageChange = (page) => {
    console.log("Page change", page);
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { samples: allSamples, selectedEntity } = this.props;
    const filtered =
      selectedEntity && selectedEntity.id
        ? allSamples.filter((s) => s.entity === selectedEntity.name)
        : allSamples;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const count = sorted.length;
    const samples = paginate(sorted, currentPage, pageSize);

    return { count, samples };
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { count, samples } = this.getPagedData();
    if (count === 0) return <p>There are no samples in the database.</p>;

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default Sample;

// {
//     histo: "E-2013-003142",
//     arrival: 1359072000000,
//     patient_id: 1279914,
//     entity: "CLL",
//     age: 74,
//     sex: "w",
//     stage: null,
//     diagnosis: null,
//     array: "166-1",
//     name: "E-2013-003142",
//     coord_a: "C7",
//     coord_b: "C1",
//     prefix: "166_1_C7",
//     replica: 1,
//     file: "166_1_C7_E-2013-003142.ome.tiff",
//   },
