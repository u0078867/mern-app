
import Subject from './models/subject';
import Researcher from './models/researcher';
import Device from './models/device';
import SWTool from './models/swtool';
import Activity from './models/activity';
import Form from './models/form';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const ObjectId = mongoose.Types.ObjectId;

import cuid from 'cuid';

import Chance from 'chance';
let chance = new Chance();

import callApi from '../../client/util/apiCaller';


function dummyData(verbose) {

  return Promise.resolve()


  .then(() => Subject.count().exec())
  .then(count => {
    if (count > 0) {
      console.log('subjects collection was filled');
      return
    }
    console.log('filling subjects collection ...');
    let subjects = [];
    for (let i = 0; i < 1000; i++) {
      var isHuman = chance.bool({likelihood: 50});
      if (isHuman) {
        // human subject
        var subject = new Subject({
          attributes: [
            {name: "name", value: chance.first()},
            {name: "surname", value: chance.last()},
            {name: "birthdate", value: chance.birthday({string: true})},
          ],
          slug: 'test-human-subject',
        });
      } else {
        // specimen subject
        var subject = new Subject({
          attributes: [
            {name: "name", value: chance.first()},
            {name: "surname", value: chance.last()},
            {name: "deathdate", value: chance.birthday({string: true})},
            {name: "anatomical_segment", value: "foot"},
            {name: "anatomical_side", value: chance.character({pool: 'RL'})},
          ],
          slug: 'test-specimen-subject',
        });
      }
      subjects.push(subject);
    }
    return Subject.create(subjects);
  })
  .then(() => console.log('subjects filled'))


  .then(() => Researcher.count().exec())
  .then(count => {
    if (count > 0) {
      console.log('researchers collection was filled');
      return
    }
    console.log('filling researchers collection ...');
    let researchers = [];
    for (let i = 0; i < 1000; i++) {
      const researcher = new Researcher({
        name: chance.first(),
        surname: chance.last(),
        birthdate: chance.birthday({string: true}),
        slug: 'test-researcher',
      });
      researchers.push(researcher);
    }
    return Researcher.create(researchers);
  })
  .then(() => console.log('researchers filled'))


  .then(() => Device.count().exec())
  .then(count => {
    if (count > 0) {
      console.log('devices collection was filled');
      return
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
      const device = new Device({
        name: 'device-' + chance.word(),
        type: types[chance.integer({min: 0, max: types.length-1})],
        producer: 'Producer Inc.',
        uri: chance.url(),
        slug: 'test-device',
      });
      devices.push(device);
    }
    return Device.create(devices);
  })
  .then(() => console.log('devices filled'))


  .then(() => SWTool.count().exec())
  .then(count => {
    if (count > 0) {
      console.log('sw-tools collection was filled');
      return
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
      const swTool = new SWTool({
        name: tool.name,
        version: version,
        producer: tool.company,
        uri: chance.url(),
        slug: 'test-software',
      });
      swTools.push(swTool);
    }
    return SWTool.create(swTools);
  })
  .then(() => console.log('sw-tools filled'))


  .then(() => Activity.count().exec())
  .then(count => {
    if (count > 0) {
      console.log('activities collection was filled');
      return
    }

    console.log('filling activities collection ...');
    return Promise.all([
      callApi(`researchers`),
      callApi(`subjects`),
      callApi(`devices`),
      callApi(`sw-tools`),
    ])
    .then(results => {
      var data = results.reduce((acc, r) => {
        return Object.assign(acc, r);
      }, {});
      return data;
    })
    .then(d => {

      var activities = [];

      //for (let i = 0; i < 1e4; i++) {
      while (activities.length < 1e4) {

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
          name: chance.sentence(),
          researchers,
          subjects,
          devices,
          software,
          outputs,
          other_resources,
          slug: 'test-activity',
        }

        activities.push(activity);

      }

      return activities;

    })
    .then(activities => Activity.create(activities))
  })
  .then(() => console.log('activities filled'))


  .then(() => Form.count().exec())
  .then(count => {
    if (count > 0) {
      console.log('forms collection was filled');
      return
    }
    console.log('filling forms collection ...');
    let forms = [];

    let form1 = {
      title: "sample lab activity",
      json_schema: require('../../examples/sample_forms/activity/lab_activity_schema.json'),
      ui_schema: require('../../examples/sample_forms/activity/lab_activity_ui_schema.json'),
      init_data: {
        name: "sample lab activity",
      },
      dest_collection: 'activities',
      insert_on_submit: false,
      slug: "sample-lab-activity",
    };
    forms.push(form1);

    let form2 = {
      title: "Insert new software",
      json_schema: require('../../examples/sample_forms/insert_new_software_schema.json'),
      ui_schema: {},
      init_data: {
        name: "Insert new software",
      },
      dest_collection: 'swtools',
      insert_on_submit: true,
      slug: "insert-new-software",
    };
    forms.push(form2);

    return Form.create(forms);
  })
  .then(() => console.log('forms filled'))

}

module.exports = dummyData;
