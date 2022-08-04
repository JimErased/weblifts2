import config from './config.json'
import $ from 'jquery'

function login() {
    let login_url = "https://api.hevyapp.com/account"
    let data = ''
    
    $.ajax(login_url, { 
        type: "GET", 
        headers: {
            'User-Agent': 'VSCode Test',
            'x-api-key': config['x-api-key'],
            'auth-token': config['auth-token'],
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip'
            },
        success: onSuccess 
    });
    
    function onSuccess(obj) {
        console.log(obj)
        data = obj
    }

    return data
}

login()

export default { login }

# https://api.hevyapp.com/account
# https://api.hevyapp.com/workout_count
# https://api.hevyapp.com/user_preferences
# https://api.hevyapp.com/body_measurements
# https://api.hevyapp.com/workout_count
# https://api.hevyapp.com/set_personal_records
# https://api.hevyapp.com/user_subscription
# https://api.hevyapp.com/workouts_batch/
# https://api.hevyapp.com/workouts_sync_batch
# https://api.hevyapp.com/feed_workouts_paged/
# https://api.hevyapp.com/workout/like/
# https://api.hevyapp.com/workout/unlike/