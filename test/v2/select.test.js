var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should'),
    through2 = require('through2')

var refine = require('../../lib/v2')

var addOne = function(cell) {
    return cell + 1
}

describe('select', function() {

    describe('fields', function() {
        it('(["foo"]) should select the foo column', function(done) {

            streamify([
                [1, 1, 1],
                [2, 2, 2]
            ])
                .pipe(refine.start({
                    'fields': ['foo', 'bar', 'tee']
                }))
                .pipe(refine.fields(['bar'], addOne))
                .pipe(refine.end())
                .pipe(assert.first(function(data) {
                    data.should.be.eql([1, 2, 1])
                }))
                .pipe(assert.end(done))

        })

        it('(["foo","bar"]) should select two columns', function(done) {

            streamify([
                [1, 1, 1],
                [2, 2, 2]
            ])
                .pipe(refine.start({
                    'fields': ['foo', 'bar', 'tee']
                }))
                .pipe(refine.fields(['bar', 'foo'], addOne))
                .pipe(refine.end())
                .pipe(assert.first(function(data) {
                    data.should.be.eql([2, 2, 1])
                }))
                .pipe(assert.end(done))

        })

        it('("foo") should select only the foo column', function(done) {

            streamify([
                [1, 1, 1],
                [2, 2, 2]
            ])
                .pipe(refine.start({
                    'fields': ['foo', 'bar', 'tee']
                }))
                .pipe(refine.fields('bar', addOne))
                .pipe(refine.end())
                .pipe(assert.first(function(data) {
                    data.should.be.eql([1, 2, 1])
                }))
                .pipe(assert.end(done))

        })

        it('(["boom","bar"]) should just ignore boom but handle bar', function(done) {

            streamify([
                [1, 1, 1],
                [2, 2, 2]
            ])
                .pipe(refine.start({
                    'fields': ['foo', 'bar', 'tee']
                }))
                .pipe(refine.fields(['boom', 'bar'], addOne))
                .pipe(refine.end())
                .pipe(assert.first(function(data) {
                    data.should.be.eql([1, 2, 1])
                }))
                .pipe(assert.end(done))

        })

    })


    describe('cols', function() {
        it('([1]) should limit to column 1', function(done) {

            streamify([
                [1, 1, 1],
                [2, 2, 2]
            ])
                .pipe(refine.start())
                .pipe(refine.cols(1, addOne))
                .pipe(refine.end())
                .pipe(assert.first(function(data) {
                    data.should.be.eql([1, 2, 1])
                }))
                .pipe(assert.end(done))

        })

        it('([1,2]) should limit to columns 1 and 2', function(done) {

            streamify([
                [1, 1, 1],
                [2, 2, 2]
            ])
                .pipe(refine.start())
                .pipe(refine.cols([1, 2], addOne))
                .pipe(refine.end())
                .pipe(assert.first(function(data) {
                    data.should.be.eql([1, 2, 2])
                }))
                .pipe(assert.second(function(data) {
                    data.should.be.eql([2, 3, 3])
                }))
                .pipe(assert.end(done))

        })
    })

    describe('all', function() {
        it('() should apply func to all', function(done) {

            streamify([
                [1, 1, 1],
                [2, 2, 2]
            ])
                .pipe(refine.start())
                .pipe(refine.all(addOne))
                .pipe(refine.end())
                .pipe(assert.first(function(data) {
                    data.should.be.eql([2, 2, 2])
                }))
                .pipe(assert.second(function(data) {
                    data.should.be.eql([3, 3, 3])
                }))
                .pipe(assert.end(done))

        })
    })


})