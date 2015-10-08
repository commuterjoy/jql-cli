#!/usr/bin/env node

require('babel/register')({ ignore: /jql-cli\/node_modules/ });
require('../lib/cli');
