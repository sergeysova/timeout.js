const should = require('should');
const tm = process.env.COVERAGE
  ? require('../coverage/timeout')
  : require('../lib/timeout');


describe('timeout.js', () => {

  it('is constructor', () => {
    should(tm).be.a.Function;
  });

  it('init milliseconds only', () => {
    should.doesNotThrow(() => tm(2));
    should.throws(() => tm(""));
    should.throws(() => tm({}));
    should.throws(() => tm(() => {}));
    should.throws(() => tm([]));
    should.throws(() => tm(true));
    should.throws(() => tm(false));
  });

  it('timeout should be positive', () => {
    should.doesNotThrow(() => tm(0));
    should.throws(() => tm(-1));
    should.throws(() => tm(-100));
  });

  it('resolve', function(done) {
    this.timeout(120);
    const t = tm(30);

    t.then(_ => done());
    t.catch(e => should.fail(e));
  });

  it('resolve chaining', function(done) {
    this.timeout(120);
    const t = tm(30);
    let called = 0;

    function ch() {
      ++called >= 4 ? done() : null;
    }

    t.then(ch);
    t.then(ch);
    t.then(ch);
    t.then(ch);
  });

  it('reject', function(done) {
    this.timeout(120);
    const t = tm(30);

    t.catch(done);
    t.then(_ => should.fail());
    t.break();
  });

  it('pass value', function(done) {
    this.timeout(60);
    const t = tm(30, "value");

    t.then(data => {
      should(data).be.equal('value');
      done();
    });
  });

  it('sorry can\'t test Promise.prototype.chain()', function(done) {
    tm(10).chain(e => e).then(e => done());
  });
});
