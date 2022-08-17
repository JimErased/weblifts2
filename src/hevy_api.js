let testData = require('./testdata.json')

async function downloadData(apikey, authToken) {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      Connection: 'keep-alive',
      DNT: '1',
      Origin: 'https://www.hevy.com',
      Referer: 'https://www.hevy.com/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
      'auth-token': authToken,
      'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'x-api-key': apikey,
    }
  };

  let username
  let max

  // Get the username of the user
  await fetch(`https://api.hevyapp.com/account`, options)
  .then(response => response.json())
  .then(data => {
    username = data['username']
  })
  .catch(err => {
    console.log(err)
    throw err
  })

  // Call the workout count to get the max amount of workouts
  await fetch(`https://api.hevyapp.com/workout_count`, options)
  .then(response => response.json())
  .then(data => {
    max = data['workout_count']
  })
  .catch(err => {
    console.log(err)
    throw err
  })
    
  async function callApi(username, max) {
    let apiData
    await fetch(`https://api.hevyapp.com/user_workouts_paged?username=${username}&limit=${max}&offset=0`, options)
    .then(response => response.json())
    .then(data => {
      // Save to file
      // This works, need to pass it on console.log(data)
      apiData = data
      return data
    })
    .catch(err => {
      console.log(err)
      throw err
    })
    return apiData
  }

  let apiData = callApi(username, max).then(data => {
                  apiData = data
                  return apiData
                })
  // processData(apiData)
  return apiData
}

function oneRepMax(testData, exercise = "Bench Press (Barbell)") {
  var oneRepMaxList = []
  var dateList = []
  var exerciseName = exercise

  console.log("From function: " + exercise)
  
  // Iterate through each workout
  for (let i in testData["workouts"]) {

    // Get Date
    var date = testData["workouts"][i]["created_at"].substring(0,10)

    // Iterate through each exercise in each workout
    for (let j in testData["workouts"][i]["exercises"]) {

      // Working console.log("From data: " + testData["workouts"][i]["exercises"][j]["title"])

      if (testData["workouts"][i]["exercises"][j]["title"] === exercise) {

        // Iterate through each set in each exercise in each workout
        for(let k in testData["workouts"][i]["exercises"][j]["sets"]) {
          var oneRepMax = 0
          if (testData["workouts"][i]["exercises"][j]["sets"][k]["weight_kg"] > oneRepMax)
          oneRepMax = testData["workouts"][i]["exercises"][j]["sets"][k]["weight_kg"]
        }

        dateList.push(date)
        oneRepMaxList.push(oneRepMax)

      }
    }
  }
}

export default { downloadData, oneRepMax }