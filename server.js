const compression = require('compression');
const cors = require('cors');
const express = require('express');
const nocache = require('node-nocache');
const hltb = require('howlongtobeat');

const hltbService = new hltb.HowLongToBeatService();

const app = express();
app.use(compression());
app.use(cors({ origin: 'https://trello.com' }));
app.use('/manifest.json', nocache, (request, response) => {
  response.sendFile(`${__dirname}/public/manifest.json`);
});

app.use(express.static('web'));

app.get('/hltb/:gameName', (req, res) => {
  const { params: { gameName } } = req;
  hltbService.search(gameName)
    .then((result) => {
      const duration = (result[0] && result[0].gameplayMain) || -1;
      const color = (duration < 0 && 'grey') || (duration < 5 && 'green') || (duration < 25 && 'yellow') || 'red';
      res.send({
        duration: (duration > 0 && `${duration}h`) || '? h',
        color,
      });
    });
});

const listener = app.listen(process.env.PORT || 8080, () => {
  console.info(`Node Version: ${process.version}`);
  console.log(`Trello Power-Up Server listening on port ${listener.address().port}`);
});
