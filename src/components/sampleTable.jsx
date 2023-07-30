import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

class SampleTable extends Component {
  columns = [
    { path: "histo", label: "Histo" },
    { path: "age", label: "Age" },
    {
      path: "sex",
      label: "Sex",
      content: (sample) => {
        if (sample.sex === "m")
          return <i className="fa fa-mars" aria-hidden="true"></i>;
        return <i className="fa fa-venus" aria-hidden="true"></i>;
      },
    },
    { path: "stage", label: "Stage" },
    { key: "like", content: () => <Like /> },
    {
      path: "file",
      label: "File",
      content: (sample) => <a href={`/${sample.file}`}>{sample.prefix}</a>, //Link to={`/${sample.file}`}>{sample.prefix}</Link>, //
    },
  ];

  //<a href={sample.file}>{sample.file}</a>
  render() {
    const { samples, sortColumn, onSort } = this.props;
    return (
      <Table
        data={samples}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default SampleTable;
