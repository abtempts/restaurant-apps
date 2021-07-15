/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#restaurants');
  I.see('Empty', '#restaurants-item__not__found');
});

Scenario('liking one movie', async ({ I }) => {
  I.see('Empty', '#restaurants-item__not__found');

  I.amOnPage('/');
  I.seeElement('.restaurant_name');
  const firstRestaurant = locate('.restaurant_name').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.content__heading');
  I.seeElement('#restaurants');
  I.seeElement('.restaurant_card');
  const likedRestaurantName = await I.grabTextFrom('.restaurant_name');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Empty', '#restaurants-item__not__found');

  I.amOnPage('/');
  I.seeElement('.restaurant_name');

  const names = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant_name').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    names.push(await I.grabTextFrom('.restaurant__name'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#restaurants');
});

Scenario('disliking one restaurant', async ({ I }) => {
  const empty = '\nEmpty';
  I.see(empty, '#restaurants-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant_name');
  const firstRestaurant = locate('.restaurant_name').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant_name');
  const likedRestaurantName = await I.grabTextFrom('.restaurant_name');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.click('.restaurant_name');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('#restaurants-item__not__found');
  const noLikedRestaurantName = await I.grabTextFrom('#restaurants-item__not__found');
  assert.strictEqual(empty, noLikedRestaurantName);
});
