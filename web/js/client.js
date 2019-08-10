/* global $ */
/* global TrelloPowerUp */

const { Promise } = TrelloPowerUp;

const HLTB_ICON = 'https://howlongtobeat.com/img/icons/favicon-32x32.png';

const getBadges = t => t.card('name', 'labels')
  .then(async (cardInfo) => {
    const boardInfo = await t.board('name');
    const labelGame = cardInfo.labels.find(label => label.name === 'Game' || label.name === 'Jeu');
    if (!(boardInfo.name === 'Games' || labelGame)) {
      return [];
    }
    return [{
      dynamic: () => new Promise((resolve) => {
        $.get(`/hltb/${cardInfo.name}`, (hltbResult) => {
          resolve({
            title: 'HOW LONG TO BEAT',
            text: hltbResult.duration,
            // icon: HLTB_ICON,
            color: hltbResult.color,
          });
        });
      }),
    }];
  });

TrelloPowerUp.initialize({
  'card-badges': t => getBadges(t),
});
