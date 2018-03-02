
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
    let researchers = [];
    const register = {
      name: 'default user',
      surname: 'default user',
      birthdate: '00/00/0000',
      institution_id: 'u0000000',
      slug: 'default-user',
    };
    console.log('filling with default user ...');
    researchers.push(register);
    if (fillLevel >= 2) {
      console.log('filling researchers collection ...');
      let researcher = {};
      for (let i = 0; i < 50; i++) {
        researcher = {
          name: chance.first(),
          surname: chance.last(),
          birthdate: chance.birthday({string: true, american: false}),
          institution_id: chance.character() + Math.floor(Math.random() * 899999 + 100000),
          slug: 'test-researcher',
        };
        researchers.push(researcher);
      }
      researcher = {
        name: 'John',
        surname: 'Doe',
        birthdate: '6/12/1900',
        institution_id: 'u0123456',
        slug: 'john-doe-researcher',
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
    let subject = {};
    for (let i = 0; i < 1000; i++) {
      subject = {
        registered_by: user.cuid,
        hospital_id: (Math.floor(1E9 + Math.random() * 9E9)).toString(), // E9 -> 10 cyphers
        slug: 'test-subject',
      };
      subjects.push(subject);
    }
    subject = {
      registered_by: user.cuid,
      hospital_id: "0123456789",
      slug: 'test-subject',
    };
    subjects.push(subject);
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
    var functions = [
      'function-1',
      'function-2',
      'function-3',
      'function-4',
      'function-5',
    ];
    let device = {};
    for (let i = 0; i < 50; i++) {
      device = {
        registered_by: user.cuid,
        name: 'device-' + chance.word(),
        functions: [functions[chance.integer({min: 0, max: functions.length-1})]],
        producer: 'Producer Inc.',
        uri: chance.url(),
        slug: 'test-device',
      };
      devices.push(device);
    }
    device = {
      registered_by: user.cuid,
      name: "test optoelectronic cluster",
      functions: ['opto_cluster'],
      attributes: [
        {name: "material", "value": "plastic"},
        {name: "marker_pins_number", "value": 5},
      ],
      producer: "optitrack",
      uri: chance.url(),
      slug: "test-optoelectronic-cluster"
    }
    devices.push(device);
    device = {
      registered_by: user.cuid,
      name: "test optoelectronic system",
      functions: ['opto_system'],
      attributes: [
        {name: "cameras_number", "value": 14},
        {name: "resolution", "value": 0.1, "uom": "mm"},
      ],
      producer: "vicon",
      uri: chance.url(),
      slug: "test-optoelectronic-system"
    }
    devices.push(device);
    device = {
      registered_by: user.cuid,
      name: "test optoelectronic marker",
      functions: ['opto_marker'],
      attributes: [
        {name: "diameter", "value": 8, "uom": "mm"},
        {name: "technology", "value": "passive"},
        {name: "surface_mounting_technology", "value": "wrapped"},
      ],
      producer: "vicon",
      uri: chance.url(),
      slug: "test-optoelectronic-marker"
    }
    devices.push(device);
    device = {
      registered_by: user.cuid,
      name: "lab laptop",
      functions: ['computer'],
      attributes: [
        {name: "product_key", "value": "FT60Z25V"},
        {name: "cpu_freq", "value": 2.7, "uom": "ghz"},
        {name: "ram_capacity", "value": 8, "uom": "gb"},
      ],
      producer: "dell",
      uri: chance.url(),
      slug: "lab-laptop"
    }
    devices.push(device);
    device = {
      registered_by: user.cuid,
      name: "test ultrasonography probe",
      functions: ['us_probe'],
      attributes: [
        {name: "radius_of_curvature", "value": 0, "uom": "deg"},
        {name: "fov_angle", "value": 0, "uom": "deg"},
        {name: "fov_width", "value": 40, "uom": "mm"},
        {name: "fov_height", "value": 50, "uom": "mm"},
      ],
      producer: "telemed",
      uri: chance.url(),
      slug: "test-ultrasonography-probe"
    }
    devices.push(device);
    device = {
      registered_by: user.cuid,
      name: "test ultrasonography beamformer",
      functions: ['us_beamformer'],
      attributes: [
        {name: "has_rf_signal", "value": true},
      ],
      producer: "telemed",
      uri: chance.url(),
      slug: "test-ultrasonography-beamformer",
    }
    devices.push(device);
    device = {
      registered_by: user.cuid,
      name: "test portico",
      functions: ['us_probe_skin_interface'],
      attributes: [
        {name: "interface_chord_length", "value": 8, "uom": "mm"},
        {name: "depth", "value": 5, "uom": "mm"},
      ],
      producer: "uz_leuven_pellenberg_ganglabo",
      uri: chance.url(),
      slug: "test-portico"
    }
    devices.push(device);
    device = {
      registered_by: user.cuid,
      name: "test probe holder",
      functions: ['us_probe_holder'],
      attributes: [
        {name: "material", "value": "plastic"},
      ],
      producer: "uz_leuven_pellenberg_ganglabo",
      uri: chance.url(),
      slug: "test-probe-holder"
    }
    devices.push(device);
    device = {
      registered_by: user.cuid,
      name: "test trigger box",
      functions: ['signal_converter'],
      attributes: [
        {name: "input_signal_type", "value": "ttl"},
        {name: "output_signal_type", "value": "float_0"},
        {name: "inverted_logic", "value": true},
      ],
      producer: "uz_leuven_pellenberg_ganglabo",
      uri: chance.url(),
      slug: "test-trigger-box"
    }
    devices.push(device);
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
    let swTool = {};
    for (let i = 0; i < 50; i++) {
      let tool = tools[chance.integer({min: 0, max: tools.length-1})];
      const vr = {min: 0, max: 10};
      let maj = chance.integer(vr);
      let min = chance.integer(vr);
      let rev = chance.integer(vr);
      let version = `${maj}.${min}.${rev}`;
      swTool = {
        registered_by: user.cuid,
        name: tool.name,
        version: version,
        producer: tool.company,
        uri: chance.url(),
        slug: 'test-software',
      };
      swTools.push(swTool);
    }
    swTool = {
      registered_by: user.cuid,
      name: "optoelectronic data acquisition software",
      version: "1.0",
      producer: "uz_leuven_pellenberg_ganglabo",
      uri: chance.url(),
      slug: "optoelectronic-data-acquisition-software",
    }
    swTools.push(swTool);
    swTool = {
      registered_by: user.cuid,
      name: "ultrasonography data acquisition software",
      version: "1.0",
      producer: "uz_leuven_pellenberg_ganglabo",
      uri: chance.url(),
      slug: "ultrasonography-data-acquisition-software",
    }
    swTools.push(swTool);
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
        title: chance.sentence(),
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
            {
              id: d.subjects[chance.integer({min: 0, max: d.subjects.length-1})].cuid,
              task: chance.word(),
              anatomical_areas: [chance.word(), chance.word()],
              anatomical_side: chance.word(),
            }
          ];
        }

        var devices = [];
        for (let j = 0; j < chance.natural({min: 1, max: 5}); j++) {
          devices.push(
            {
              id: d.devices[chance.integer({min: 0, max: d.devices.length-1})].cuid,
              roles: [chance.word()],
            }
          )
        }

        var software = [];
        for (let j = 0; j < chance.natural({min: 1, max: 5}); j++) {
          software.push(
            {
              id: d.SWTools[chance.integer({min: 0, max: d.SWTools.length-1})].cuid ,
              roles: [chance.word()],
            }
          )
        }

        var outputs = [];
        for (let j = 0; j < chance.natural({min: 1, max: 5}); j++) {
          let data = [];
          for (let k = 0; k < chance.natural({min: 1, max: 3}); k++) {
            data.push({
              "name": chance.word(),
              "value": chance.floating({min: 0, max: 100, fixed: 2}),
              "uom": chance.word(),
            });
          }
          let metadata = [];
          for (let k = 0; k < chance.natural({min: 1, max: 3}); k++) {
            metadata.push({
              "name": chance.word(),
              "value": chance.floating({min: 0, max: 100, fixed: 2}),
              "uom": chance.word(),
            });
          }
          let filesData = [];
          for (let k = 0; k < chance.natural({min: 1, max: 3}); k++) {
            filesData.push({
              "name": chance.word(),
              "storage_uri": chance.word(),
              "size": chance.integer({min: 4, max: 10e9}),
              "type": chance.word(),
            });
          }
          outputs.push({
            cuid: cuid(),
            name: chance.word(),
            metadata,
            data,
            files_data: filesData,
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
          type: chance.word(),
          session: chance.word(),
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
      title: "Manually move camera position for optimal field of view",
      key: "adjust-camera",
      json_schema: require('./forms/activity/adjust_camera_schema.json'),
      ui_schema: require('./forms/activity/adjust_camera_ui_schema.json'),
      init_data: require('./forms/activity/adjust_camera_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {
        "camera_tilt": {
          "path": "outputs[0].cuid"
        },
        "camera_height": {
          "path": "outputs[1].cuid"
        },
        "camera_pos_photo": {
          "path": "outputs[2].cuid"
        },
        "camera_pos_comment": {
          "path": "outputs[3].cuid"
        }
      },
      slug: "adjust-camera",
    };
    forms.push(form);

    form = {
      title: "Perform anthropometric measures",
      key: "perform-anthro-measures",
      json_schema: require('./forms/activity/perform_anthro_measures_schema.json'),
      ui_schema: require('./forms/activity/perform_anthro_measures_ui_schema.json'),
      init_data: require('./forms/activity/perform_anthro_measures_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "perform-anthro-measures",
    };
    forms.push(form);

    form = {
      title: "Prepare subject for measurements",
      key: "prepare-subject",
      json_schema: require('./forms/activity/prepare_subject_schema.json'),
      ui_schema: require('./forms/activity/prepare_subject_ui_schema.json'),
      init_data: require('./forms/activity/prepare_subject_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {
        "subject_pos": {
          "path": "outputs[0].cuid"
        },
        "subject_pos_photo": {
          "path": "outputs[1].cuid"
        },
      },
      slug: "prepare-subject",
    };
    forms.push(form);

    form = {
      title: "Place markers on subject",
      key: "place-markers",
      json_schema: require('./forms/activity/place_markers_on_subject_schema.json'),
      ui_schema: require('./forms/activity/place_markers_on_subject_ui_schema.json'),
      init_data: require('./forms/activity/place_markers_on_subject_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "place-markers",
    };
    forms.push(form);

    form = {
      title: "Configure ultrasonography system",
      key: "configure-us",
      json_schema: require('./forms/activity/configure_us_system_schema.json'),
      ui_schema: require('./forms/activity/configure_us_system_ui_schema.json'),
      init_data: require('./forms/activity/configure_us_system_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {

        "us_acq_software_image_h": {
          "path": "outputs[0].cuid"
        },
        "us_acq_software_image_h_value": {
          "path": "outputs[0].data[0].value"
        },
        "us_acq_software_image_h_uom": {
          "path": "outputs[0].data[0].uom"
        },

        "us_acq_software_image_w": {
          "path": "outputs[1].cuid"
        },
        "us_acq_software_image_w_value": {
          "path": "outputs[1].data[0].value"
        },
        "us_acq_software_image_w_uom": {
          "path": "outputs[1].data[0].uom"
        },

        "us_acq_software_speckle_reduction_enabled": {
          "path": "outputs[2].cuid"
        },
        "us_acq_software_speckle_reduction_enabled_value": {
          "path": "outputs[2].data[0].value"
        },

        "us_acq_software_dynamic_focus_enabled": {
          "path": "outputs[3].cuid"
        },
        "us_acq_software_dynamic_focus_enabled_value": {
          "path": "outputs[3].data[0].value"
        },

        "us_acq_software_lines_density": {
          "path": "outputs[4].cuid"
        },
        "us_acq_software_lines_density_value": {
          "path": "outputs[4].data[0].value"
        },

        "us_acq_software_dynamic_range": {
          "path": "outputs[5].cuid"
        },
        "us_acq_software_dynamic_range_value": {
          "path": "outputs[5].data[0].value"
        },
        "us_acq_software_dynamic_range_uom": {
          "path": "outputs[5].data[0].uom"
        },

        "us_acq_software_gain": {
          "path": "outputs[6].cuid"
        },
        "us_acq_software_gain_value": {
          "path": "outputs[6].data[0].value"
        },

        "us_acq_software_power": {
          "path": "outputs[7].cuid"
        },
        "us_acq_software_power_value": {
          "path": "outputs[7].data[0].value"
        },

        "us_acq_software_probe_frequency": {
          "path": "outputs[8].cuid"
        },
        "us_acq_software_probe_frequency_value": {
          "path": "outputs[8].data[0].value"
        },
        "us_acq_software_probe_frequency_uom": {
          "path": "outputs[8].data[0].uom"
        },

        "us_acq_software_image_enhancement_enabled": {
          "path": "outputs[9].cuid"
        },
        "us_acq_software_image_enhancement_enabled_value": {
          "path": "outputs[9].data[0].value"
        },

        "us_acq_software_configuration_data": {
          "path": "outputs[10].cuid"
        },

        "us_acq_software_comment": {
          "path": "outputs[11].cuid"
        },
        "us_acq_software_comment_value": {
          "path": "outputs[11].data[0].value"
        },

      },
      slug: "configure-us",
    };
    forms.push(form);

    form = {
      title: "Configure ultrasonography system on subject",
      key: "configure-us-on-subject",
      json_schema: require('./forms/activity/configure_us_system_on_subject_schema.json'),
      ui_schema: require('./forms/activity/configure_us_system_on_subject_ui_schema.json'),
      init_data: require('./forms/activity/configure_us_system_on_subject_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {

        "us_acq_software_image_h": {
          "path": "outputs[0].cuid"
        },
        "us_acq_software_image_h_value": {
          "path": "outputs[0].data[0].value"
        },
        "us_acq_software_image_h_uom": {
          "path": "outputs[0].data[0].uom"
        },

        "us_acq_software_image_w": {
          "path": "outputs[1].cuid"
        },
        "us_acq_software_image_w_value": {
          "path": "outputs[1].data[0].value"
        },
        "us_acq_software_image_w_uom": {
          "path": "outputs[1].data[0].uom"
        },

        "us_acq_software_speckle_reduction_enabled": {
          "path": "outputs[2].cuid"
        },
        "us_acq_software_speckle_reduction_enabled_value": {
          "path": "outputs[2].data[0].value"
        },

        "us_acq_software_dynamic_focus_enabled": {
          "path": "outputs[3].cuid"
        },
        "us_acq_software_dynamic_focus_enabled_value": {
          "path": "outputs[3].data[0].value"
        },

        "us_acq_software_lines_density": {
          "path": "outputs[4].cuid"
        },
        "us_acq_software_lines_density_value": {
          "path": "outputs[4].data[0].value"
        },

        "us_acq_software_dynamic_range": {
          "path": "outputs[5].cuid"
        },
        "us_acq_software_dynamic_range_value": {
          "path": "outputs[5].data[0].value"
        },
        "us_acq_software_dynamic_range_uom": {
          "path": "outputs[5].data[0].uom"
        },

        "us_acq_software_gain": {
          "path": "outputs[6].cuid"
        },
        "us_acq_software_gain_value": {
          "path": "outputs[6].data[0].value"
        },

        "us_acq_software_power": {
          "path": "outputs[7].cuid"
        },
        "us_acq_software_power_value": {
          "path": "outputs[7].data[0].value"
        },

        "us_acq_software_probe_frequency": {
          "path": "outputs[8].cuid"
        },
        "us_acq_software_probe_frequency_value": {
          "path": "outputs[8].data[0].value"
        },
        "us_acq_software_probe_frequency_uom": {
          "path": "outputs[8].data[0].uom"
        },

        "us_acq_software_image_enhancement_enabled": {
          "path": "outputs[9].cuid"
        },
        "us_acq_software_image_enhancement_enabled_value": {
          "path": "outputs[9].data[0].value"
        },

        "us_acq_software_configuration_data": {
          "path": "outputs[10].cuid"
        },

        "us_acq_software_comment": {
          "path": "outputs[11].cuid"
        },
        "us_acq_software_comment_value": {
          "path": "outputs[11].data[0].value"
        },

      },
      slug: "configure-us-on-subject",
    };
    forms.push(form);

    form = {
      title: "Configure optoelectronic system",
      key: "configure-opto",
      json_schema: require('./forms/activity/configure_opto_system_schema.json'),
      ui_schema: require('./forms/activity/configure_opto_system_ui_schema.json'),
      init_data: require('./forms/activity/configure_opto_system_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {

        "opto_acq_software_acq_freq": {
          "path": "outputs[0].cuid"
        },
        "opto_acq_software_acq_freq_value": {
          "path": "outputs[0].data[0].value"
        },
        "opto_acq_software_acq_freq_uom": {
          "path": "outputs[0].data[0].uom"
        },

        "opto_acq_software_configuration_data": {
          "path": "outputs[1].cuid"
        },

        "opto_acq_software_comment": {
          "path": "outputs[2].cuid"
        }

      },
      slug: "configure-opto",
    };
    forms.push(form);

    form = {
      title: "Check ultrasonography muscle visibility",
      key: "check-muscle-us-visibility",
      json_schema: require('./forms/activity/check_muscle_us_visibility_schema.json'),
      ui_schema: require('./forms/activity/check_muscle_us_visibility_ui_schema.json'),
      init_data: require('./forms/activity/check_muscle_us_visibility_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "check-muscle-us-visibility",
    };
    forms.push(form);

    form = {
      title: "Check markers visibility",
      key: "check-markers-visibility",
      json_schema: require('./forms/activity/check_markers_visibility_schema.json'),
      ui_schema: require('./forms/activity/check_markers_visibility_ui_schema.json'),
      init_data: require('./forms/activity/check_markers_visibility_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "check-markers-visibility",
    };
    forms.push(form);

    form = {
      title: "Move instrumented probe along muscle with live image feedback",
      key: "move-probe-muscle",
      json_schema: require('./forms/activity/move_probe_along_muscle_live_feedback_schema.json'),
      ui_schema: require('./forms/activity/move_probe_along_muscle_live_feedback_ui_schema.json'),
      init_data: require('./forms/activity/move_probe_along_muscle_live_feedback_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "move-probe-muscle",
    };
    forms.push(form);

    form = {
      title: "Capture ultrasonography data",
      key: "capture-us",
      json_schema: require('./forms/activity/capture_us_schema.json'),
      ui_schema: require('./forms/activity/capture_us_ui_schema.json'),
      init_data: require('./forms/activity/capture_us_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "capture-us",
    };
    forms.push(form);

    form = {
      title: "Capture optoelectronic data",
      key: "capture-opto",
      json_schema: require('./forms/activity/capture_opto_schema.json'),
      ui_schema: require('./forms/activity/capture_opto_ui_schema.json'),
      init_data: require('./forms/activity/capture_opto_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "capture-opto",
    };
    forms.push(form);

    form = {
      title: "Post trial capture",
      key: "ask-capture-extra-trial",
      json_schema: require('./forms/activity/ask_capture_extra_trial_schema.json'),
      ui_schema: require('./forms/activity/ask_capture_extra_trial_ui_schema.json'),
      init_data: require('./forms/activity/ask_capture_extra_trial_data.json'),
      dest_collection: undefined,
      insert_on_submit: false,
      submitter: 'wf-variables',
      output_variables: {},
      slug: "ask-capture-extra-trial",
    };
    forms.push(form);

    form = {
      title: "Muscle ultrasonographic visibility",
      key: "is-muscle-us-visible",
      json_schema: require('./forms/activity/is_muscle_us_visible_schema.json'),
      ui_schema: require('./forms/activity/is_muscle_us_visible_ui_schema.json'),
      init_data: require('./forms/activity/is_muscle_us_visible_data.json'),
      dest_collection: undefined,
      insert_on_submit: false,
      submitter: 'wf-variables',
      output_variables: {},
      slug: "is-muscle-us-visible",
    };
    forms.push(form);

    form = {
      title: "Markers visibility",
      key: "are-markers-visible",
      json_schema: require('./forms/activity/are_markers_visible_schema.json'),
      ui_schema: require('./forms/activity/are_markers_visible_ui_schema.json'),
      init_data: require('./forms/activity/are_markers_visible_data.json'),
      dest_collection: undefined,
      insert_on_submit: false,
      submitter: 'wf-variables',
      output_variables: {},
      slug: "are-markers-visible",
    };
    forms.push(form);

    form = {
      title: "Trial quality",
      key: "was-trial-bad",
      json_schema: require('./forms/activity/was_trial_bad_schema.json'),
      ui_schema: require('./forms/activity/was_trial_bad_ui_schema.json'),
      init_data: require('./forms/activity/was_trial_bad_data.json'),
      dest_collection: undefined,
      insert_on_submit: false,
      submitter: 'wf-variables',
      output_variables: {},
      slug: "was-trial-bad",
    };
    forms.push(form);

    form = {
      title: "Associate results to project(s)",
      key: "associate-results-to-project",
      json_schema: require('./forms/activity/assoc_output_to_project_schema.json'),
      ui_schema: require('./forms/activity/assoc_output_to_project_ui_schema.json'),
      init_data: require('./forms/activity/assoc_output_to_project_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "associate-results-to-project",
    };
    forms.push(form);

    form = {
      title: "Associate results to publications(s)",
      key: "associate-results-to-publication",
      json_schema: require('./forms/activity/assoc_output_to_publication_schema.json'),
      ui_schema: require('./forms/activity/assoc_output_to_publication_ui_schema.json'),
      init_data: require('./forms/activity/assoc_output_to_publication_data.json'),
      dest_collection: 'activities',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "associate-results-to-publication",
    };
    forms.push(form);

    form = {
      title: "Insert/update software",
      key: "insert-update-software",
      json_schema: require('./forms/software/software_schema.json'),
      ui_schema: require('./forms/software/software_ui_schema.json'),
      init_data: {},
      dest_collection: 'swtools',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-software",
    };
    forms.push(form);

    form = {
      title: "Insert/update computer",
      key: "insert-update-computer",
      json_schema: require('./forms/device/computer_schema.json'),
      ui_schema: require('./forms/device/computer_ui_schema.json'),
      init_data: {},
      dest_collection: 'devices',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-computer",
    };
    forms.push(form);

    form = {
      title: "Insert/update optoelectronic cluster",
      key: "insert-update-opto-cluster",
      json_schema: require('./forms/device/opto_cluster_schema.json'),
      ui_schema: require('./forms/device/opto_cluster_ui_schema.json'),
      init_data: {},
      dest_collection: 'devices',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-opto-cluster",
    };
    forms.push(form);

    form = {
      title: "Insert/update optoelectronic marker",
      key: "insert-update-opto-marker",
      json_schema: require('./forms/device/opto_marker_schema.json'),
      ui_schema: require('./forms/device/opto_marker_ui_schema.json'),
      init_data: {},
      dest_collection: 'devices',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-opto-marker",
    };
    forms.push(form);

    form = {
      title: "Insert/update optoelectronic system",
      key: "insert-update-opto-system",
      json_schema: require('./forms/device/opto_system_schema.json'),
      ui_schema: require('./forms/device/opto_system_ui_schema.json'),
      init_data: {},
      dest_collection: 'devices',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-opto-system",
    };
    forms.push(form);

    form = {
      title: "Insert/update signal converter",
      key: "insert-update-signal-converter",
      json_schema: require('./forms/device/signal_converter_schema.json'),
      ui_schema: require('./forms/device/signal_converter_ui_schema.json'),
      init_data: {},
      dest_collection: 'devices',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-signal-converter",
    };
    forms.push(form);

    form = {
      title: "Insert/update ultrasonography beamformer",
      key: "insert-update-us-beamformer",
      json_schema: require('./forms/device/us_beamformer_schema.json'),
      ui_schema: require('./forms/device/us_beamformer_ui_schema.json'),
      init_data: {},
      dest_collection: 'devices',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-us-beamformer",
    };
    forms.push(form);

    form = {
      title: "Insert/update \"portico\" interface tool",
      key: "insert-update-us-portico",
      json_schema: require('./forms/device/us_portico_schema.json'),
      ui_schema: require('./forms/device/us_portico_ui_schema.json'),
      init_data: {},
      dest_collection: 'devices',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-us-portico",
    };
    forms.push(form);

    form = {
      title: "Insert/update probe holder",
      key: "insert-update-us-probe-holder",
      json_schema: require('./forms/device/us_probe_holder_schema.json'),
      ui_schema: require('./forms/device/us_probe_holder_ui_schema.json'),
      init_data: {},
      dest_collection: 'devices',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-us-probe-holder",
    };
    forms.push(form);

    form = {
      title: "Insert/update probe",
      key: "insert-update-us-probe",
      json_schema: require('./forms/device/us_probe_schema.json'),
      ui_schema: require('./forms/device/us_probe_ui_schema.json'),
      init_data: {},
      dest_collection: 'devices',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-us-probe",
    };
    forms.push(form);

    form = {
      title: "Insert/update researcher",
      key: "insert-update-researcher",
      json_schema: require('./forms/researcher/researcher_schema.json'),
      ui_schema: require('./forms/researcher/researcher_ui_schema.json'),
      init_data: {},
      dest_collection: 'researchers',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-researcher",
    };
    forms.push(form);

    form = {
      title: "Insert/update subject",
      key: "insert-update-subject",
      json_schema: require('./forms/subject/subject_schema.json'),
      ui_schema: require('./forms/subject/subject_ui_schema.json'),
      init_data: {},
      dest_collection: 'subjects',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-subject",
    };
    forms.push(form);

    form = {
      title: "Insert/update project",
      key: "insert-update-project",
      json_schema: require('./forms/project/project_schema.json'),
      ui_schema: require('./forms/project/project_ui_schema.json'),
      init_data: {},
      dest_collection: 'projects',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-project",
    };
    forms.push(form);

    form = {
      title: "Insert/update publication",
      key: "insert-update-publication",
      json_schema: require('./forms/publication/publication_schema.json'),
      ui_schema: require('./forms/publication/publication_ui_schema.json'),
      init_data: {},
      dest_collection: 'publications',
      insert_on_submit: true,
      submitter: 'direct',
      output_variables: {},
      slug: "insert-update-publication",
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
