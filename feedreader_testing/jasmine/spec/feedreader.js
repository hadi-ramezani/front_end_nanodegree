/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is the first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loop through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('ensure urls are defined in allFeeds', function () {
            for (const feed of allFeeds) {
              expect(feed.url).toBeDefined();
              expect(feed.url).not.toBe("");
            }
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('ensure names are defined in allFeeds', function () {
            for (const feed of allFeeds) {
              expect(feed.name).toBeDefined();
              expect(feed.url).not.toBe("");
            }
        });
    });


    describe('The menu', function() {

        /* Ensure the menu element is hidden by default.
         */
        it('menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Ensure the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu element is toggled on click', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* Ensure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('there is at least a single entry after loadFeed is complete', function(done) {
            const feed = $('.feed');
            expect(feed.children().length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {

        // initialize the content for two feeds
        let contentBefore = null;
        let contentAfter = null;

        // load the first feed and save the content. Then call the loadFeed with a different
        // index to check if the content has changed or not.
        beforeEach(function (done) {
            loadFeed(0, function () {
                contentBefore = $('.feed').html();
                loadFeed(1, function() {
                    done();
                });
            });
        });

        /* Ensure when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         it('the content changes after new feed is loaded', function(done) {
            contentAfter = $('feed').html();
            expect(contentBefore).not.toEqual(contentAfter);
            done();
        });
    });
}());
