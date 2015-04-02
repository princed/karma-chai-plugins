/* eslint-disable no-unused-vars */
var should;

(function (win) {
  win.should = win.chai.should();
  win.expect = win.chai.expect;
  win.assert = win.chai.assert;
}(window));
