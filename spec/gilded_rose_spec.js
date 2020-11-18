var {Item } = require('../src/Item.js');
var {Shop } = require('../src/Shop.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });


  it("Augmenter la qualité de deux pour Aged Brie et Backstage passes quand il reste 10j ou moins", function () {
    listItems.push(new Item("Aged Brie", 9, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 7, 12));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 8, quality: 32 },
      { sellIn: 6, quality: 14 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

    it("Augmenter la qualité de trois pour Aged Brie et Backstage passes quand il reste 5j ou moins", function () {
      listItems.push(new Item("Aged Brie", 5, 30));
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 3, 30));

      const gildedRose = new Shop(listItems);
      const items = gildedRose.updateQuality();

      var expected = [
        { sellIn: 4, quality: 33 },
        { sellIn: 2, quality: 33 },
      ];
      expected.forEach(function (testCase, idx) {
        expect(items[idx].quality).toBe(testCase.quality);
        expect(items[idx].sellIn).toBe(testCase.sellIn);
      });
    });


    it("Baisser la qualité à zéro pour Aged Brie et Backstage passes quand la date de péremption est atteinte", function () {
      listItems.push(new Item("Aged Brie", 0, 30));
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", -3, 26));

      const gildedRose = new Shop(listItems);
      const items = gildedRose.updateQuality();

      var expected = [
        { sellIn: -1, quality: 0 },
        { sellIn: -4, quality: 0 },
      ];
      expected.forEach(function (testCase, idx) {
        expect(items[idx].quality).toBe(testCase.quality);
        expect(items[idx].sellIn).toBe(testCase.sellIn);
      });
    });


    it("La qualité de Sulfuras ne se modifie pas", function () {
      listItems.push(new Item("Sulfuras du 69", 0, 80));
      listItems.push(new Item("Sulfuras attaque déflagration", 3, 80));
      listItems.push(new Item("Sulfuras attaque déflagration", -2, 80));


      const gildedRose = new Shop(listItems);
      const items = gildedRose.updateQuality();

      var expected = [
        { sellIn: 0, quality: 80 },
        { sellIn: 3, quality: 80 },
        { sellIn: -2, quality: 80 },
      ];
      expected.forEach(function (testCase, idx) {
        expect(items[idx].quality).toBe(testCase.quality);
        expect(items[idx].sellIn).toBe(testCase.sellIn);
      });
    });

    it("Baisser la qualité 2 fois plus vite pour les articles normaux quand la date de péremption est atteinte", function () {
      listItems.push(new Item("+5 Dexterity Vest", 0, 42));
      listItems.push(new Item("Mana Cake", -3, 4));
      listItems.push(new Item("Super product", -2, 12));


      const gildedRose = new Shop(listItems);
      const items = gildedRose.updateQuality();

      var expected = [
        { sellIn: -1, quality: 40 },
        { sellIn: -4, quality: 2 },
        { sellIn: -3, quality: 10 },
      ];
      expected.forEach(function (testCase, idx) {
        expect(items[idx].quality).toBe(testCase.quality);
        expect(items[idx].sellIn).toBe(testCase.sellIn);
      });
    });

    it("Baisser la qualité 2 fois plus vite pour les articles Conjured", function () {
      listItems.push(new Item("Conjured Dark Blade", 7, 42));
      listItems.push(new Item("Conjured Magic Stick", -3, 4));
      listItems.push(new Item("Conjured ing 2", 0, 12));


      const gildedRose = new Shop(listItems);
      const items = gildedRose.updateQuality();

      var expected = [
        { sellIn: 6, quality: 40 },
        { sellIn: -4, quality: 0 },
        { sellIn: -1, quality: 8 },
      ];
      expected.forEach(function (testCase, idx) {
        expect(items[idx].sellIn).toBe(testCase.sellIn);
        expect(items[idx].quality).toBe(testCase.quality);
      });
    });

    it("La qualité d'un article ne peut pas être supérieure à 50 ou inférieure à 0", function () {
      listItems.push(new Item("Conjured Dark Blade", 7, 1));
      listItems.push(new Item("+5 Dexterity Vest", -3, 1));
      listItems.push(new Item("Aged Brie", 8, 49));


      const gildedRose = new Shop(listItems);
      const items = gildedRose.updateQuality();

      var expected = [
        { sellIn: 6, quality: 0 },
        { sellIn: -4, quality: 0 },
        { sellIn: 7, quality: 50 },
      ];
      expected.forEach(function (testCase, idx) {
        expect(items[idx].sellIn).toBe(testCase.sellIn);
        expect(items[idx].quality).toBe(testCase.quality);
      });
    });
});