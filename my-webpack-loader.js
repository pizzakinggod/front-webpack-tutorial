module.exports = function myWebpackLoader(content){
  console.log("로더가 잘 작동함");

  return content;
}