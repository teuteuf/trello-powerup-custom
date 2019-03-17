/* global $ */
/* global TrelloPowerUp */

const { Promise } = TrelloPowerUp;

const HLTB_ICON = 'https://howlongtobeat.com/img/icons/favicon-96x96.png';

const getBadges = t => t.card('name', 'labels')
  .then((cardInfo) => {
    const labelGame = cardInfo.labels.find(label => label.name === 'Game' || label.name === 'Jeu');
    if (!labelGame) {
      return [];
    }
    return [{
      dynamic: () => new Promise((resolve) => {
        $.get(`/hltb/${cardInfo.name}`, (hltbResult) => {
          resolve({
            title: 'HOW LONG TO BEAT',
            text: hltbResult.duration,
            icon: HLTB_ICON,
            color: hltbResult.color,
          });
        });
      }),
    }];
  });

TrelloPowerUp.initialize({
  'card-badges': t => getBadges(t),
});
