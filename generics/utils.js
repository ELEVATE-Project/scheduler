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
const sendErrorMail = async ( email ) => {
    try {
        const payload = {
            type: "email",
            email: {
                to: email,
                subject: 'Job Failure Report', // Subject line
                body: 'Your scheduled task failed. Please contact support team' // Plain text body
            }
        };

        await kafkaCommunication.pushEmailToKafka( payload );

    } catch (err) {
        throw err;
    }
    
};

module.exports = {
    checkForDuplicateJobDefinition,
    sendErrorMail
}