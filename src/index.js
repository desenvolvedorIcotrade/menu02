import React from "react";
import ReactDOM from "react-dom";
import SortableTree, { toggleExpandedForAll } from "react-sortable-tree";

import treeData from "./treeData";

import "./styles.css";
import "react-sortable-tree/style.css";

const maxDepth = 5;

const alertNodeInfo = ({ node, path, treeIndex }) => {
  const objectString = Object.keys(node)
    .map(k => (k === "children" ? "children: Array" : `${k}: '${node[k]}'`))
    .join(",\n   ");

  global.alert(
    "Info passed to the button generator:\n\n" +
      `node: {\n   ${objectString}\n},\n` +
      `path: [${path.join(", ")}],\n` +
      `treeIndex: ${treeIndex}`
  );
};

class App extends React.Component {
  state = {
    searchString: "",
    searchFocusIndex: -1,
    searchFoundCount: 0,
    treeData
  };

  handleTreeOnChange = treeData => {
    this.setState({ treeData });
  };

  handleSearchOnChange = e => {
    this.setState({
      searchString: e.target.value
    });
  };

  selectPrevMatch = () => {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
          : searchFoundCount - 1
    });
  };

  selectNextMatch = () => {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFocusIndex + 1) % searchFoundCount
          : 0
    });
  };

  toggleNodeExpansion = expanded => {
    this.setState(prevState => ({
      treeData: toggleExpandedForAll({ treeData: prevState.treeData, expanded })
    }));
  };

  render() {
    const {
      treeData,
      searchString,
      searchFocusIndex,
      searchFoundCount
    } = this.state;

    return (
      <div className="wrapper">
        <div className="bar-wrapper">
          <button onClick={this.toggleNodeExpansion.bind(this, true)}>
            Expandir tudo
          </button>
          <button
            className="collapse"
            onClick={this.toggleNodeExpansion.bind(this, false)}
          >
            Recolher tudo
          </button>
          <label> Pesquisar: </label>
          <input onChange={this.handleSearchOnChange} />
          <button className="previous" onClick={this.selectPrevMatch}>
            Antetiores!
          </button>
          <button className="next" onClick={this.selectNextMatch}>
            Proximo!
          </button>
          <label>
            {searchFocusIndex} / {searchFoundCount}
          </label>
        </div>
        <div className="tree-wrapper">
          <SortableTree
            treeData={treeData}
            onChange={this.handleTreeOnChange}
            onMoveNode={({ node, treeIndex, path }) =>
              global.console.debug(
                "node:",
                node,
                "treeIndex:",
                treeIndex,
                "path:",
                path
              )
            }
            maxDepth={maxDepth}
            searchQuery={searchString}
            searchFocusOffset={searchFocusIndex}
            canDrag={({ node }) => !node.noDragging}
            canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0
              })
            }
            isVirtualized={true}
            generateNodeProps={rowInfo => ({
              buttons: [
                <button
                  className="btn btn-outline-success"
                  style={{
                    verticalAlign: "middle"
                  }}
                  onClick={() => alertNodeInfo(rowInfo)}
                >
                  ℹ
                </button>
              ]
            })}
          />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
