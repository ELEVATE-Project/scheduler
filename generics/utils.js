/**
 * name : jobs.js
 * author : Vishnudas
 * created-date : 19-may-2022
 * Description : jobs helper.
*/

//Dependencies
const kafkaCommunication = require('../generics/kafka-communication');

//checking presents of data in jobDefinition collection
const checkForDuplicateJobDefinition = async (job, jobs) => {
    const count = await jobs.countDocuments( {name:job.name} );
    return count;
};

//push error mail to Kafka
const sendErrorMail = async ( email, jobData, errorDetails ) => {
    try {
        const payload = {
            type: "email",
            email: {
                to: email,
                subject: 'Job Failure Report : ' + jobData.name, // Subject line
                body: `Details Name : ${jobData.name} URL : ${jobData.request.url} Fail reason : ${JSON.stringify( errorDetails )}` 
            }
        };
        await kafkaCommunication.pushEmailToKafka( payload );

    } catch (err) {
        console.log("error : ",err)
    }
    
};

module.exports = {
    checkForDuplicateJobDefinition,
    sendErrorMail
}