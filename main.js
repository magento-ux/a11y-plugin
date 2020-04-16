/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */

const { Text, Rectangle, Color, Shadow } = require("scenegraph");

const DEFAULTS = {
  width: 40,
  height: 40,
  fontSize: 24,
  color: "#FFFFF",
  radius: { topLeft: 7, topRight: 7, bottomRight: 7, bottomLeft: 7 },
  tab: {
    color: "#2D8CEB",
  },
  area: {
    color: "#734BC3",
  },
  headings: {
    color: "#F81DCE",
  },
};

// Create the tab notation rectangle and text
function createTabNotation(x, y, number, selection) {
  // Background
  const newElement = new Rectangle();
  newElement.width = DEFAULTS.width;
  newElement.height = DEFAULTS.height;
  newElement.fill = new Color(DEFAULTS.tab.color);
  newElement.cornerRadii = DEFAULTS.radius;

  selection.insertionParent.addChild(newElement);
  newElement.moveInParentCoordinates(x, y);

  // Text
  const textNode = new Text();
  textNode.text = number.toString();
  textNode.fill = new Color(DEFAULTS.color);
  textNode.fontSize = DEFAULTS.fontSize;

  selection.insertionParent.addChild(textNode);
  textNode.moveInParentCoordinates(x + 14, y + 28);
}

// Handle pressing "Create Tabs"
function tabHandlerFunction(selection, documentRoot) {
  console.log(selection.items.length + " items are selected");

  if (selection.hasArtboards) {
    console.log("Selecting artboards not supported");
  }

  let number = 0;

  selection.items.forEach(function (item) {
    number++;
    let node = item;
    createTabNotation(
      node.translation.x - DEFAULTS.width,
      node.translation.y - DEFAULTS.height / 2,
      number,
      selection
    );
  });
}

// Handle pressing "Create Headings"
function headingsHandlerFunction(selection, documentRoot) {
  console.log(selection.items.length + " items are selected");

  if (selection.hasArtboards) {
    console.log("Selecting artboards not supported");
  }

  selection.items.forEach(function (item) {
    let node = item;
    console.log(node.name);
    let level = 0;

    if (node.name.includes("[h1]")) {
      level = 1;
    }

    if (node.name.includes("[h2]")) {
      level = 2;
    }
    if (level > 0) {
      createHeadingNotation(
        node.translation.x - DEFAULTS.width,
        node.translation.y - DEFAULTS.height,
        level,
        selection
      );
    }
  });
}

// Create the tab notation rectangle and text
function createHeadingNotation(x, y, level, selection) {
  // Background
  const newElement = new Rectangle();
  newElement.width = DEFAULTS.width;
  newElement.height = DEFAULTS.height;
  newElement.fill = new Color(DEFAULTS.headings.color);
  newElement.cornerRadii = DEFAULTS.radius;
  newElement.stroke = new Color(DEFAULTS.color);
  newElement.strokeWidth = 2;
  newElement.strokePosition = "OUTER_STROKE";
  newElement.shadow = new Shadow(0, 0, 2, new Color(DEFAULTS.headings.color), true);


  selection.insertionParent.addChild(newElement);
  newElement.moveInParentCoordinates(x, y);

  // Text
  const textNode = new Text();
  textNode.text = "H" + level.toString();
  textNode.fill = new Color(DEFAULTS.color);
  textNode.fontSize = DEFAULTS.fontSize;

  selection.insertionParent.addChild(textNode);
  textNode.moveInParentCoordinates(x + 4, y + 28);
}

module.exports = {
  commands: {
    createTabs: tabHandlerFunction,
    createHeadings: headingsHandlerFunction,
  },
};
