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

    it('replace() should work', function(done) {

        streamify([
            ['a', 'a', 'c']
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.replace('a','b')))
            .pipe(refine.end())
            .pipe(assert.first(function(row) {
                row.should.be.eql(['b', 'b', 'c'])
            }))
            .pipe(assert.end(done))

    })


})