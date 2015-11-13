/* eslint-disable no-unused-expressions */
ES6Promise.polyfill();

describe('chai and plugins', function () {
  it('chai', function () {
    true.should.be.true;
    expect(true).to.be.true;
    assert(true, 'true is true');
  });

  describe('chai-as-promised', function () {
    it('should', function () {
      return Promise.resolve(true).should.eventually.equal(true);
    });

    it('expect', function () {
      return expect(Promise.resolve(true)).to.eventually.equal(true);
    });

    it('assert', function () {
      return assert.eventually.equal(Promise.resolve(true), true, 'This had better be true, eventually');
    });
  });

  it('sinon-chai', function () {
    var spy = sinon.spy();

    spy(true);

    spy.should.have.been.calledWith(true);
    expect(spy).to.have.been.calledWith(true);
  });

  it('chai-dom', function () {
    var elem = document.createElement('div');
    elem.setAttribute('test', 'test');

    elem.should.have.attribute('test');
    expect(elem).to.have.attribute('test');
  });

  it('chai-jquery', function () {
    var $elem = $('<div></div>');
    $elem.prop('test', 'test');

    $elem.should.have.prop('test');
    expect($elem).to.have.prop('test');
  });

  it('chai-things', function () {
    var array = [4, 11, 15];

    array.should.include.one.below(10);
    expect(array).to.include.one.below(10);
  });
});

