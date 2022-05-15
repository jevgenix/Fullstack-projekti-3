//const comments = [
//  {
//    comments: "test 1",
//  },
//  {
//    comments: "test 2",
//  },
//  {
//    comments: "test 3",
//  },
//];
//
//const newArray = comments.map((element) => element.comments);
//
//console.log(newArray);
//
// generate user id once

const bigArray = [
  [1, 2, 3, 4],
  [1, 3, 4, 5],
  [2, 4, 5, 9],
];

let id = 9;

let newArray = bigArray.filter((array) => array[3] !== id);

console.log(newArray);
