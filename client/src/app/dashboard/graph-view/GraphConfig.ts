export class GraphConfig {


     public readonly layout = {
        name: 'grid',
        fit: true, // whether to fit the viewport to the graph
        padding: 30, // padding used on fit
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        condense: false, // uses all available space on false, uses minimal space on true
        rows: undefined, // force num of rows in the grid
        cols: undefined, // force num of columns in the grid
        position: function( node ) {}, // returns { row, col } for element
        sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        ready: undefined, // callback on layoutready
        stop: undefined, // callback on layoutstop
    };

    public readonly cytoscapeConfig = {
        container: null, // container to render in
        elements: [ // list of graph elements to start with
        ],
        layout: this.layout,
        style: [{
          selector: 'node',
          style: {
            label: 'data(name)',
            'background-image': 'data(image)',
            'width': '70%',
            'height': '70%',
            'background-opacity': 0,
            'background-fit': 'contain',
            'background-clip': 'none',
          }
        }]
    };

    public readonly edgeDragConfig = {
      preview: true, // whether to show added edges preview before releasing selection
      hoverDelay: 150, // time spent hovering over a target node before it is considered selected
      handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
      snap: false, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
      snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
      snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
      noEdgeEventsInDraw: false, // set events:no to edges during draws, prevents mouseouts on compounds
      disableBrowserGestures: true,
      handlePosition: function( node ) {
        return 'middle top'; // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
      },
      handleInDrawMode: false, // whether to show the handle in draw mode
      edgeType: function( sourceNode, targetNode ) {
        // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
        // returning null/undefined means an edge can't be added between the two nodes
        return 'flat';
      },
      loopAllowed: function( node ) {
        // for the specified node, return whether edges from itself to itself are allowed
        return false;
      },
      nodeLoopOffset: -50, // offset for edgeType: 'node' loops
      nodeParams: function( sourceNode, targetNode ) {
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for intermediary node
        return {};
      },
      edgeParams: function( sourceNode, targetNode, i ) {
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for edge
        // NB: i indicates edge index in case of edgeType: 'node'
        return {};
      },
      ghostEdgeParams: function() {
        // return element object to be passed to cy.add() for the ghost edge
        // (default classes are always added for you)
        return {};
      }
    };

    constructor() {}
}
