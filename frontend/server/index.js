/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

const Arweave = require('arweave');
const TestWeave = require('testweave-sdk').default;

const arweave = Arweave.init({
  host: '192.168.201.178',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
});

app.post(
  '/uploadToArweave',
  express.json({ limit: '50mb' }),
  async (req, res) => {
    try {
      const data = req.body;
      const testWeave = await TestWeave.init(arweave);
      const dataTransaction = await arweave.createTransaction(
        {
          data: JSON.stringify(data.data),
        },
        testWeave.rootJWK,
      );

      await arweave.transactions.sign(dataTransaction, testWeave.rootJWK);
      const statusBeforePost = await arweave.transactions.getStatus(
        dataTransaction.id,
      );

      console.log(statusBeforePost); // this will return 404
      await arweave.transactions.post(dataTransaction);

      const statusAfterPost = await arweave.transactions.getStatus(
        dataTransaction.id,
      );
      console.log(statusAfterPost); // this will return 202

      testWeave.mine().then(async () => {
        const statusAfterMine = await arweave.transactions.getStatus(
          dataTransaction.id,
        );
        console.log(statusAfterMine);
      });

      if (statusAfterPost.status !== 202) {
        return res.status(500).json({ message: 'failed to upload' });
      }

      return res
        .status(200)
        .send({ message: 'success', txHash: dataTransaction.id });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
);

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
