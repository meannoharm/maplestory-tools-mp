'use strict';

const https = require('https');

const request = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        // called when a data chunk is received.
        res.on('data', (chunk) => {
          data += chunk;
        });
        // called when the complete response is received.
        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });

exports.main = async (event, context) => {
  const { userName, region = 'gms' } = event;

  if (!userName) {
    return {
      errCode: 1,
      errMsg: 'userName is required',
    };
  }

  try {
    const data = await request(
      `https://api.maplestory.gg/v2/public/character/${region}/${userName}`
    );
    if (data.status === 'Error') {
      return {
        errorCode: 0,
        data: undefined,
        errMsg: data.message,
      };
    }
    return {
      errorCode: 0,
      errMsg: '',
      data,
    };
  } catch (error) {
    return {
      errCode: 1,
      errMsg: error,
    };
  }
};
