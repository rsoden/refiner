var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should'),
    through2 = require('through2')

var refine = require('../../lib/v2')
var viz = refine.viz

describe('viz', function() {

    it('markdown', function(done) {

        streamify([
            [1, 1, 1],
            [2, 2, 2]
        ])
            .pipe(viz.markdown())
            .pipe(assert.first(function(data) {
                data.should.be.eql('|1|1|1|')
            }))
            .pipe(assert.end(done))

    })

    it('htmltable', function(done) {

        streamify([
            [1, 1],
            [2, 2]
        ])
            .pipe(viz.htmltable())
            .pipe(assert.first(function(data) {
                data.should.be.eql('<tr><td>1</td><td>1</td></tr>')
            }))
            .pipe(assert.first(function(data) {
                data.should.be.eql('<tr><td>2</td><td>2</td></tr>')
            }))
            .pipe(assert.end(done))

    })


})