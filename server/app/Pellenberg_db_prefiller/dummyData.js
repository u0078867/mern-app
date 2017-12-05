
import Models from 'MODELS_PATH/entity';
import Form from 'MODELS_PATH/form';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;


import cuid from 'cuid';

import Chance from 'chance';
let chance = new Chance();

import callApi from 'CLIENT_UTIL/apiCaller';



var Researcher = Models['researchers'];
var Subject = Models['subjects'];
var Device = Models['devices'];
var SWTool = Models['swtools'];
var Project = Models['projects'];
var Publication = Models['publications'];
var Activity = Models['activities'];

var user = null;

function dummyData(verbose, fillLevel) {

  if (fillLevel == 0) {
    return
  }

  return Promise.resolve()
  //.then(() => Researcher.count().exec())
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
    const register = {
      name: 'Davide',
      surname: 'Monari',
      birthdate: '6/12/1985',
      institution_id: 'u0078867',
      slug: 'admin',
    };
    researchers.push(register);
    for (let i = 0; i < 50; i++) {
      const researcher = {
        name: chance.first(),
        surname: chance.last(),
        birthdate: chance.birthday({string: true, american: false}),
        institution_id: chance.character() + Math.floor(Math.random() * 899999 + 100000),
        slug: 'test-researcher',
      };
      researchers.push(researcher);
    }
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
  .then(() => callApi(`researchers`))
  .then(res => {
    user = res.items[0];
  })


  //.then(() => Subject.count().exec())
  .then(() => Subject.count())
  .then(count => {
    if (count > 0) {
      console.log('subjects collection was filled');
      return [];
    }
    if (fillLevel < 2) {
      return [];
    }
    console.log('filling subjects collection ...');
    let subjects = [];
    for (let i = 0; i < 1000; i++) {
      var subject = {
        registered_by: user.cuid,
        hospital_id: (Math.floor(1E9 + Math.random() * 9E9)).toString(), // E9 -> 10 cyphers
        slug: 'test-subject',
      };
      subjects.push(subject);
    }
    return Subject.createMany(subjects);
  })
  .then(res => {
    if (res.length) {
      console.log('subjects filled')
    }
    else {
      console.log('subjects skipped')
    }
  })


  //.then(() => Device.count().exec())
  .then(() => Device.count())
  .then(count => {
    if (count > 0) {
      console.log('devices collection was filled');
      return [];
    }
    if (fillLevel < 2) {
      return [];
    }
    console.log('filling devices collection ...');
    let devices = [];
    var types = [
      'device-type-1',
      'device-type-2',
      'device-type-3',
      'device-type-4',
      'device-type-5',
    ];
    for (let i = 0; i < 50; i++) {
      const device = {
        registered_by: user.cuid,
        name: 'device-' + chance.word(),
        type: types[chance.integer({min: 0, max: types.length-1})],
        producer: 'Producer Inc.',
        uri: chance.url(),
        slug: 'test-device',
      };
      devices.push(device);
    }
    return Device.createMany(devices);
  })
  .then(res => {
    if (res.length) {
      console.log('devices filled')
    }
    else {
      console.log('devices skipped')
    }
  })


  //.then(() => SWTool.count().exec())
  .then(() => SWTool.count())
  .then(count => {
    if (count > 0) {
      console.log('sw-tools collection was filled');
      return [];
    }
    if (fillLevel < 2) {
      return [];
    }
    console.log('filling sw-tools collection ...');
    let swTools = [];
    var tools = [
      {name: 'software-A', company: 'Micky Mouse Inc.'},
      {name: 'software-B', company: 'Duffy Duck Ltd.'},
      {name: 'software-C', company: 'Bla bla NV'},
      {name: 'software-D', company: 'and more Bla bla NV'}
    ];
    for (let i = 0; i < 50; i++) {
      let tool = tools[chance.integer({min: 0, max: tools.length-1})];
      const vr = {min: 0, max: 10};
      let maj = chance.integer(vr);
      let min = chance.integer(vr);
      let rev = chance.integer(vr);
      let version = `${maj}.${min}.${rev}`;
      const swTool = {
        registered_by: user.cuid,
        name: tool.name,
        version: version,
        producer: tool.company,
        uri: chance.url(),
        slug: 'test-software',
      };
      swTools.push(swTool);
    }
    return SWTool.createMany(swTools);
  })
  .then(res => {
    if (res.length) {
      console.log('swtools filled')
    }
    else {
      console.log('swtools skipped')
    }
  })


  //.then(() => Project.count().exec())
  .then(() => Project.count())
  .then(count => {
    if (count > 0) {
      console.log('projects collection was filled');
      return [];
    }
    if (fillLevel < 2) {
      return [];
    }
    console.log('filling projects collection ...');
    let projects = [];
    for (let i = 0; i < 10; i++) {
      const project = {
        registered_by: user.cuid,
        name: chance.sentence(),
        description: chance.paragraph({sentences: 3}),
        begin_period: chance.date({string: true, american: false}),
        end_period: chance.date({string: true, american: false}),
        uri: chance.url(),
        slug: 'test-project',
      };
      projects.push(project);
    }
    return Project.createMany(projects);
  })
  .then(res => {
    if (res.length) {
      console.log('projects filled')
    }
    else {
      console.log('projects skipped')
    }
  })


  //.then(() => Publication.count().exec())
  .then(() => Publication.count())
  .then(count => {
    if (count > 0) {
      console.log('publications collection was filled');
      return [];
    }
    if (fillLevel < 2) {
      return [];
    }
    console.log('filling publications collection ...');
    let publications = [];
    for (let i = 0; i < 10; i++) {
      const publication = {
        registered_by: user.cuid,
        uri: chance.url(),
        slug: 'test-publication',
      };
      publications.push(publication);
    }
    return Publication.createMany(publications);
  })
  .then(res => {
    if (res.length) {
      console.log('publications filled')
    }
    else {
      console.log('publications skipped')
    }
  })


  //.then(() => Activity.count().exec())
  .then(() => Activity.count())
  .then(count => {
    if (count > 0) {
      console.log('activities collection was filled');
      return [];
    }
    if (fillLevel < 2) {
      return [];
    }
    console.log('filling activities collection ...');
    return Promise.all([
      callApi(`researchers`),
      callApi(`subjects`),
      callApi(`devices`),
      callApi(`swtools`),
    ])
    .then(results => {
      var data = results.reduce((acc, r, i) => {
        switch (i) {
          case 0:
            acc.researchers = r.items;
            break;
          case 1:
            acc.subjects = r.items;
            break;
          case 2:
            acc.devices = r.items;
            break;
          case 3:
            acc.SWTools = r.items;
            break;
        }
        //return Object.assign(acc, r);
        return acc;
      }, {});
      return data;
    })
    .then(d => {

      var activities = [];

      var N = 2e3;
      while (activities.length < N) {

        var i = activities.length;

        var researchers = [
          //{ id: ObjectId(d.researchers[chance.integer({min: 0, max: d.researchers.length-1})]._id) }
          { id: d.researchers[chance.integer({min: 0, max: d.researchers.length-1})].cuid }
        ];

        var useSubject = chance.bool({likelihood: 15});
        var subjects = [];
        if (useSubject) {
          subjects = [
            //{ id: ObjectId(d.subjects[chance.integer({min: 0, max: d.subjects.length-1})]._id) }
            { id: d.subjects[chance.integer({min: 0, max: d.subjects.length-1})].cuid }
          ];
          //console.log(subjects)
        }

        var devices = [];
        for (let j = 0; j < chance.natural({min: 1, max: 5}); j++) {
          devices.push(
            //{ id: ObjectId(d.devices[chance.integer({min: 0, max: d.devices.length-1})]._id) }
            { id: d.devices[chance.integer({min: 0, max: d.devices.length-1})].cuid }
          )
        }

        var software = [];
        for (let j = 0; j < chance.natural({min: 1, max: 5}); j++) {
          software.push(
            //{ id: ObjectId(d.SWTools[chance.integer({min: 0, max: d.SWTools.length-1})]._id) }
            { id: d.SWTools[chance.integer({min: 0, max: d.SWTools.length-1})].cuid }
          )
        }

        var outputs = [];
        for (let j = 0; j < chance.natural({min: 1, max: 5}); j++) {
          outputs.push({
            //_id: ObjectId(),
            cuid: cuid(),
            name: chance.word(),
            uri: chance.url(),
          })
        }

        // link data:
        var other_resources = [];
        if (i > 100) {
          if (!useSubject) {
            if (verbose) console.log(`linking activity ${i} ...`);
            var nGoodLinks = 0;
            for (let k = 0; k < chance.natural({min: 1, max: 3}); k++) {
              var nAttempts = 0;
              var ok = false;
              while (nAttempts < 5) {
                var di = chance.natural({min: 1, max: 5});
                var ii = i - di;
                nAttempts++;
                if (ii >= 0 && activities[ii].subjects.length > 0) {
                  ok = true;
                  var output = activities[ii].outputs[chance.integer({min: 0, max: activities[ii].outputs.length-1})];
                  other_resources.push({
                    //'id': output._id
                    'id': output.cuid
                  });
                  break;
                }
              }
              if (ok) {
                nGoodLinks++;
              }
              if (verbose) console.log(`link ${k}: attempts=${nAttempts}, src_has_sbj=${ok}`);
            }
            if (nGoodLinks == 0) {
              // don't insert activity
              if (verbose) console.log(`skipping activity ${i}`);
              continue;
            }
          }
        }

        let activity = {
          registered_by: user.cuid,
          name: chance.sentence(),
          researchers,
          subjects,
          devices,
          software,
          outputs,
          data: other_resources,
          slug: 'test-activity',
        }
        //console.log(subjects.length)
        activities.push(activity);

      }

      return activities;

    })
    .then(activities => Activity.createMany(activities))
  })
  .then(res => {
    if (res.length) {
      console.log('activities filled')
    }
    else {
      console.log('activities skipped')
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

    let form = null;

    form = {
      title: "Insert measurement activity",
      key: "insert-measurement-activity",
      json_schema: require('./forms/activity/measurement_schema.json'),
      ui_schema: require('./forms/activity/measurement_ui_schema.json'),
      init_data: {
        name: "Insert measurement activity",
      },
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      slug: "insert-measurement-activity",
    };
    forms.push(form);

    form = {
      title: "Insert processing activity",
      key: "insert-processing-activity",
      json_schema: require('./forms/activity/processing_schema.json'),
      ui_schema: require('./forms/activity/processing_ui_schema.json'),
      init_data: {
        name: "Insert processing activity",
      },
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      slug: "insert-processing-activity",
    };
    forms.push(form);

    form = {
      title: "Insert processing activity",
      key: "insert-processing-activity",
      json_schema: require('./forms/activity/processing_schema.json'),
      ui_schema: require('./forms/activity/processing_ui_schema.json'),
      init_data: {
        name: "Insert processing activity",
      },
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      slug: "insert-processing-activity",
    };
    forms.push(form);

    form = {
      title: "Associate results to project(s)",
      key: "associate-results-to-project",
      json_schema: require('./forms/activity/assoc_output_to_project_schema.json'),
      ui_schema: require('./forms/activity/assoc_output_to_project_ui_schema.json'),
      init_data: {
        name: "Associate results to project",
      },
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      slug: "associate-results-to-project",
    };
    forms.push(form);

    form = {
      title: "Associate results to publications(s)",
      key: "associate-results-to-publication",
      json_schema: require('./forms/activity/assoc_output_to_publication_schema.json'),
      ui_schema: require('./forms/activity/assoc_output_to_publication_ui_schema.json'),
      init_data: {
        name: "Associate results to publication",
      },
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      slug: "associate-results-to-publication",
    };
    forms.push(form);

    form = {
      title: "Associate results to project(s)",
      key: "associate-results-to-project",
      json_schema: require('./forms/activity/assoc_output_to_project_schema.json'),
      ui_schema: require('./forms/activity/assoc_output_to_project_ui_schema.json'),
      init_data: {
        name: "Associate results to project",
      },
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      slug: "associate-results-to-project",
    };
    forms.push(form);

    form = {
      title: "Insert new software",
      key: "insert-software",
      json_schema: require('./forms/software/software_schema.json'),
      ui_schema: require('./forms/software/software_ui_schema.json'),
      init_data: {},
      dest_collection: 'swtools',
      insert_on_submit: true,
      submitter: 'direct',
      slug: "insert-new-software",
    };
    forms.push(form);

    form = {
      title: "Insert new device",
      key: "insert-device",
      json_schema: require('./forms/device/device_schema.json'),
      ui_schema: require('./forms/device/device_ui_schema.json'),
      init_data: {},
      dest_collection: 'devices',
      insert_on_submit: true,
      submitter: 'direct',
      slug: "insert-new-device",
    };
    forms.push(form);

    form = {
      title: "Insert new researcher",
      key: "insert-researcher",
      json_schema: require('./forms/researcher/researcher_schema.json'),
      ui_schema: require('./forms/researcher/researcher_ui_schema.json'),
      init_data: {},
      dest_collection: 'researchers',
      insert_on_submit: true,
      submitter: 'direct',
      slug: "insert-new-researcher",
    };
    forms.push(form);

    form = {
      title: "Insert new subject",
      key: "insert-subject",
      json_schema: require('./forms/subject/subject_schema.json'),
      ui_schema: require('./forms/subject/subject_ui_schema.json'),
      init_data: {},
      dest_collection: 'subjects',
      insert_on_submit: true,
      submitter: 'direct',
      slug: "insert-new-subject",
    };
    forms.push(form);

    form = {
      title: "Insert new project",
      key: "insert-project",
      json_schema: require('./forms/project/project_schema.json'),
      ui_schema: require('./forms/project/project_ui_schema.json'),
      init_data: {},
      dest_collection: 'projects',
      insert_on_submit: true,
      submitter: 'direct',
      slug: "insert-new-project",
    };
    forms.push(form);

    form = {
      title: "Insert new publication",
      key: "insert-publication",
      json_schema: require('./forms/publication/publication_schema.json'),
      ui_schema: require('./forms/publication/publication_ui_schema.json'),
      init_data: {},
      dest_collection: 'publications',
      insert_on_submit: true,
      submitter: 'direct',
      slug: "insert-new-publication",
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

module.exports = dummyData;
