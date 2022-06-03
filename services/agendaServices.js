/**
 * name : common.js
 * author : Vishnudas
 * created-date : 19-may-2022
 * Description : all common constants
*/

//Dependencies
const Agenda = require('agenda');
const configuration = require('../config');
const needle = require('needle');
const responseMessage = require('../generics/constants/responseMessage')
const httpResponse = require('../generics/constants/httpResponse')

const {sendErrorMail} = require('../generics/utils');
const log = require("../models/log");

//connect Agenda to default collection--agendaJobs
const agenda = new Agenda({
  db : {
      address : configuration.mongourl,
      collection : configuration.collection?configuration.collection:undefined
  }

});


//restart agenda instances when server restarts
const jobsReady = agenda._ready.then( async () => {
  const jobDefCollection = agenda._mdb.collection( configuration.definition );

  jobDefCollection.toArray = () => {
      const jobsCursor = jobDefCollection.find();
      return (jobsCursor.toArray).bind(jobsCursor)();
  };
  await jobDefCollection
    .toArray()
    .then((jobsArray) =>
      Promise.all(jobsArray.map((job) => defineJob(job, jobDefCollection, agenda)))
    );
  await agenda.start();
  return jobDefCollection;
});


//Defining agenda job . job details are added to the collection.
const defineJob = async ( job, jobs, agenda ) => {
    let jobDef = job;
    const{ name, url, method, owner, email,header } = job;
    agenda.define( name, async (job) => {

      //needle is being implemented here
        console.log("API call details : ",method,url);
      
        const options = {
          headers : header ? header : {}
        }
        await needle( method, url, options )
        .then(function(response) {
          let status = "success"
          addExicutionLog( jobDef, status, {"response" : "SUCCESS" }, job.attrs.lastRunAt );
          console.log("response : ",response.body)
          return "good"
        })
        .catch(function(err) {
          console.log("error : ",err)
          let status = "failed"
          addExicutionLog( jobDef, status, err, job.attrs.lastRunAt );
          sendErrorMail(email);
        })
        
        
    });

    await jobs.countDocuments({ name })
      .then((count) =>
      
        count < 1 ? jobs.insertOne(job) : jobs.updateOne({ name }, { $set: job })
      );
  
    return ({
        success : true
    })
};

//scheduling job for every given interval
const scheduleEvery = async ( scheduleData, agenda ) => {
    try {
        const name = scheduleData.name;
        const interval = scheduleData.interval;
        const schedule = await agenda.every( interval, name );
        
        return ({
            message : responseMessage.SHEDULE_ONCE_SUCCESS,
            success : true,
            status : httpResponse.OK
        });
    } catch ( err ){
        return({
            message : responseMessage.SHEDULING_FAILED + err,
            success : false,
            status : httpResponse.BAD_REQUEST
        });
    }
}; 

//shedule job for immediate exicution
const scheduleNow = async (jobName, agenda ) => {
    try {
        const schedule = await agenda.now( jobName );
        
        return ({
            message : responseMessage.SHEDULE_ONCE_SUCCESS,
            success : true,
            status : httpResponse.OK
        });
        
    } 
    catch ( err ) {
        return({
            message : responseMessage.SHEDULING_FAILED + err,
            success : false,
            status : httpResponse.BAD_REQUEST
        });
    }
};

//schedule job for once
const scheduleOnce = async ( scheduleData, agenda ) => {
    try {
        const name = scheduleData.name;
        const interval = scheduleData.interval;
        const schedule = await agenda.schedule( interval, name );
        
        return ({
            message : responseMessage.SHEDULE_ONCE_SUCCESS,
            success : true,
            status : httpResponse.OK
        });
        
    } 
    catch ( err ) {
        return({
            message : responseMessage.SHEDULING_FAILED + err,
            success : false,
            status : httpResponse.BAD_REQUEST
        });
    }
};

//Add execution log
const addExicutionLog = async ( job, status, resp , time ) => {
  let report = new log ({
    jobDetails : job,
    runAt : time,
    response : resp,
    exicutionStatus : status
  });
  await report.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })
}

module.exports = {
    defineJob,
    agenda,
    jobsReady,
    scheduleEvery,
    scheduleNow,
    scheduleOnce
};