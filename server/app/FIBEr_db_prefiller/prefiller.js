
import Models from 'MODELS_PATH/entity';
import Form from 'MODELS_PATH/form';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;


import cuid from 'cuid';

import Chance from 'chance';
let chance = new Chance();

import callApi from 'CLIENT_UTIL/apiCaller';



var Researcher = Models['researchers'];
var Sample = Models['samples'];


function prefiller(verbose, fillLevel) {

  if (fillLevel == 0) {
    return
  }

  return Promise.resolve()


  .then(() => Researcher.count())
  .then(count => {
    if (count > 0) {
      console.log('researchers collection was filled');
      return [];
    }
    if (fillLevel < 2) {
      return [];
    }
    console.log('filling researchers collection ...');
    let researchers = [];
    /*for (let i = 0; i < 1000; i++) {
      const researcher = {
        name: chance.first(),
        surname: chance.last(),
        birthdate: chance.birthday({string: true}),
        institution_id: chance.character() + Math.floor(Math.random() * 899999 + 100000),
        slug: 'test-researcher',
      };
      researchers.push(researcher);
    }*/
    let researcher = {
      name: 'Davide',
      surname: 'Monari',
      kul_id: 'u0078867',
      slug: 'davide-monari',
    };
    researchers.push(researcher);
    return Researcher.createMany(researchers);
  })
  .then(res => {
    if (res.length) {
      console.log('researchers filled')
    }
    else {
      console.log('researchers skipped')
    }
  })


  .then(() => Form.count().exec())
  .then(count => {
    if (count > 0) {
      console.log('forms collection was filled');
      return [];
    }
    console.log('filling forms collection ...');
    let forms = [];

    let form = {
      title: "researcher insertion",
      key: "insert-researcher",
      json_schema: require('./forms/researcher/researcher_schema.json'),
      ui_schema: require('./forms/researcher/researcher_ui_schema.json'),
      init_data: {},
      dest_collection: 'researchers',
      insert_on_submit: true,
      submitter: '1-1',
      slug: "insert-researcher",
    };
    forms.push(form);

    form = {
      title: "sample insertion",
      key: "insert-sample",
      json_schema: require('./forms/sample/sample_insert_schema.json'),
      ui_schema: require('./forms/sample/sample_insert_ui_schema.json'),
      init_data: {},
      dest_collection: 'samples',
      insert_on_submit: true,
      submitter: '1-1',
      slug: "insert-sample",
    };
    forms.push(form);

    form = {
      title: "sample update",
      key: "update-sample",
      json_schema: require('./forms/sample/sample_update_schema.json'),
      ui_schema: require('./forms/sample/sample_update_ui_schema.json'),
      init_data: {},
      dest_collection: 'samples',
      insert_on_submit: true,
      submitter: '1-1',
      slug: "update-sample",
    };
    forms.push(form);

    form = {
      title: "run experiment",
      key: "run-experiment",
      json_schema: require('./forms/experiment/experiment_schema.json'),
      ui_schema: require('./forms/experiment/experiment_ui_schema.json'),
      init_data: {},
      dest_collection: 'experiments',
      insert_on_submit: true,
      submitter: '1-1',
      slug: "update-sample",
    };
    forms.push(form);

    form = {
      title: "sample preparation",
      key: "prepare-sample",
      json_schema: require('./forms/sample/sample_prepare_schema.json'),
      ui_schema: require('./forms/sample/sample_prepare_ui_schema.json'),
      init_data: {},
      dest_collection: 'samples',
      insert_on_submit: true,
      submitter: 'split-samples',
      slug: "prepare-sample",
    };
    forms.push(form);

    return Form.create(forms);
  })
  .then(res => {
    if (res.length) {
      console.log('forms filled')
    }
    else {
      console.log('forms skipped')
    }
  })

}

module.exports = prefiller;
