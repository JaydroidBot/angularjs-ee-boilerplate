
// grunt protractor --suite bookmarks

describe("e2e: bookmarks", function() {
  var page = require('./page.object');

  beforeEach(function() {
    page.get();
  });

  describe("on list", function() {

    it("should have Search and New links", function() {
      // arrange
      var searchLink = page.on.list.links.search();
      var newLink = page.on.list.links.new();
      var optionsButton = page.on.list.options.optionsButton();

      // assertions
      expect(searchLink.isPresent()).toBeTruthy();
      expect(newLink.isPresent()).toBeTruthy();
      expect(optionsButton.isPresent()).toBeTruthy();
    });

    it("should have more then one item", function() {
      // arrange
      var repeater = page.on.table.repeater();

      // assetions
      expect(repeater.count()).toBeGreaterThan(1);
    });


    describe("options", function() {
      var optionsButton = page.on.list.options.optionsButton();

      it("should show", function() {
        // assert
        expect(optionsButton.getText()).toContain('Show Options');

        // act
        optionsButton.click();

        // assert
        expect(optionsButton.getText()).toContain('Hide Options');
      });

      describe("page size", function() {
        var pageSizeInput = page.on.list.options.pageSizeInput();

        beforeEach(function() {
          optionsButton.click();
        });

        it("should not change", function() {
          // act
          pageSizeInput.clear();
          pageSizeInput.sendKeys(1);

          // shortcut
          var pageSizeMessage = page.on.list.options.pageSizeMessage();

          // assert
          expect(pageSizeMessage.getText()).toContain('The value must be in range');

        });

        it("should change", function() {
          // act
          pageSizeInput.clear();
          pageSizeInput
            .sendKeys(2)
            .sendKeys('\n'); // submit form

          // shortcut
          var repeater = page.on.table.repeater();

          // assert
          expect(repeater.count()).toBe(2);
        });

      }); // end: page size

      describe("filter", function() {
        var filterButton = page.on.list.options.filterButton();

        beforeEach(function() {
          optionsButton.click();
        });

        it("should show", function() {
          // assert
          expect(filterButton.getText()).toContain('Show filter');

          // act
          filterButton.click();

          // assert
          expect(filterButton.getText()).toContain('Hide filter');
        });

        // test all filter behave
        it("should do filter", function() {
          var filterTexts, filterInput, filterClearButton, repeater;

          filterButton.click(); // show filter

          repeater = page.on.table.repeater();
          expect(repeater.count()).toBe(10); // initial itens length

          filterInput = page.on.table.filterInput();
          filterInput.sendKeys('ee'); // apply filter

          expect(repeater.count()).toBe(4); // itens length after apply filter

          filterTexts = page.on.table.filterTexts();
          expect(filterTexts.count()).toBe(1);

          filterClearButton = page.on.table.filterClearButton();
          filterClearButton.click();

          expect(repeater.count()).toBe(10); // return to initial itens length

          filterTexts = page.on.table.filterTexts();
          expect(filterTexts.count()).toBe(0); // initial stage

          filterInput.sendKeys('ee'); // apply filter
          optionsButton.click(); // hide options

          filterTexts = page.on.table.filterTexts();
          expect(filterTexts.count()).toBe(2);

          optionsButton.click(); // show options
          expect(filterButton.getText()).toContain('Hide filter');
        });

      }); // end: filter

    }); // end: options

  }); // end: on list

  //---

  describe("on search", function() {
    var seachLink = page.on.list.links.search();

    beforeEach(function() {
      // act
      seachLink.click();
    });

    it("should have go back link", function() {
      // arrange
      var backToList = page.on.search.links.backToList();

      // assertions
      expect(backToList.isPresent()).toBeTruthy();
    });

  }); // end: on search

  //---

  // TODO: test on add new

  //---

  // TODO: test on edit one


});