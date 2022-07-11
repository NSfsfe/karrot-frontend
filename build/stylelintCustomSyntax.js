// SPDX-FileCopyrightText: 2016-2022 2016 Nick Sellen, <hello@nicksellen.co.uk> et al.
//
// SPDX-License-Identifier: MIT

const syntax = require('postcss-syntax')
const postcssStyl = require('postcss-styl')
module.exports = syntax({ stylus: postcssStyl })