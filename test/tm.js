var should = require('should');
var tm = process.env.COVERAGE
  ? require('../coverage/timeout')
  : require('../lib/timeout');


describe('timeout.js', () => {

  it('is varructor', () => {
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
    var t = tm(30);

    t.then(_ => done());
    t.catch(e => should.fail(e));
  });

  it('resolve chaining', function(done) {
    this.timeout(120);
    var t = tm(30);
    var called = 0;

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
    var t = tm(30);

    t.catch(done);
    t.then(_ => should.fail());
    t.break();
  });

  it('pass value', function(done) {
    this.timeout(60);
    var t = tm(30, "value");

    t.then(data => {
      should(data).be.equal('value');
      done();
    });
  });

  it('sorry can\'t test Promise.prototype.chain()', function(done) {
    tm(10).chain(e => e).then(e => done());
  });

  it('nested timeouts', function(done) {
    this.timeout(100);

    tm(10).then(() => tm(10)).then(() => done());
  });

  // it('nested with value passing', function(done) {
  //   // this.timeout(100);
  //
  //   tm(10, 1000).then(result => tm(10, result + 10)).then(result => {
  //     should(result).be.equal(1010);
  //     done();
  //   })
  //   .catch(err => done(err))
  // });

  it('long chain of timeouts', function(done) {
    this.timeout(100);

    function incrs(result) {
      result.a++;
      return tm(5, result);
    }

    const init = { a: 0 };

    tm(5, init)
    .then(incrs)
    .then(incrs)
    .then(incrs)
    .then(incrs)
    .then(incrs)
    .then(result => {
      should(result).be.equal(init);
      should(result.a).be.equal(5);
      done();
    })
    .catch(err => done(err));
  });

  it('chain with bind', function(done) {
    this.timeout(50);

    tm(5, 'foo')
    .then(tm.bind(null, 5))
    .then(tm.bind(null, 5))
    .then(tm.bind(null, 5))
    .then(result => {
      should(result).be.equal('foo');
      done();
    })
    .catch(err => done(err));
  });

  it('.make() method', function(done) {
    this.timeout(50);

    tm(5, 'data')
    .then(tm.make(5))
    .then(tm.make(5))
    .then(result => {
      should(result).be.equal('data');
      done();
    })
    .catch(error => done(error));
  });

  it('.make() with data bind', function(done) {
    this.timeout(50);

    const out = tm.make(5, 'data');

    out().then(data => {
      should(data).be.equal('data');
      done();
    })
    .catch(err => done(err));
  });

  it('.make() override data', function(done) {
    this.timeout(50);

    const ovvr = tm.make(5, 'data');

    ovvr('foo').then(data => {
      should(data).be.equal('foo');
      done();
    })
    .catch(err => done(err));
  });
});
