var jade = require('jade');
var fs = require('fs');
var nodemailer = require('nodemailer');
var path = require('path')

var FunctionToChooseEmailFromTemplates = function(file) {
	console.log('../mail-templates/' + file)

    return  __dirname+'/mail-templates/' + file;
    //app/controllers/mail-templates

}
exports.FunctionToSendEmail = function(email, File, sub) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'yashkhrnr2@gmail.com',
            pass: '254347122'
        }

    })
    var template = FunctionToChooseEmailFromTemplates(File);

    fs.readFile(template, 'utf8', function(err, file) {
        if (err) {
            //handle errors
            console.log('ERROR!');
           throw err;
        } else {
            //compile jade template into function
            var compiledTmpl = jade.compile(file, { filename: template });
            // set context to be used in template
            var context = { title: 'Express' };
            // get html back as a string with the context applied;
            var htmlmessage = compiledTmpl(context);

            
        }
        var mailOptions = {
        // sender address
        from: 'Ashvin ✔ <yashkhrnr2@gmail.com>',
        // list of receivers
        to: email,
        // Subject line
        subject: sub,

        // rich text html body
        html:htmlmessage
    }



    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            throw error;
        } else {
            console.log('Message sent: ' + info.response);
        }
    });

})

};






    
