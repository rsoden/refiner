var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')

var refine = require('../lib')

describe('refine', function() {

    describe('skipfirst()', function() {
        it('should skip the first row', function(done) {

            streamify([
                [1, 1, 1],
                [2, 2, 2]
            ])
                .pipe(refine.skipfirst())
                .pipe(assert.first(function(data) {
                    data.should.be.eql([2, 2, 2])
                }))
                .pipe(assert.length(1))
                .pipe(assert.end(done))

        })
    })

    describe('head', function() {
        it('head(2) should pass through the first two rows', function(done) {

            streamify([
                [1, 1, 1],
                [2, 2, 2],
                [3, 3, 3]
            ])
                .pipe(refine.head(2))
                .pipe(assert.first(function(data) {
                    data.should.be.eql([1, 1, 1])
                }))
                .pipe(assert.second(function(data) {
                    data.should.be.eql([2, 2, 2])
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))

        })
    })

    describe('tail', function() {
        it('tail(2) should pass through the last two rows', function(done) {

            streamify([
                [1, 1, 1],
                [2, 2, 2],
                [3, 3, 3]
            ])
                .pipe(refine.tail(2))
                .pipe(assert.first(function(data) {
                    data.should.be.eql([2, 2, 2])
                }))
                .pipe(assert.second(function(data) {
                    data.should.be.eql([3, 3, 3])
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))

        })
    })

    describe('swap', function() {
        it('swap(1,2) should swap two columns', function(done) {

            streamify([
                [0, 1, 2, 3],
                [0, 1, 2, 3]
            ])
                .pipe(refine.swap(1, 2))
                .pipe(assert.all(function(data) {
                    data.should.be.eql([0, 2, 1, 3])
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))

        })
    })

    describe('remove', function() {
        it('remove(1) should remove column 1', function(done) {

            streamify([
                [0, 1, 2, 3],
                [0, 1, 2, 3]
            ])
                .pipe(refine.remove(1))
                .pipe(assert.all(function(data) {
                    data.should.be.eql([0, 2, 3])
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))

        })
    })

    describe('copy', function() {
        it('copy(1,2) should copy column 1 to column 2', function(done) {

            streamify([
                [0, 1, 2, 3],
                [0, 1, 2, 3]
            ])
                .pipe(refine.copy(1,2))
                .pipe(assert.all(function(data) {
                    data.should.be.eql([0, 1, 1, 2, 3])
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))

        })
    })    

    describe('threshold', function() {
        it('threshold(1,20) should keep only rows whose value at column 1 is >= 20', function(done) {

            streamify([
                [0, 19, 2, 3],	
                [0, 20, 2, 3],	// only this should remain
                [0, 21, 2, 3]	
            ])
                .pipe(refine.threshold(1, 20))
                .pipe(assert.all(function(data) {
                    data[1].should.not.be.below(20)
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))

        })
    })

    describe('filter', function() {
        it('filter(1,/^a/) should keep only rows whose value at column 1 begins with the letter a', function(done) {

            streamify([
                [0, 'bat', 2, 3],	
                [0, 'adam', 2, 3],	// this should remain
                [0, 'alex', 2, 3]	// this too
            ])
                .pipe(refine.filter(1, "^a"))
                .pipe(assert.all(function(data) {
                    data[1][0].should.be.equal('a')
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))

        })
    })

    describe('replace', function() {
        it('replace("a","b"") should replace all a\'s with bb\'s', function(done) {

            streamify([
                [0, 'bat', 2, 3],	
                [0, 'bat', 2, 3],	
                [0, 'bat', 2, 3]
            ])
                .pipe(refine.replace('a', 'bb'))
                .pipe(assert.all(function(data) {
                    data[1].should.be.equal('bbbt')
                }))
                .pipe(assert.length(3))
                .pipe(assert.end(done))

        })
    })    

     describe('sunrise', function() {
        it('sunrise(1) should replace a ctiy name at column 1 with the city\'s sunrise time', function(done) {

            streamify([
                [0, 'denver', 2, 3],
                [0, 'boulder', 2, 3]                
            ])
                .pipe(refine.sunrise(1, 2))
                .pipe(assert.first(function(data) {
                    data[1].should.not.be.equal('denver')
                    data[1].should.be.above(1421000000)
                }))
                .pipe(assert.second(function(data) {
                    data[1].should.not.be.equal('boulder')
                    data[1].should.be.above(1421000000)
                }))
                .pipe(assert.end(done))

        })
    })

    describe('zipcode', function() {
    it('zipcode(1) should replace a zipcode at column 1 with the city\'s name', function(done) {

        streamify([
            [0, '80302'],
            [0, '20009']                
        ])
            .pipe(refine.zipcode(1))
            .pipe(assert.first(function(data) {
                data[1].should.be.equal('Boulder')
            }))
            .pipe(assert.second(function(data) {
                data[1].should.be.equal('Washington')
            }))
            .pipe(assert.end(done))

        })
    })

    describe('lowercase', function() {
    it('should replace a uppercase letters with lowercase letters', function(done) {

        streamify([
            ['A', 'AA']               
        ])
            .pipe(refine.lowercase())
            .pipe(assert.all(function(data) {
                data[0].should.be.equal('a')
            }))
            .pipe(assert.end(done))

        })
    })

    describe('uppercase', function() {
    it('should replace a lowercase letters with uppercase letters', function(done) {

        streamify([
            ['a', 'aa']               
        ])
            .pipe(refine.uppercase())
            .pipe(assert.all(function(data) {
                data[0].should.be.equal('A')
            }))
            .pipe(assert.end(done))

        })
    })

    describe('search', function() {
    it('should replace the string by the url of the first result', function(done) {
        var columnId = 1

        streamify([
            ['a', 'google', 1]
        ])
            .pipe(refine.search(columnId))
            .pipe(assert.all(function(data) {
                data[1].should.be.equal('http://www.google.com/')
            }))
            .pipe(assert.end(done))
        })
    })

    describe('geocoder', function() {
    it('should take an address and return latitude and longitude', function(done) {

        streamify([
            ['636 Arapahoe Ave Boulder Colorado']               
        ])
            .pipe(refine.geocoder())
            .pipe(assert.all(function(data) {
                data[0].should.be.equal('40.0126621')
            }))
            .pipe(assert.end(done))

        })
    })
    
    describe('translate', function() {
        it('translate(1,en,it) should change the english word in column 2 to its italian translation', function(done) {

            streamify([
                [0, 'hello', 2, 3],   
                [0, 'goodbye', 2, 3],  // only this should remain    
            ])
                .pipe(refine.translate(1, 'en', 'it'))
                .pipe(assert.first(function(data) {
                    data[1].should.not.be.equal('hello')
                }))
                .pipe(assert.second(function(data) {
                    data[1].should.not.be.equal('goodbye')
                }))
                .pipe(assert.end(done))

        })
    })

    describe('fuel', function() {
        it('fuel(1) should return the latitude and longitude of the alternative fuel type code in column 2 ', function(done) {

            streamify([
                [0, 'E85', 2, 3],   
                [0, 'CNG', 2, 3],  // only this should remain    
            ])
                .pipe(refine.fuel(1))
                .pipe(assert.first(function(data) {
                    data[1].should.not.be.equal('E85')
                }))
                .pipe(assert.second(function(data) {
                    data[1].should.not.be.equal('CNG')
                }))
                .pipe(assert.end(done))

        })
    })

    describe('swap', function() {
        it('swap(1,2) should swap two columns', function(done) {

            streamify([
                [0, 1, 2, 3],
                [0, 1, 2, 3]
            ])
                .pipe(refine.swap(1, 2))
                .pipe(assert.all(function(data) {
                    data.should.be.eql([0, 2, 1, 3])
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))

        })
    })
})