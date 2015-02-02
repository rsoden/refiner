var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')()

var refine = require('../../lib/v2')
var transform = refine.transform
var select = refine.select

describe('transform', function() {

    it('uppercase() should work', function(done) {

        streamify([
            ['a', 'a', 'c']
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.uppercase()))
            .pipe(refine.end())
            .pipe(assert.first(function(row) {
                row.should.be.eql(['A', 'A', 'C'])
            }))
            .pipe(assert.end(done))

    })

    it('lowercase() should work', function(done) {

        streamify([
            ['A', 'B', 'C']
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.lowercase()))
            .pipe(refine.end())
            .pipe(assert.first(function(row) {
                row.should.be.eql(['a', 'b', 'c'])
            }))
            .pipe(assert.end(done))

    })

    it('replace() should work', function(done) {

        streamify([
            ['b', 'a', 'c'],
            ['aa', 'aba', 'bab']
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.replace('a','b')))
            .pipe(refine.end())
            .pipe(assert.first(function(row) {
                row.should.be.eql(['b', 'b', 'c'])
            }))
            .pipe(assert.second(function(row) {
                row.should.be.eql(['bb', 'bbb', 'bbb'])
            }))

        streamify([
            ['abc', 'ab', 'bc'],
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.replace('bc','ac')))
            .pipe(refine.end())
            .pipe(assert.first(function(row) {
                row.should.be.eql(['aac', 'ab', 'ac'])
            }))
            .pipe(assert.end(done))

    })

    it('filter() should work', function(done) {

        streamify([
            ['a', 'a', 'c']
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.filter("^a")))
            .pipe(refine.end())
            .pipe(assert.first(function(row) {
                row[1].should.be.equal('a')
            }))
            .pipe(assert.end(done))

    })

    /*it('translate() should work', function(done) {

        streamify([
            ['hello', 'goodbye', 'thanks']
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.translate('en','it')))
            .pipe(refine.end())
            .pipe(assert.first(function(row) {
                row.should.be.eql(['ciao', 'arrivederci', 'grazie'])
            }))
            .pipe(assert.end(done))

    })

    it('fuel() should work', function(done) {

        streamify([
            ['E85', 'CNG', 'LPG']
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.fuel()))
            .pipe(refine.end())
            .pipe(assert.first(function(row) {
                row.should.be.eql(['-87.62622259999999, v41.7764073', '-87.62622259999999", 41.7764073', '-87.74629, 41.911962'])
            }))
            .pipe(assert.end(done))

    })*/


})
