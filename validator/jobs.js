module.exports = {
    
    validation :  (req, res, next) => {
        console.log(req.body);
        
        req.checkBody( 'name', 'required job name').notEmpty();
        req.checkBody( 'method', 'required method').notEmpty();
        req.checkBody( 'url', 'required url').notEmpty();
        req.checkBody('email', 'required email')
            .trim()
            .notEmpty()
            .isEmail()
            .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            .withMessage('email is invalid')
            .normalizeEmail();
        req.checkBody( 'scheduleType', 'required schedule type').notEmpty();
        
        let validationErr = req.validationErrors();
        if ( validationErr ) {
            res.send( validationErr );
        } else {
            next();
        }
        
    },
    everyAndOnce : (req, res, next) => {
        req.checkBody( 'name', 'required job name').notEmpty();
        req.checkBody( 'interval', 'required interval').notEmpty();
        let validationErr = req.validationErrors();
        if ( validationErr ) {
            res.status(400).json( validationErr );
        } else {
            next();
        }
    },
    nowAndCancel : (req, res, next) => {
        req.checkBody( 'name', 'required job name').notEmpty();
        let validationErr = req.validationErrors();
        if ( validationErr ) {
            res.status(400).json( validationErr );
        } else {
            next();
        }
    },
    deleteAndUpdate : (req, res, next) => {
        req.checkParams('jobname','required job name').notEmpty();
        let validationErr = req.validationErrors();
        if ( validationErr ) {
            res.status(400).json( validationErr );
        } else {
            next();
        }
    }

};