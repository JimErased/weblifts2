async function login () {
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
      'auth-token': '921c2aa1-2c12-497d-97e4-abadf0606611',
      'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'x-api-key': 'shelobs_hevy_web',
    }
  };

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

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
    fetch(`https://api.hevyapp.com/user_workouts_paged?username=${username}&limit=${max}&offset=0`, options)
    .then(response => response.json())
    .then(data => {
      // Save to file
      console.log(data)
      return data
    })
    .catch(err => {
      console.log(err)
      throw err
    })
  }

  callApi(username, max)
      
}

login()
