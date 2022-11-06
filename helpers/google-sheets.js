//CODE MODIFIED FROM GOOGLE SHEET'S NODEJS QUICKSTART GUIDE
// https://developers.google.com/sheets/api/quickstart/nodejs

const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const Settings = require('../config.json');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * request or authorization to call APIs.
 *
 */
async function authorize() {
  let sheetsClient = await loadSavedCredentialsIfExist();
  if (sheetsClient) {
    return sheetsClient;
  }
  sheetsClient = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (sheetsClient.credentials) {
    await saveCredentials(sheetsClient);
  }
  return { sheetsClient };
}

async function getColumnFromSheets(auth)
{
  const sheets = google.sheets({version: 'v4', auth});
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: Settings.sheet.id,
      range: 'Sheet1!A2:A', //the entire first column starting from the 2nd row
    });

    //check if there is data
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return null;
    }
    return rows;
}

module.exports = { authorize, getColumnFromSheets };