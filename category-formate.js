function list_to_tree(list) {
  var map = {},
    node,
    roots = [],
    i;
  list = JSON.parse(list);
  console.log(list);
  for (i = 0; i < list.length; i += 1) {
    map[list[i]._id] = i; // initialize the map
    list[i].children = []; // initialize the children
    console.log("list", list[i]);
    // console.log("list", list[i].children);
    if (list.length === i + 1) {
    }
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent !== "1") {
      // if you have dangling branches check that map[node.parent] exists
      list[map[node.parent]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
module.exports = { list_to_tree };
