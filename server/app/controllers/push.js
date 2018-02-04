var FCM = require('fcm-push');
var serverkey = 'AAAAiJtNYbM:APA91bHgO2_EIl5p_suxYj7NEkGFS3K19TEppp7pLJ5delqo7qNkIXcFyiLh_lkC4ZKuJmALS0VBSYffHIIRKsXJqlLwICHFZdrWWw4dhEPySx575LyrGrtDXOqtV1umMifXVyXneafa';  
var fcm = new FCM(serverkey);
// c8UR6ebjHf0:APA91bGfQvSmbd8hB4-BPPTBbgiJhhsg6poWMLVfJCdxiggUnRLqwT3SPSlwQ3w4ScDRLNfFZCEG9CUJrIb7mcqPokK8EruG7VpgBGbJ52WjDe8TC2x-fB3eDKkrttXKh1NkFcHTLfQm
exports.sendPush = function(target){
    //console.log(target);
target.forEach(function(element) {    
    var message ={  
        to : element.fcmtoken,
        //collapse_key : '<insert-collapse-key>',
        data : {
            'url' : '<random-data-value1>',
            'type' : '<random-data-value2>'
        },
        notification : {
            title : 'Title of the notification',
            body : 'Body of the notification',
            "sound":"default"
        }
    };

    fcm.send(message, function(err,response){  
        if(err) {
            console.log("Something has gone wrong !");
        } else {
            console.log("Successfully sent with resposne :",response);
        }
    });

});

}










