import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, dataValueProperty, column) => {
    return item[dataValueProperty] + (column.path || column.key);
  };

  render() {
    const { data, dataValueProperty, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item[dataValueProperty]}>
            {columns.map((col) => (
              <td key={this.createKey(item, dataValueProperty, col)}>
                {this.renderCell(item, col)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.defaultProps = {
  dataValueProperty: "id",
};

export default TableBody;
