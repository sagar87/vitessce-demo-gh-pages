import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
    // imageUrl: "http://picsum.photos/200",
    tags: [],
  };

  //   styles = {
  //     fontSize: 50,
  //     fontWeight: "bold",
  //   };

  render() {
    return (
      <div>
        {/* <img src={this.state.imageUrl} alt=""></img> */}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        {/* {this.renderTags()} */}
      </div>
    );
  }

  renderTags() {
    if (this.state.tags.length == 0) return <p> There are no tags </p>;
    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  handleIncrement = () => {
    console.log("Increment Clicked", this);
    this.setState({ count: this.state.count + 1 });
  };

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
