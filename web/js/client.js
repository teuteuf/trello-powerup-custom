/* global $ */
/* global TrelloPowerUp */

const { Promise } = TrelloPowerUp;

const HLTB_ICON = 'https://howlongtobeat.com/img/icons/favicon-96x96.png';

const getBadges = t => t.card('name')
  .get('name')
  .then(cardName => [{
    dynamic: () => new Promise((resolve) => {
      $.get(`/hltb/${cardName}`, (hltbResult) => {
        resolve({
          title: 'HOW LONG TO BEAT',
          text: hltbResult.duration,
          icon: HLTB_ICON,
          color: hltbResult.color,
        });
      });
    }),
  }]);

TrelloPowerUp.initialize({
  'card-badges': t => getBadges(t),
});
