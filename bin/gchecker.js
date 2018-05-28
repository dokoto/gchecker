#!/usr/bin/env node

'use strict';

const axios = require('axios');
const XmlReader = require('xml-reader');
const xmlQuery = require('xml-query');
const fs = require('fs');
const inquirer = require('inquirer');
const os = require('os');
const path = require('path');
const readline = require('readline');
const chalk = require('chalk');
const moment = require('moment');
const CLI = require('clui');

/*
 * CONSTANTES
 */
const configFilePath = '.gchecker/gcheckerrc.json';
const configPath = path.join(os.homedir(), configFilePath);
const defaultRequestOptions = {
  method: 'get',
  url: 'https://mail.google.com/mail/u/0/feed/atom',
};

moment.locale('es');

/**
 *
 * @param {object} node
 */
function renderMessages(node) {
  const title = xmlQuery(node)
    .find('title')
    .text();
  const email = xmlQuery(node)
    .find('email')
    .text();
  const date = xmlQuery(node)
    .find('issued')
    .text();
  const dateFormat = moment(date).format('dddd DD MMMM YYYY, H:mm:ss');
  new CLI.Line()
    .column(chalk.redBright(dateFormat), 40)
    .column(chalk.greenBright(email), 40)
    .column(chalk.redBright(title), 30)
    .fill()
    .output();
}

/**
 *
 * @param {object} response
 */
function gmailReasponseHandler(response) {
  const ast = XmlReader.parseSync(response.data);
  const title = xmlQuery(ast)
    .find('title')
    .children()
    .first()
    .text();

  const numOfMessages = xmlQuery(ast)
  .find('fullcount')
  .children()
  .first()
  .text();

  console.log('');
  console.log(chalk.white.bgBlueBright.bold(`${title} : ${numOfMessages} mensajes `));
  console.log('');
  if (xmlQuery(ast).has('entry')) {
    xmlQuery(ast)
      .find('entry')
      .each(renderMessages);
  }
}

/**
 *
 * @param {object} err
 * @param {json-string} data
 */
function configReaderHandler(err, data) {
  if (err) {
    throw new Error(
      `Se necesita un fichero tipo json en "${configFilePath}" con { "dokoto": { "username": "khkj", "password": "kñlkñl" }, "otraCuentaDeGmail": {} }`,
    );
  }

  const auth = JSON.parse(data);
  const questions = [
    {
      type: 'list',
      name: 'gmailAccount',
      message: 'Selection la cuenta de Gmail que quieres comprobar:',
      choices: Object.keys(auth),
    },
  ];
  inquirer.prompt(questions).then(responseQuestionsHandler.bind(this, auth));
}

/**
 *
 * @param {object} auth
 * @param {object} answers
 */
function responseQuestionsHandler(auth, answers) {
  const requestOptions = {
    ...defaultRequestOptions,
    auth: auth[answers.gmailAccount],
  };

  axios(requestOptions)
    .then(gmailReasponseHandler)
    .catch(err => {
      throw new Error(err);
    });
}

/*
 * MAIN SECTION
 */
try {
  fs.readFile(configPath, 'utf8', configReaderHandler);
} catch (err) {
  console.error(err);
}
