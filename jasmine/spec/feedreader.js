/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready. As such,
 * jQuery is used throughout this file.
 */
$(function() {
    // Test suite for RSS feeds
    describe('RSS Feeds', () => {
        // Tests if the allFeeds array is defined (1st) and has at least one element (2nd)
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Tests if feed URL is defined and not empty. Loops through the allFeeds array, repeating this test      
        it('have URL', () => {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(0); 
            }    
        });

        // Tests if feed name is defined and not empty. Loops through the allFeeds array, repeating this test 
        it('have name', () => {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(0); 
            }   
        });
    });

    // A test suite about the menu
    describe('The menu', () => {

        // Tests if menu is hidden by default, by checking if the body element has 'menu-hidden' class
        it('is hidden', () => {
            let bodyClassName = $('body').attr('class');

            expect(bodyClassName).toContain('menu-hidden');
        });
             
        // Tests if burger menu, when clicked, toggles menu visibility. This is achieved by toggling the body element class 'menu-hidden'
        it('changes visibility', () => {
            let burgerMenu = $('.menu-icon-link');

            burgerMenu.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            burgerMenu.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    // Test suite for initial entries    
    describe('Initial Entries', () => {

        // Test of loadFeed function that verifies that upon load there's at least one feed entry.
        let container = $('.feed');

        beforeEach( (done) => {
            loadFeed(0, () => {
                done();
            });
        });

        it('a feed entry is created', () => {       
            expect(container.entry).not.toBe(0);
        });
    });

    // Test suite for new feed selection
    describe('New Feed Selection', () => {

        // Tests that the feed actually changes when loadFeed is loaded.
        let initialFeed;
        let loadedFeed;
        let originalTimeout;
        
        beforeEach( (done) => {
            // Here we must get the feed HTML after each consecutive load to be able to compare both           
            loadFeed(0, () => {
                initialFeed = $('.feed').html();
                loadFeed(1, () => {
                    loadedFeed = $('.feed').html();
                    done();
                });
            });
        });
        
        it('content changed', () => {

            expect(loadedFeed).not.toBe(initialFeed);
        });
          
    });
}());
